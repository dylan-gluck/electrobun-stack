import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  CopyIcon,
  EyeIcon,
  MoreHorizontalIcon,
  RefreshCwIcon,
  ShieldIcon,
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatLabel, priorityBadgeVariant, statusBadgeVariant } from "@/lib/format";
import type { Task, TaskPriority, TaskStatus } from "@/lib/types/task";

interface TasksTableProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

function getInitials(name: string): string {
  const parts = name.split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]![0] : "";
  return (first + last).toUpperCase();
}

const ALL_STATUSES: TaskStatus[] = ["todo", "in-progress", "in-review", "completed"];
const ALL_PRIORITIES: TaskPriority[] = ["low", "medium", "high", "critical"];

function createColumns(onTaskClick: (taskId: string) => void): ColumnDef<Task>[] {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDownIcon data-icon className="size-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDownIcon data-icon className="size-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as TaskStatus;
        return <Badge variant={statusBadgeVariant[status]}>{formatLabel(status)}</Badge>;
      },
      filterFn: (row, id, filterValues: string[]) => {
        if (filterValues.length === 0) return true;
        return filterValues.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDownIcon data-icon className="size-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const priority = row.getValue("priority") as TaskPriority;
        return <Badge variant={priorityBadgeVariant[priority]}>{formatLabel(priority)}</Badge>;
      },
      filterFn: (row, id, filterValues: string[]) => {
        if (filterValues.length === 0) return true;
        return filterValues.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "assignee",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assignee
          <ArrowUpDownIcon data-icon className="size-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const assignee = row.getValue("assignee") as string;
        return (
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback>{getInitials(assignee)}</AvatarFallback>
            </Avatar>
            <span className="truncate">{assignee}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDownIcon data-icon className="size-4" />
        </Button>
      ),
      cell: ({ row }) => format(new Date(row.getValue("dueDate")), "MMM d, yyyy"),
    },
    {
      id: "subtasks",
      accessorFn: (row) => {
        const total = row.subtasks.length;
        if (total === 0) return -1;
        return row.subtasks.filter((s) => s.completed).length / total;
      },
      header: "Subtasks",
      cell: ({ row }) => {
        const task = row.original;
        const completed = task.subtasks.filter((s) => s.completed).length;
        const total = task.subtasks.length;
        if (total === 0) {
          return <span className="text-xs text-muted-foreground">&mdash;</span>;
        }
        const pct = (completed / total) * 100;
        return (
          <div className="flex items-center gap-2">
            <span className="text-xs tabular-nums text-muted-foreground">
              {completed}/{total}
            </span>
            <Progress value={pct} className="h-1 w-12" />
          </div>
        );
      },
    },
    {
      id: "tags",
      accessorFn: (row) => row.tags.join(", "),
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.original.tags;
        const visible = tags.slice(0, 2);
        const extra = tags.length - 2;
        return (
          <div className="flex items-center gap-1">
            {visible.map((tag) => (
              <Badge key={tag} variant="outline" className="truncate text-xs">
                {tag}
              </Badge>
            ))}
            {extra > 0 && <span className="text-xs text-muted-foreground">+{extra}</span>}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      id: "actions",
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        const task = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-xs" onClick={(e) => e.stopPropagation()}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon data-icon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onTaskClick(task.id)}>
                  <EyeIcon data-icon className="size-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id)}>
                  <CopyIcon data-icon className="size-4" />
                  Copy Task ID
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <RefreshCwIcon data-icon className="size-4" />
                    Change Status
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {ALL_STATUSES.map((s) => (
                      <DropdownMenuItem key={s} disabled={s === task.status}>
                        {formatLabel(s)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <ShieldIcon data-icon className="size-4" />
                    Change Priority
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {ALL_PRIORITIES.map((p) => (
                      <DropdownMenuItem key={p} disabled={p === task.priority}>
                        {formatLabel(p)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

function FacetedFilter({
  title,
  options,
  selectedValues,
  onSelectionChange,
}: {
  title: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {title}
          {selectedValues.length > 0 && (
            <Badge variant="secondary" className="ml-1 px-1 text-xs">
              {selectedValues.length}
            </Badge>
          )}
          <ChevronDownIcon data-icon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuGroup>
          {options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <DropdownMenuCheckboxItem
                key={option}
                checked={isSelected}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelectionChange([...selectedValues, option]);
                  } else {
                    onSelectionChange(selectedValues.filter((v) => v !== option));
                  }
                }}
              >
                {formatLabel(option)}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuGroup>
        {selectedValues.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => onSelectionChange([])}>
                Clear filters
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TasksTable({ tasks, onTaskClick }: TasksTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = createColumns(onTaskClick);

  const table = useReactTable({
    data: tasks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const statusFilter = (table.getColumn("status")?.getFilterValue() as string[]) ?? [];
  const priorityFilter = (table.getColumn("priority")?.getFilterValue() as string[]) ?? [];

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center gap-3">
        <CardTitle className="text-lg">Tasks</CardTitle>
        <Badge variant="secondary">{tasks.length}</Badge>
        <div className="flex flex-1 flex-wrap items-center gap-2 sm:justify-end">
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
            className="h-8 max-w-xs"
          />
          <FacetedFilter
            title="Status"
            options={ALL_STATUSES}
            selectedValues={statusFilter}
            onSelectionChange={(values) => table.getColumn("status")?.setFilterValue(values)}
          />
          <FacetedFilter
            title="Priority"
            options={ALL_PRIORITIES}
            selectedValues={priorityFilter}
            onSelectionChange={(values) => table.getColumn("priority")?.setFilterValue(values)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Columns
                <ChevronDownIcon data-icon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                {table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())
                  .map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      className="capitalize"
                      checked={col.getIsVisible()}
                      onCheckedChange={(value) => col.toggleVisibility(!!value)}
                    >
                      {col.id === "dueDate" ? "Due Date" : col.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer"
                    onClick={() => onTaskClick(row.original.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {table.getPageCount() > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} task(s) total
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <span className="text-sm tabular-nums text-muted-foreground">
                {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

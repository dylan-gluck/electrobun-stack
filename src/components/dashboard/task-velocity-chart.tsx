import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { week: "Jan 13", completed: 2, created: 4 },
  { week: "Jan 20", completed: 3, created: 2 },
  { week: "Jan 27", completed: 5, created: 3 },
  { week: "Feb 3", completed: 4, created: 5 },
  { week: "Feb 10", completed: 6, created: 4 },
  { week: "Feb 17", completed: 3, created: 6 },
  { week: "Feb 24", completed: 7, created: 3 },
  { week: "Mar 3", completed: 5, created: 2 },
];

const chartConfig = {
  completed: { label: "Completed", color: "var(--color-chart-1)" },
  created: { label: "Created", color: "var(--color-chart-3)" },
} satisfies ChartConfig;

export function TaskVelocityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Velocity</CardTitle>
        <CardDescription>Tasks completed vs created per week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[180px] sm:h-[220px] md:h-[250px] w-full">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="completed"
              stackId="1"
              stroke="var(--color-chart-1)"
              fill="var(--color-chart-1)"
              fillOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="created"
              stackId="1"
              stroke="var(--color-chart-3)"
              fill="var(--color-chart-3)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

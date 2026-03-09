import { marked } from "marked";

interface TaskDescriptionProps {
  description: string;
}

export function TaskDescription({ description }: TaskDescriptionProps) {
  const html = marked(description, { async: false }) as string;
  return (
    <div>
      <h2 className="text-sm font-medium text-muted-foreground mb-3">Description</h2>
      <div
        className="prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

import * as React from "react";

export function Textarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`flex min-h-[100px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ${className}`.trim()}
      {...props}
    />
  );
}
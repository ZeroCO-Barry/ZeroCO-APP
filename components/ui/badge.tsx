import * as React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary";
};

export function Badge({
  className = "",
  variant = "default",
  ...props
}: BadgeProps) {
  const styles =
    variant === "secondary"
      ? "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
      : "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium";

  return <span className={`${styles} ${className}`.trim()} {...props} />;
}
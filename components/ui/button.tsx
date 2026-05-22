import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "secondary";
  asChild?: boolean;
};

export function Button({
  className = "",
  variant = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors";
  const variants = {
    default: "",
    outline: "border bg-transparent",
    secondary: "",
  };

  if (asChild) {
    return <span className={`${base} ${variants[variant]} ${className}`.trim()}>{props.children}</span>;
  }

  return <button className={`${base} ${variants[variant]} ${className}`.trim()} {...props} />;
}
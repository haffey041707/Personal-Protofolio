"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-plasma/50 bg-plasma/15 text-white shadow-neon-cyan hover:bg-plasma/24 hover:border-plasma/80",
  secondary:
    "border-violet/45 bg-violet/14 text-white shadow-neon-violet hover:bg-violet/22 hover:border-violet/70",
  ghost:
    "border-white/14 bg-white/[0.045] text-steel hover:border-aurora/55 hover:bg-aurora/10 hover:text-white"
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-sm",
  icon: "h-11 w-11 p-0"
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  asChild,
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md border font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-plasma/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className)
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

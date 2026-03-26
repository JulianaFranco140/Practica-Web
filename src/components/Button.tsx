import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex h-12 items-center justify-center rounded-full px-6 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black disabled:opacity-60 disabled:pointer-events-none";

  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-foreground/90"
      : "border border-solid border-black/[.08] bg-transparent hover:bg-foreground/5 dark:border-white/[.145] dark:hover:bg-foreground/10";

  return (
    <button
      type={type}
      className={[base, styles, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

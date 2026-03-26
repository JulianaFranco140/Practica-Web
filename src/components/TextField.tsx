import type { ComponentProps } from "react";

type TextFieldProps = {
  label: string;
  name: string;
  type?: ComponentProps<"input">["type"];
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
} & Omit<ComponentProps<"input">, "name" | "type" | "required" | "placeholder" | "autoComplete">;

export function TextField({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  placeholder,
  className,
  ...props
}: TextFieldProps) {
  const id = props.id ?? name;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className={[
          "h-12 w-full rounded-2xl border border-black/[.08] bg-white px-4 text-base text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-transparent focus:ring-2 focus:ring-foreground dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:placeholder:text-zinc-500",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </div>
  );
}

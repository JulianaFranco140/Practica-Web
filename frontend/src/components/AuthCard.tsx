import type { ReactNode } from "react";
import Link from "next/link";

type AuthCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
};

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerHref,
}: AuthCardProps) {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-black/[.08] bg-white/80 p-8 shadow-sm backdrop-blur dark:border-white/[.145] dark:bg-black/60 sm:p-10">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
      </div>

      <div className="mt-8">{children}</div>

      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        {footerText}{" "}
        <Link
          href={footerHref}
          className="font-medium text-foreground underline underline-offset-4 hover:opacity-90"
        >
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
}

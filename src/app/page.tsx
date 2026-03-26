import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 font-sans text-foreground dark:bg-black sm:px-6 lg:px-8">
      <main className="w-full max-w-3xl">
        <div className="rounded-3xl border border-black/[.08] bg-white/80 p-8 shadow-sm backdrop-blur dark:border-white/[.145] dark:bg-black/60 sm:p-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Bienvenido a tu blog
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Este es un blog interactivo donde puedes subir todas tus ideas.
            </p>
          </div>

          <div className="mt-10 flex w-full flex-col gap-4 text-base font-medium sm:flex-row sm:justify-center">
            <Link
              className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black sm:w-[180px]"
              href="/login"
            >
              Iniciar sesión
            </Link>
            <Link
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] bg-transparent px-6 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/[.145] dark:hover:bg-foreground/10 dark:focus-visible:ring-offset-black sm:w-[180px]"
              href="/register"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredSessionToken, logoutCustomSession } from "@/lib/auth";

const demoPosts = [
  {
    id: 1,
    title: "Ideas para mejorar mi rutina de estudio",
    excerpt:
      "Comparto un sistema simple para organizar tareas, descansos y repaso activo durante la semana.",
    author: "Juliana",
    date: "26 Mar 2026",
  },
  {
    id: 2,
    title: "Como convertir notas en publicaciones utiles",
    excerpt:
      "Una plantilla practica para pasar de apuntes sueltos a articulos claros y faciles de leer.",
    author: "Comunidad",
    date: "24 Mar 2026",
  },
  {
    id: 3,
    title: "Herramientas gratis para creadores",
    excerpt:
      "Lista de apps y recursos gratuitos para escribir, editar y planificar contenido en tu blog.",
    author: "Editor",
    date: "21 Mar 2026",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getStoredSessionToken();

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    await logoutCustomSession();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-200 px-4 py-10 text-foreground dark:from-zinc-950 dark:via-zinc-900 dark:to-black sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-black/[.08] bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/[.145] dark:bg-black/50 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Bienvenida a tu espacio de publicaciones
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              Aqui puedes crear nuevas publicaciones y revisar las ideas que ya
              compartiste en tu blog interactivo.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/[.08] px-5 text-sm font-medium transition-colors hover:bg-foreground/5 dark:border-white/[.145] dark:hover:bg-white/10"
            >
              Ir al inicio
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
            >
              Cerrar sesion
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
          <article className="rounded-3xl border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-black/50 sm:p-8">
            <h2 className="text-xl font-semibold">Crear publicacion</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Plantilla base para redactar una nueva idea. Puedes conectarla luego
              a Supabase para guardarla en base de datos.
            </p>

            <form className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium">
                Titulo
                <input
                  type="text"
                  placeholder="Ej: 5 ideas para aprender mejor"
                  className="h-11 rounded-xl border border-black/[.08] bg-white px-3 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground dark:border-white/[.145] dark:bg-zinc-950"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Categoria
                <select className="h-11 rounded-xl border border-black/[.08] bg-white px-3 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground dark:border-white/[.145] dark:bg-zinc-950">
                  <option>Productividad</option>
                  <option>Estudio</option>
                  <option>Tecnologia</option>
                  <option>Reflexiones</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Contenido
                <textarea
                  rows={6}
                  placeholder="Escribe aqui tu idea..."
                  className="resize-none rounded-xl border border-black/[.08] bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground dark:border-white/[.145] dark:bg-zinc-950"
                />
              </label>

              <button
                type="button"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
              >
                Publicar (plantilla)
              </button>
            </form>
          </article>

          <article className="rounded-3xl border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-black/50 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Publicaciones recientes</h2>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {demoPosts.length} resultados
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-4">
              {demoPosts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl border border-black/[.06] bg-zinc-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/[.12] dark:bg-zinc-900"
                >
                  <h3 className="text-base font-semibold sm:text-lg">{post.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.excerpt}
                  </p>
                  <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
                    {post.author} · {post.date}
                  </p>
                </article>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

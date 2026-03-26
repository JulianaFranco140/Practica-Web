"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredSessionToken, logoutCustomSession } from "@/lib/auth";
import { createPost, listPosts, PostItem } from "@/lib/posts";

export default function DashboardPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Productividad");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    const token = getStoredSessionToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    void loadPosts();
  }, [router]);

  const loadPosts = async () => {
    setLoadingPosts(true);
    const result = await listPosts();

    if (!result.ok) {
      setError(result.message ?? "No se pudieron cargar las publicaciones");
      setLoadingPosts(false);
      return;
    }

    setPosts(result.posts);
    setLoadingPosts(false);
  };

  const handleCreatePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (title.trim().length < 3) {
      setError("El titulo debe tener al menos 3 caracteres.");
      return;
    }

    if (content.trim().length < 10) {
      setError("El contenido debe tener al menos 10 caracteres.");
      return;
    }

    setSaving(true);
    const result = await createPost({
      title,
      category,
      content,
      imageFile,
    });

    if (!result.ok) {
      setError(result.message ?? "No se pudo crear la publicacion");
      setSaving(false);
      return;
    }

    setTitle("");
    setCategory("Productividad");
    setContent("");
    setImageFile(null);
    await loadPosts();
    setSaving(false);
  };

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
              Crea una publicacion y opcionalmente sube una imagen.
            </p>

            {error ? (
              <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/25 dark:text-red-300">
                {error}
              </p>
            ) : null}

            <form className="mt-6 flex flex-col gap-4" onSubmit={handleCreatePost}>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Titulo
                <input
                  type="text"
                  placeholder="Ej: 5 ideas para aprender mejor"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="h-11 rounded-xl border border-black/[.08] bg-white px-3 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground dark:border-white/[.145] dark:bg-zinc-950"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Categoria
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-11 rounded-xl border border-black/[.08] bg-white px-3 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground dark:border-white/[.145] dark:bg-zinc-950"
                >
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
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  className="resize-none rounded-xl border border-black/[.08] bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground dark:border-white/[.145] dark:bg-zinc-950"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Imagen (opcional)
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(event) => {
                    const nextFile = event.target.files?.[0] ?? null;
                    setImageFile(nextFile);
                  }}
                  className="h-11 rounded-xl border border-black/[.08] bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground file:mr-3 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1 file:text-xs file:font-medium dark:border-white/[.145] dark:bg-zinc-950 dark:file:bg-zinc-800"
                />
              </label>

              <button
                type="submit"
                disabled={saving}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
              >
                {saving ? "Publicando..." : "Publicar"}
              </button>
            </form>
          </article>

          <article className="rounded-3xl border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-black/50 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Publicaciones recientes</h2>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {posts.length} resultados
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-4">
              {loadingPosts ? (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Cargando publicaciones...</p>
              ) : null}

              {!loadingPosts && posts.length === 0 ? (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Aun no hay publicaciones. Crea la primera desde el formulario.
                </p>
              ) : null}

              {!loadingPosts
                ? posts.map((post) => (
                    <article
                      key={post.id}
                      className="rounded-2xl border border-black/[.06] bg-zinc-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/[.12] dark:bg-zinc-900"
                    >
                      <h3 className="text-base font-semibold sm:text-lg">{post.title}</h3>
                      <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                        {post.category}
                      </p>
                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {post.content}
                      </p>
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="mt-3 h-48 w-full rounded-xl object-cover"
                        />
                      ) : null}
                      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
                        @{post.username} · {new Date(post.created_at).toLocaleString()}
                      </p>
                    </article>
                  ))
                : null}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

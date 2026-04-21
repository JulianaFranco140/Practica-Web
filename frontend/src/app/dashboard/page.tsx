"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/application/useAuth";
import { usePosts } from "@/application/usePosts";
import { getStoredSessionToken } from "@/infrastructure/services/auth.service";
import { PostItem } from "@/domain/Post";

export default function DashboardPage() {
  const router = useRouter();
  const { getUsername, logout } = useAuth();
  const { posts, loadingPosts, saving, error, loadPosts, addPost } = usePosts();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Productividad");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [username] = useState<string | null>(getUsername);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  useEffect(() => {
    const token = getStoredSessionToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadPosts();
  }, [router]);

  const handleCreatePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = await addPost(title, category, content, imageFile);

    if (success) {
      setTitle("");
      setCategory("Productividad");
      setContent("");
      setImageFile(null);
    }
  };

  const handleLogout = async () => {
    await logout();
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
              {username ? `Bienvenido(a), ${username}` : "Bienvenida a tu espacio de publicaciones"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              Aqui puedes crear nuevas publicaciones y revisar las ideas que ya
              compartiste en tu blog interactivo.
            </p>
          </div>

          <div className="flex gap-3">
            
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
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
                      onClick={() => setSelectedPost(post)}
                      className="cursor-pointer rounded-2xl border border-black/[.06] bg-zinc-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/[.12] dark:bg-zinc-900"
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

      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity xl:p-8"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className={`flex w-full overflow-hidden rounded-3xl border border-black/[.08] bg-white p-6 sm:p-8 shadow-xl dark:border-white/[.145] dark:bg-zinc-950 max-h-[90vh] gap-6 md:gap-8 ${selectedPost.image_url ? 'max-w-5xl flex-col md:flex-row' : 'max-w-2xl flex-col'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex flex-col pr-2 overflow-y-auto ${selectedPost.image_url ? 'md:w-1/2' : 'w-full'}`}>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {selectedPost.category}
                </span>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                {selectedPost.title}
              </h3>
              <div className="mt-6 flex-1">
                <p className="whitespace-pre-wrap text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {selectedPost.content}
                </p>
              </div>
              <div className="mt-8 border-t border-black/[.08] pt-6 text-sm text-zinc-500 dark:border-white/[.145] dark:text-zinc-500">
                @{selectedPost.username} · {new Date(selectedPost.created_at).toLocaleString()}
              </div>
            </div>

            {selectedPost.image_url && (
              <div className="relative min-h-[300px] flex items-center justify-center overflow-hidden rounded-2xl border border-black/[.04] bg-zinc-50 dark:border-white/[.08] dark:bg-zinc-900/50 p-4 md:w-1/2">
                <img
                  src={selectedPost.image_url}
                  alt={selectedPost.title}
                  className="max-h-full max-w-full object-contain rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm rounded-3xl border border-black/[.08] bg-white p-6 shadow-xl dark:border-white/[.145] dark:bg-black">
            <h3 className="text-xl font-semibold text-foreground">¿Cerrar sesión?</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              ¿Estás seguro de que deseas salir de la aplicación?
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="inline-flex h-10 w-full items-center justify-center rounded-full border border-black/[.08] bg-transparent px-4 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-white/[.145] dark:hover:bg-white/5 sm:w-auto"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 w-full items-center justify-center rounded-full bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 sm:w-auto"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

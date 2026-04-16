import { getStoredSessionToken, getStoredUserId } from "./auth";

type CreatePostParams = {
  title: string;
  category: string;
  content: string;
  imageFile?: File | null;
};

export type PostItem = {
  id: string;
  title: string;
  category: string;
  content: string;
  image_url: string | null;
  username: string;
  created_at: string;
};

export async function createPost({
  title,
  category,
  content,
  imageFile,
}: CreatePostParams) {
  const token = getStoredSessionToken();
  const userId = getStoredUserId();

  if (!token || !userId) {
    return { ok: false, message: "Sesion invalida. Inicia sesion de nuevo." };
  }

  const formData = new FormData();
  formData.append("sessionToken", token);
  formData.append("userId", userId);
  formData.append("title", title.trim());
  formData.append("category", category.trim());
  formData.append("content", content.trim());

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  const response = await fetch("/api/posts", {
    method: "POST",
    body: formData,
  });

  const data = (await response.json()) as {
    ok?: boolean;
    message?: string;
    postId?: string;
  };

  if (!response.ok || !data.ok) {
    return { ok: false, message: data.message ?? "No se pudo crear la publicacion" };
  }

  return { ok: true, postId: data.postId };
}

export async function listPosts() {
  const token = getStoredSessionToken();

  if (!token) {
    return { ok: false, message: "Sesion invalida", posts: [] as PostItem[] };
  }

  const response = await fetch("/api/posts", {
    method: "GET",
    headers: {
      "x-session-token": token,
    },
  });

  const data = (await response.json()) as {
    ok?: boolean;
    message?: string;
    posts?: PostItem[];
  };

  if (!response.ok || !data.ok) {
    return { ok: false, message: data.message ?? "Error listando publicaciones", posts: [] as PostItem[] };
  }

  return { ok: true, posts: data.posts ?? [] };
}

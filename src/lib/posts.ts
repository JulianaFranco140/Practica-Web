import { getStoredSessionToken, getStoredUserId } from "./auth";
import { supabase } from "./supabase";

const BUCKET_NAME = "post-images";

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

  let imageUrl: string | null = null;

  if (imageFile) {
    const sanitizedName = imageFile.name.replace(/\s+/g, "-").toLowerCase();
    const path = `${userId}/${Date.now()}-${sanitizedName}`;

    const uploadResult = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, imageFile, { upsert: false });

    if (uploadResult.error) {
      return { ok: false, message: uploadResult.error.message };
    }

    const publicResult = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
    imageUrl = publicResult.data.publicUrl;
  }

  const { data, error } = await supabase.rpc("app_create_post", {
    p_token: token,
    p_title: title.trim(),
    p_category: category.trim(),
    p_content: content.trim(),
    p_image_url: imageUrl,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  const result = (data ?? {}) as { ok?: boolean; message?: string; post_id?: string };

  if (!result.ok) {
    return { ok: false, message: result.message ?? "No se pudo crear la publicacion" };
  }

  return { ok: true, postId: result.post_id };
}

export async function listPosts() {
  const token = getStoredSessionToken();

  if (!token) {
    return { ok: false, message: "Sesion invalida", posts: [] as PostItem[] };
  }

  const { data, error } = await supabase.rpc("app_list_posts", {
    p_token: token,
  });

  if (error) {
    return { ok: false, message: error.message, posts: [] as PostItem[] };
  }

  const rows = (data ?? []) as PostItem[];
  return { ok: true, posts: rows };
}

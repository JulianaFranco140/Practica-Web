import { useState, useCallback } from "react";
import { createPost, listPosts } from "../infrastructure/services/post.service";
import { PostItem } from "../domain/Post";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoadingPosts(true);
    const result = await listPosts();

    if (!result.ok) {
      setError(result.message ?? "No se pudieron cargar las publicaciones");
      setLoadingPosts(false);
      return;
    }

    setPosts(result.posts);
    setLoadingPosts(false);
  }, []);

  const addPost = async (title: string, category: string, content: string, imageFile: File | null) => {
    setError(null);

    if (title.trim().length < 3) {
      setError("El titulo debe tener al menos 3 caracteres.");
      return false;
    }

    if (content.trim().length < 10) {
      setError("El contenido debe tener al menos 10 caracteres.");
      return false;
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
      return false;
    }

    await loadPosts();
    setSaving(false);
    return true;
  };

  return {
    posts,
    loadingPosts,
    saving,
    error,
    setError,
    loadPosts,
    addPost
  };
};

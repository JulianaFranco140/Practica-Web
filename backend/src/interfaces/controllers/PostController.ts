import { Request, Response } from "express";
import { supabaseServer } from "../../infrastructure/supabase";
import crypto from "crypto";

export class PostController {
  
  public getPosts = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers["x-session-token"] as string;

    if (!token) {
      res.status(401).json({ ok: false, message: "Invalid session" });
      return;
    }

    const { data, error } = await supabaseServer.rpc("app_list_posts", {
      p_token: token,
    });

    if (error) {
      res.status(400).json({ ok: false, message: error.message, posts: [] });
      return;
    }

    res.status(200).json({ ok: true, posts: data ?? [] });
  };

  public createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = (req.body.sessionToken || "").trim();
      const userId = (req.body.userId || "").trim();
      const title = (req.body.title || "").trim();
      const category = (req.body.category || "").trim();
      const content = (req.body.content || "").trim();
      const imageFile = req.file;

      if (!token || !userId) {
        res.status(401).json({ ok: false, message: "Invalid session" });
        return;
      }

      if (title.length < 3 || content.length < 10 || !category) {
        res.status(400).json({ ok: false, message: "Invalid post data" });
        return;
      }

      let imageUrl: string | null = null;
      const BUCKET_NAME = "post-images";

      if (imageFile && imageFile.size > 0) {
        const sanitizedName = imageFile.originalname.replace(/\s+/g, "-").toLowerCase();
        const path = `${userId}/${Date.now()}-${crypto.randomUUID()}-${sanitizedName}`;

        const uploadResult = await supabaseServer.storage.from(BUCKET_NAME).upload(path, imageFile.buffer, {
          contentType: imageFile.mimetype,
          upsert: false,
        });

        if (uploadResult.error) {
          res.status(400).json({ ok: false, message: uploadResult.error.message });
          return;
        }

        const publicResult = supabaseServer.storage.from(BUCKET_NAME).getPublicUrl(path);
        imageUrl = publicResult.data.publicUrl;
      }

      const { data, error } = await supabaseServer.rpc("app_create_post", {
        p_token: token,
        p_title: title,
        p_category: category,
        p_content: content,
        p_image_url: imageUrl,
      });

      if (error) {
        res.status(400).json({ ok: false, message: error.message });
        return;
      }

      const result = data as any;
      if (!result?.ok) {
        res.status(400).json({ ok: false, message: result?.message ?? "Could not create post" });
        return;
      }

      res.status(201).json({ ok: true, postId: result?.post_id });
    } catch {
      res.status(400).json({ ok: false, message: "Invalid body" });
    }
  };
}

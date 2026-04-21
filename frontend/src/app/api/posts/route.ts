import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

const BUCKET_NAME = "post-images";

type PostItem = {
  id: string;
  title: string;
  category: string;
  content: string;
  image_url: string | null;
  username: string;
  created_at: string;
};

type CreatePostRpcResult = {
  ok?: boolean;
  message?: string;
  post_id?: string;
};

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.headers.get("x-session-token") ?? "";

  if (!token) {
    return NextResponse.json({ ok: false, message: "Invalid session" }, { status: 401 });
  }

  const { data, error } = await supabaseServer.rpc("app_list_posts", {
    p_token: token,
  });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message, posts: [] }, { status: 400 });
  }

  const rows = (data ?? []) as PostItem[];
  return NextResponse.json({ ok: true, posts: rows }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = String(formData.get("sessionToken") ?? "").trim();
    const userId = String(formData.get("userId") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();
    const imageFile = formData.get("imageFile");

    if (!token || !userId) {
      return NextResponse.json({ ok: false, message: "Invalid session" }, { status: 401 });
    }

    if (title.length < 3 || content.length < 10 || !category) {
      return NextResponse.json({ ok: false, message: "Invalid post data" }, { status: 400 });
    }

    let imageUrl: string | null = null;

    if (imageFile instanceof File && imageFile.size > 0) {
      const sanitizedName = imageFile.name.replace(/\s+/g, "-").toLowerCase();
      const path = `${userId}/${Date.now()}-${randomUUID()}-${sanitizedName}`;
      const bytes = Buffer.from(await imageFile.arrayBuffer());

      const uploadResult = await supabaseServer.storage.from(BUCKET_NAME).upload(path, bytes, {
        contentType: imageFile.type,
        upsert: false,
      });

      if (uploadResult.error) {
        return NextResponse.json({ ok: false, message: uploadResult.error.message }, { status: 400 });
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
      return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
    }

    const result = (data ?? {}) as CreatePostRpcResult;
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, message: result.message ?? "Could not create post" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, postId: result.post_id }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid multipart body" }, { status: 400 });
  }
}

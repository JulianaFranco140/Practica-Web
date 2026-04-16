import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

type RegisterResult = {
  ok: boolean;
  message?: string;
  user_id?: string;
};

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    if (username.length < 3) {
      return NextResponse.json({ ok: false, message: "Username must have at least 3 chars" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ ok: false, message: "Password must have at least 6 chars" }, { status: 400 });
    }

    const { data, error } = await supabaseServer.rpc("app_register", {
      p_username: username,
      p_password: password,
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
    }

    const result = (data ?? {}) as RegisterResult;
    if (!result.ok) {
      return NextResponse.json({ ok: false, message: result.message ?? "Could not register" }, { status: 400 });
    }

    return NextResponse.json({ ok: true, userId: result.user_id }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body" }, { status: 400 });
  }
}

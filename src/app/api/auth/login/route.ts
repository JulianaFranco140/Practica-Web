import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

type LoginResult = {
  ok: boolean;
  message?: string;
  user_id?: string;
  token?: string;
};

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    if (!username || !password) {
      return NextResponse.json({ ok: false, message: "Username and password are required" }, { status: 400 });
    }

    const { data, error } = await supabaseServer.rpc("app_login", {
      p_username: username,
      p_password: password,
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 401 });
    }

    const result = (data ?? {}) as LoginResult;
    if (!result.ok || !result.token) {
      return NextResponse.json(
        { ok: false, message: result.message ?? "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { ok: true, userId: result.user_id, token: result.token },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body" }, { status: 400 });
  }
}

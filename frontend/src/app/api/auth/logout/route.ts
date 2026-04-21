import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { token?: string };
    const token = body.token ?? "";

    if (!token) {
      return NextResponse.json({ ok: false, message: "Token is required" }, { status: 400 });
    }

    const { error } = await supabaseServer.rpc("app_logout", {
      p_token: token,
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body" }, { status: 400 });
  }
}

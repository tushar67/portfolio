import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username !== "tushar" || password !== "test123") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("admin", "true", {
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
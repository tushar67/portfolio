import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (
    body.password ===
    process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({
      success: true,
    });
  }

  return NextResponse.json({
    success: false,
  });
}
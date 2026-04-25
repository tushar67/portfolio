import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "data", "blogs.json");

export async function GET() {
  const data = fs.readFileSync(filePath, "utf8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: Request) {
  const body = await req.json();
  const blogs = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const newPost = {
    id: Date.now(),
    title: body.title,
    content: body.content,
    date: new Date().toISOString(),
  };

  blogs.push(newPost);
  fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));

  return NextResponse.json({ success: true });
}
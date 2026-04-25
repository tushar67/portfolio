"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [status, setStatus] = useState("");

  async function submitPost(e: any) {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
    };

    const res = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("Post created!");
      e.target.reset();
    } else {
      setStatus("Error creating post");
    }
  }

  return (
    <div style={{ padding: "120px 10%", color: "white" }}>
      <h1>Admin Dashboard</h1>

      <form onSubmit={submitPost} style={{ display: "flex", flexDirection: "column", gap: 15, maxWidth: 500 }}>
        <input name="title" placeholder="Post title" required />
        <textarea name="content" placeholder="Write your post..." required />
        <button>Create Post</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}
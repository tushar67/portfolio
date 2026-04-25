"use client";

import { supabase } from "@/lib/supabase";
import { use, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState(0);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [replyTo, setReplyTo] =
    useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, [slug]);

  async function loadData() {
    const { data: postData } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!postData) return;

    setPost(postData);
    setLikes(postData.likes || 0);

    const { data: rel } = await supabase
      .from("posts")
      .select("*")
      .neq("slug", slug)
      .limit(3);

    setRelated(rel || []);

    const { data: com } = await supabase
      .from("comments")
      .select("*")
      .eq("post_slug", slug)
      .order("id", { ascending: false });

    setComments(com || []);
  }

  async function likePost() {
    const newLikes = likes + 1;
    setLikes(newLikes);

    await supabase
      .from("posts")
      .update({ likes: newLikes })
      .eq("slug", slug);
  }

  async function addComment() {
    if (!name || !message) return;

    await supabase.from("comments").insert([
      {
        post_slug: slug,
        name,
        message,
        parent_id: replyTo,
      },
    ]);

    setName("");
    setMessage("");
    setReplyTo(null);

    loadData();
  }

  async function subscribe() {
    if (!email) return;

    const { error } = await supabase
      .from("subscribers")
      .insert([{ email }]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Subscribed!");
    setEmail("");
  }

  if (!post) {
    return (
      <main style={page}>
        <h1>Loading...</h1>
      </main>
    );
  }

  const url = `http://localhost:3000/blog/${slug}`;

  return (
    <main style={page}>
      <div style={container}>
        <p style={label}>ARTICLE</p>

        <h1 style={title}>{post.title}</h1>

        <p style={meta}>
          ❤️ {likes} • 👁️ {post.views || 0}
        </p>

        <p style={excerpt}>{post.excerpt}</p>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            style={cover}
          />
        )}

        <div style={contentBox}>
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Like */}
        <div style={{ marginTop: 24 }}>
          <button
            onClick={likePost}
            style={mainBtn}
          >
            ❤️ Like Article
          </button>
        </div>

        {/* Share */}
        <div style={{ marginTop: 45 }}>
          <h2>Share</h2>

          <div style={shareRow}>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
              target="_blank"
              style={pill}
            >
              LinkedIn
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${url}`}
              target="_blank"
              style={pill}
            >
              X
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div style={newsletter}>
          <h2>Newsletter</h2>

          <input
            placeholder="Your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={input}
          />

          <button
            onClick={subscribe}
            style={mainBtn}
          >
            Subscribe
          </button>
        </div>

        {/* Comments with Avatars */}
        <div style={{ marginTop: 70 }}>
          <h2>Comments</h2>

          {replyTo && (
            <p style={{ color: "#19E6D2" }}>
              Replying to comment #{replyTo}
            </p>
          )}

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={input}
          />

          <textarea
            placeholder="Write comment..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            style={textarea}
          />

          <button
            onClick={addComment}
            style={mainBtn}
          >
            {replyTo
              ? "Post Reply"
              : "Post Comment"}
          </button>

          <div style={{ marginTop: 30 }}>
            {comments
              .filter((c) => !c.parent_id)
              .map((c) => (
                <div
                  key={c.id}
                  style={commentWrap}
                >
                  <div style={avatar}>
                    {c.name?.charAt(0)}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={commentCard}>
                      <h4>{c.name}</h4>
                      <p>{c.message}</p>

                      <button
                        style={replyBtn}
                        onClick={() =>
                          setReplyTo(c.id)
                        }
                      >
                        Reply
                      </button>
                    </div>

                    {comments
                      .filter(
                        (r) =>
                          r.parent_id ===
                          c.id
                      )
                      .map((r) => (
                        <div
                          key={r.id}
                          style={replyRow}
                        >
                          <div
                            style={
                              smallAvatar
                            }
                          >
                            {r.name?.charAt(
                              0
                            )}
                          </div>

                          <div
                            style={
                              replyBox
                            }
                          >
                            <b>{r.name}</b>
                            <p>
                              {r.message}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Related */}
        <div style={{ marginTop: 80 }}>
          <h2>More Articles</h2>

          <div style={relatedGrid}>
            {related.map((item) => (
              <a
                key={item.id}
                href={`/blog/${item.slug}`}
                style={{
                  textDecoration:
                    "none",
                  color: "white",
                }}
              >
                <div
                  style={relatedCard}
                >
                  <h3>{item.title}</h3>
                  <p>
                    {item.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <a href="/blog" style={back}>
          ← Back to Blog
        </a>
      </div>
    </main>
  );
}

/* Styles */

const page = {
  minHeight: "100vh",
  padding: "90px 8%",
  background:
    "linear-gradient(135deg,#00151a,#002d36,#001219)",
  color: "white",
};

const container = {
  maxWidth: 920,
  margin: "0 auto",
};

const label = {
  color: "#19E6D2",
  fontWeight: 800,
};

const title = {
  fontSize: 62,
  fontWeight: 900,
};

const meta = {
  opacity: 0.7,
  marginTop: 10,
};

const excerpt = {
  fontSize: 22,
  marginTop: 20,
};

const cover = {
  width: "100%",
  borderRadius: 28,
  marginTop: 30,
};

const contentBox = {
  marginTop: 30,
  padding: 34,
  borderRadius: 28,
  background:
    "rgba(255,255,255,0.06)",
};

const newsletter = {
  marginTop: 60,
  padding: 28,
  borderRadius: 24,
  background:
    "rgba(255,255,255,0.06)",
};

const input = {
  width: "100%",
  padding: 16,
  borderRadius: 16,
  border: "none",
  marginTop: 14,
};

const textarea = {
  width: "100%",
  minHeight: 140,
  padding: 16,
  borderRadius: 16,
  border: "none",
  marginTop: 14,
};

const mainBtn = {
  marginTop: 16,
  padding: "14px 24px",
  borderRadius: 999,
  border: "none",
  background: "#19E6D2",
  fontWeight: 800,
  cursor: "pointer",
};

const shareRow = {
  display: "flex",
  gap: 12,
  marginTop: 12,
};

const pill = {
  padding: "10px 16px",
  borderRadius: 999,
  background:
    "rgba(255,255,255,0.08)",
  color: "white",
  textDecoration: "none",
};

const commentWrap = {
  display: "flex",
  gap: 16,
  marginBottom: 22,
};

const avatar = {
  width: 52,
  height: 52,
  borderRadius: "50%",
  background: "#19E6D2",
  color: "#00151a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
  fontSize: 22,
};

const smallAvatar = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: "#19E6D2",
  color: "#00151a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
};

const commentCard = {
  background:
    "rgba(255,255,255,0.05)",
  padding: 20,
  borderRadius: 20,
};

const replyBtn = {
  marginTop: 10,
  padding: "8px 14px",
  borderRadius: 999,
  border: "none",
  background: "#19E6D2",
  cursor: "pointer",
};

const replyRow = {
  display: "flex",
  gap: 12,
  marginTop: 12,
  marginLeft: 30,
};

const replyBox = {
  background:
    "rgba(255,255,255,0.04)",
  padding: 14,
  borderRadius: 16,
  flex: 1,
};

const relatedGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(260px,1fr))",
  gap: 18,
  marginTop: 20,
};

const relatedCard = {
  padding: 22,
  borderRadius: 22,
  background:
    "rgba(255,255,255,0.06)",
};

const back = {
  display: "inline-block",
  marginTop: 50,
  color: "#19E6D2",
  textDecoration: "none",
};
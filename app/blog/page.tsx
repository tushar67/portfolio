"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] =
    useState(true);
  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const { data, error } =
        await supabase
          .from("posts")
          .select("*")
          .order("id", {
            ascending: false,
          });

      if (error) {
        console.log(error);
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const filtered =
    posts.filter((post) =>
      post.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    ) || [];

  if (loading) {
    return (
      <main style={page}>
        <div style={wrap}>
          <h1 style={title}>
            Loading...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main style={page}>
      <div style={wrap}>
        {/* Hero */}
        <h1 style={title}>
          Blog
        </h1>

        <p style={subtitle}>
          Insights, projects,
          machine learning,
          career growth &
          building in public.
        </p>

        {/* Search */}
        <input
          placeholder="Search articles..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={searchBox}
        />

        {/* Featured */}
        {filtered[0] && (
          <a
            href={`/blog/${filtered[0].slug}`}
            style={heroCard}
          >
            <p style={tag}>
              FEATURED POST
            </p>

            <h2 style={heroTitle}>
              {
                filtered[0]
                  .title
              }
            </h2>

            <p style={heroText}>
              {
                filtered[0]
                  .excerpt
              }
            </p>

            <span style={readBtn}>
              Read Now →
            </span>
          </a>
        )}

        {/* Grid */}
        <div style={grid}>
          {filtered
            .slice(1)
            .map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                style={card}
              >
                <h2
                  style={
                    cardTitle
                  }
                >
                  {
                    post.title
                  }
                </h2>

                <p
                  style={
                    cardText
                  }
                >
                  {
                    post.excerpt
                  }
                </p>

                <span
                  style={
                    readLink
                  }
                >
                  Read →
                </span>
              </a>
            ))}
        </div>

        {filtered.length ===
          0 && (
          <p
            style={{
              marginTop: 40,
              opacity: 0.7,
            }}
          >
            No articles
            found.
          </p>
        )}
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

const wrap = {
  maxWidth: 1200,
  margin: "0 auto",
};

const title = {
  fontSize: 82,
  fontWeight: 900,
  marginBottom: 12,
};

const subtitle = {
  fontSize: 22,
  opacity: 0.75,
  maxWidth: 760,
  lineHeight: 1.6,
};

const searchBox = {
  width: "100%",
  marginTop: 30,
  padding: 18,
  borderRadius: 18,
  border: "none",
  fontSize: 18,
};

const heroCard = {
  display: "block",
  marginTop: 34,
  padding: 38,
  borderRadius: 30,
  textDecoration: "none",
  color: "white",
  background:
    "linear-gradient(135deg,rgba(25,230,210,0.15),rgba(255,255,255,0.04))",
};

const tag = {
  color: "#19E6D2",
  fontWeight: 800,
  letterSpacing: 2,
};

const heroTitle = {
  fontSize: 46,
  fontWeight: 900,
  marginTop: 14,
};

const heroText = {
  marginTop: 14,
  fontSize: 20,
  opacity: 0.75,
  lineHeight: 1.7,
};

const readBtn = {
  display: "inline-block",
  marginTop: 24,
  color: "#19E6D2",
  fontWeight: 800,
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(320px,1fr))",
  gap: 24,
  marginTop: 36,
};

const card = {
  display: "block",
  padding: 28,
  borderRadius: 26,
  background:
    "rgba(255,255,255,0.06)",
  color: "white",
  textDecoration: "none",
};

const cardTitle = {
  fontSize: 28,
  fontWeight: 800,
};

const cardText = {
  marginTop: 14,
  opacity: 0.72,
  lineHeight: 1.7,
};

const readLink = {
  display: "inline-block",
  marginTop: 20,
  color: "#19E6D2",
  fontWeight: 700,
};
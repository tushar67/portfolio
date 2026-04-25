"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import FeaturedProjectsCarousel from "./components/FeaturedProjectsCarousel";

export default function Page() {
  const [projects, setProjects] =
    useState<any[]>([]);
  const [blogs, setBlogs] =
    useState<any[]>([]);
  const [videoUrl, setVideoUrl] =
    useState<string | null>(null);

  useEffect(() => {
    loadData();

    document.documentElement.style.scrollBehavior =
      "smooth";
  }, []);

  async function loadData() {
    const { data: projectData } =
      await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("id", {
          ascending: false,
        });

    const { data: blogData } =
      await supabase
        .from("posts")
        .select("*")
        .order("id", {
          ascending: false,
        })
        .limit(3);

    setProjects(projectData || []);
    setBlogs(blogData || []);
  }

  function getEmbedUrl(
    url: string
  ) {
    if (
      url.includes(
        "youtube.com/embed"
      )
    )
      return url;

    if (
      url.includes(
        "watch?v="
      )
    ) {
      const id =
        url
          .split(
            "watch?v="
          )[1]
          .split("&")[0];

      return `https://www.youtube.com/embed/${id}`;
    }

    if (
      url.includes(
        "youtu.be/"
      )
    ) {
      const id =
        url.split(
          "youtu.be/"
        )[1];

      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  }

  const skills = [
    ["🐍", "Python"],
    ["📊", "R"],
    ["🟨", "JavaScript"],
    ["🤖", "Machine Learning"],
    ["🧠", "NLP"],
    [
      "⚙️",
      "Feature Engineering",
    ],
    ["⚛️", "React"],
    ["▲", "Next.js"],
    ["🐳", "Docker"],
  ];

  return (
    <main style={page}>
      {/* HERO */}
      <section style={hero}>
        <p style={small}>
          DATA SCIENTIST •
          AI BUILDER
        </p>

        <h1 style={heroTitle}>
          I build AI systems
          that turn data
          into decisions
        </h1>

        <p style={heroText}>
          Data Scientist
          focused on ML,
          NLP, automation
          and real-world
          impact.
        </p>

        <div style={heroBtns}>
          <a
            href="/resume.pdf"
            style={mainBtn}
          >
            Download Resume
          </a>

          <a
            href="https://github.com/tushar67"
            target="_blank"
            style={ghostBtn}
          >
            GitHub →
          </a>
        </div>
      </section>

      {/* PREMIUM CAROUSEL */}
      <FeaturedProjectsCarousel />

      {/* PROJECTS */}
      <section
        id="projects"
        style={section}
      >
        <h2 style={heading}>
          Selected Work
        </h2>

        <div style={grid}>
          {projects.map((p) => (
            <div
              key={p.id}
              style={card}
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  style={img}
                />
              )}

              <h3
                style={
                  cardTitle
                }
              >
                {p.title}
              </h3>

              <p style={muted}>
                {
                  p.description
                }
              </p>

              <p style={tech}>
                {p.tech}
              </p>

              <div style={row}>
                {p.github && (
                  <a
                    href={
                      p.github
                    }
                    target="_blank"
                    style={
                      linkBtn
                    }
                  >
                    View Code →
                  </a>
                )}

                {p.demo && (
                  <button
                    style={
                      mainBtnSmall
                    }
                    onClick={() =>
                      setVideoUrl(
                        p.demo
                      )
                    }
                  >
                    ▶ Demo
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        style={section}
      >
        <h2 style={heading}>
          Skills & Tools
        </h2>

        <div style={skillGrid}>
          {skills.map(
            (s, i) => (
              <div
                key={i}
                style={
                  skillCard
                }
              >
                <div
                  style={
                    icon
                  }
                >
                  {s[0]}
                </div>

                <span>
                  {s[1]}
                </span>
              </div>
            )
          )}
        </div>
      </section>

      {/* BLOG */}
      <section
        id="blog"
        style={section}
      >
        <h2 style={heading}>
          Latest Writing
        </h2>

        <div style={grid}>
          {blogs.map((b) => (
            <a
              key={b.id}
              href={`/blog/${b.slug}`}
              style={{
                textDecoration:
                  "none",
                color:
                  "white",
              }}
            >
              <div
                style={
                  card
                }
              >
                <h3
                  style={
                    cardTitle
                  }
                >
                  {b.title}
                </h3>

                <p
                  style={
                    muted
                  }
                >
                  {b.excerpt}
                </p>

                <div
                  style={{
                    color:
                      "#19E6D2",
                    marginTop: 18,
                  }}
                >
                  Read →
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={section}
      >
        <h2 style={heading}>
          Contact
        </h2>

        <div
          style={
            contactBox
          }
        >
          <p
            style={
              contactTitle
            }
          >
            Let’s build
            something
            powerful.
          </p>

          <p
            style={muted}
          >
            Open for AI,
            Data Science,
            Automation,
            Research,
            Startups and
            Freelance
            opportunities.
          </p>

          <div style={row}>
            <a
              href="mailto:tusharsinha67@gmail.com"
              style={
                mainBtn
              }
            >
              Email
            </a>

            <a
              href="https://github.com/tushar67"
              target="_blank"
              style={
                ghostBtn
              }
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              style={
                ghostBtn
              }
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      {videoUrl && (
        <div
          onClick={() =>
            setVideoUrl(
              null
            )
          }
          style={overlay}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={modal}
          >
            <button
              onClick={() =>
                setVideoUrl(
                  null
                )
              }
              style={
                closeBtn
              }
            >
              ✕
            </button>

            <iframe
              width="100%"
              height="100%"
              src={getEmbedUrl(
                videoUrl
              )}
              allowFullScreen
              style={{
                border:
                  "none",
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}

/* STYLES */

const page = {
  background:
    "linear-gradient(135deg,#00232A,#003843,#00181d)",
  minHeight:
    "100vh",
  color: "white",
  padding:
    "40px 6%",
};

const hero = {
  paddingTop: 120,
  paddingBottom: 80,
  maxWidth: 900,
};

const small = {
  color:
    "#19E6D2",
  letterSpacing: 2,
};

const heroTitle = {
  fontSize: 74,
  lineHeight: 1,
  marginTop: 20,
};

const heroText = {
  fontSize: 22,
  opacity: 0.75,
  marginTop: 26,
};

const heroBtns = {
  display: "flex",
  gap: 16,
  marginTop: 34,
};

const section = {
  paddingTop: 70,
};

const heading = {
  fontSize: 58,
  marginBottom: 30,
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(340px,1fr))",
  gap: 22,
};

const card = {
  background:
    "rgba(255,255,255,0.05)",
  borderRadius: 28,
  padding: 26,
};

const cardTitle = {
  fontSize: 30,
};

const muted = {
  opacity: 0.75,
};

const tech = {
  color:
    "#19E6D2",
  marginTop: 12,
};

const row = {
  display: "flex",
  gap: 12,
  marginTop: 20,
  flexWrap:
    "wrap" as const,
};

const img = {
  width: "100%",
  height: 220,
  objectFit:
    "cover" as const,
  borderRadius: 18,
};

const mainBtn = {
  padding:
    "14px 24px",
  borderRadius:
    999,
  background:
    "#19E6D2",
  color:
    "#00232A",
  textDecoration:
    "none",
};

const ghostBtn = {
  padding:
    "14px 24px",
  borderRadius:
    999,
  border:
    "1px solid rgba(255,255,255,0.15)",
  color:
    "white",
  textDecoration:
    "none",
};

const mainBtnSmall = {
  padding:
    "10px 18px",
  borderRadius:
    999,
  border:
    "none",
  background:
    "#19E6D2",
};

const linkBtn = {
  color:
    "#19E6D2",
};

const skillGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(180px,1fr))",
  gap: 18,
};

const skillCard = {
  background:
    "rgba(255,255,255,0.05)",
  borderRadius: 22,
  padding: 24,
  textAlign:
    "center" as const,
};

const icon = {
  fontSize: 32,
};

const contactBox = {
  background:
    "rgba(255,255,255,0.05)",
  borderRadius: 28,
  padding: 30,
};

const contactTitle = {
  fontSize: 34,
  fontWeight: 800,
  marginBottom: 14,
};

const overlay = {
  position:
    "fixed" as const,
  inset: 0,
  background:
    "rgba(0,0,0,0.8)",
  display: "flex",
  justifyContent:
    "center",
  alignItems:
    "center",
};

const modal = {
  width: "85%",
  maxWidth: 1100,
  height: "75%",
  background:
    "#000",
  borderRadius: 24,
  overflow:
    "hidden",
  position:
    "relative" as const,
};

const closeBtn = {
  position:
    "absolute" as const,
  top: 14,
  right: 14,
  zIndex: 10,
  width: 40,
  height: 40,
  borderRadius:
    "50%",
  border:
    "none",
};
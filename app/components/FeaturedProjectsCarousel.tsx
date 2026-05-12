"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function FeaturedProjectsCarousel() {
  const [projects, setProjects] =
    useState<any[]>([]);

  const [index, setIndex] =
    useState(0);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (!projects.length) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () =>
      clearInterval(timer);
  }, [projects, index]);

  async function loadProjects() {
    const { data } =
      await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("id", {
          ascending: false,
        });

    setProjects(data || []);
  }

  function nextSlide() {
    setIndex((prev) =>
      prev ===
      projects.length - 1
        ? 0
        : prev + 1
    );
  }

  function prevSlide() {
    setIndex((prev) =>
      prev === 0
        ? projects.length - 1
        : prev - 1
    );
  }

  if (!projects.length)
    return null;

  return (
    <section style={wrap}>
      <h2 style={title}>
        Featured Projects
      </h2>

      <div style={slider}>
        {/* LEFT */}

        <button
          onClick={prevSlide}
          style={arrowLeft}
        >
          ‹
        </button>

        {/* SLIDER */}

        <div style={trackWrap}>
          <div
            style={{
              ...track,

              transform: `translateX(-${
                index * 100
              }%)`,
            }}
          >
            {projects.map((p) => (
              <div
                key={p.id}
                style={slide}
              >
                {/* IMAGE */}

                {p.image_url && (
                  <img
                    src={
                      p.image_url
                    }
                    alt={p.title}
                    style={bgImage}
                  />
                )}

                {/* OVERLAY */}

                <div
                  style={overlay}
                />

                {/* CONTENT */}

                <div
                  style={content}
                >
                  <h3 style={name}>
                    {p.title}
                  </h3>

                  <p style={desc}>
                    {
                      p.description
                    }
                  </p>

                  <p style={tech}>
                    {p.tech}
                  </p>

                  <div
                    style={
                      btnRow
                    }
                  >
                    {p.github && (
                      <a
                        href={
                          p.github
                        }
                        target="_blank"
                        style={btn}
                      >
                        Code
                      </a>
                    )}

                    {p.demo && (
                      <a
                        href={
                          p.demo
                        }
                        target="_blank"
                        style={
                          btn2
                        }
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}

        <button
          onClick={nextSlide}
          style={arrowRight}
        >
          ›
        </button>
      </div>

      {/* DOTS */}

      <div style={dots}>
        {projects.map(
          (_, i) => (
            <div
              key={i}
              onClick={() =>
                setIndex(i)
              }
              style={{
                ...dot,

                opacity:
                  index === i
                    ? 1
                    : 0.35,

                transform:
                  index === i
                    ? "scale(1.2)"
                    : "scale(1)",
              }}
            />
          )
        )}
      </div>
    </section>
  );
}

/* STYLES */

const wrap = {
  paddingTop: 120,

  position:
    "relative" as const,

  zIndex: 1,
};

const title = {
  fontSize: 56,

  color: "white",

  marginBottom: 28,
};

const slider = {
  position:
    "relative" as const,
};

const trackWrap = {
  overflow: "hidden",

  borderRadius: 36,
};

const track = {
  display: "flex",

  transition:
    "all 0.8s ease",
};

const slide = {
  minWidth: "100%",

  position:
    "relative" as const,

  overflow: "hidden",

  borderRadius: 36,

  minHeight: 520,

  display: "flex",

  alignItems: "center",

  padding: "60px",

  background:
    "linear-gradient(135deg,#021d23,#032d35)",

  border:
    "1px solid rgba(255,255,255,0.06)",
};

const bgImage = {
  position:
    "absolute" as const,

  inset: 0,

  width: "100%",

  height: "100%",

  objectFit:
    "cover" as const,

  opacity: 0.55,

  zIndex: 1,
};

const overlay = {
  position:
    "absolute" as const,

  inset: 0,

  background:
    "linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.15))",

  zIndex: 2,
};

const content = {
  position:
    "relative" as const,

  zIndex: 3,

  maxWidth: 760,
};

const name = {
  fontSize: 62,

  fontWeight: 800,

  color: "white",

  marginBottom: 18,
};

const desc = {
  color:
    "rgba(255,255,255,0.82)",

  fontSize: 28,

  lineHeight: 1.5,

  marginBottom: 18,
};

const tech = {
  color: "#19E6D2",

  fontSize: 22,

  marginBottom: 34,
};

const btnRow = {
  display: "flex",

  gap: 16,
};

const btn = {
  padding: "14px 30px",

  borderRadius: 999,

  background: "#19E6D2",

  color: "#00232A",

  textDecoration: "none",

  fontWeight: 700,

  fontSize: 18,
};

const btn2 = {
  padding: "14px 30px",

  borderRadius: 999,

  border:
    "1px solid rgba(255,255,255,0.18)",

  color: "white",

  textDecoration: "none",

  fontSize: 18,
};

const arrowLeft = {
  position:
    "absolute" as const,

  left: -22,

  top: "50%",

  transform:
    "translateY(-50%)",

  zIndex: 10,

  width: 58,

  height: 58,

  borderRadius: "50%",

  border: "none",

  fontSize: 38,

  background: "#19E6D2",

  cursor: "pointer",

  boxShadow:
    "0 10px 24px rgba(0,0,0,0.3)",
};

const arrowRight = {
  position:
    "absolute" as const,

  right: -22,

  top: "50%",

  transform:
    "translateY(-50%)",

  zIndex: 10,

  width: 58,

  height: 58,

  borderRadius: "50%",

  border: "none",

  fontSize: 38,

  background: "#19E6D2",

  cursor: "pointer",

  boxShadow:
    "0 10px 24px rgba(0,0,0,0.3)",
};

const dots = {
  display: "flex",

  justifyContent:
    "center",

  gap: 10,

  marginTop: 22,
};

const dot = {
  width: 12,

  height: 12,

  borderRadius: "50%",

  background: "#19E6D2",

  cursor: "pointer",

  transition: "0.3s",
};
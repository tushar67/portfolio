"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function FeaturedProjectsCarousel() {
  const [projects, setProjects] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (!projects.length) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [projects, index]);

  async function loadProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("id", { ascending: false });

    setProjects(data || []);
  }

  function nextSlide() {
    setIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  }

  function prevSlide() {
    setIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  }

  if (!projects.length) return null;

  return (
    <section style={wrap}>
      <h2 style={title}>Featured Projects</h2>

      <div style={slider}>
        <button onClick={prevSlide} style={arrowLeft}>
          ‹
        </button>

        <div style={trackWrap}>
          <div
            style={{
              ...track,
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {projects.map((p) => (
              <div key={p.id} style={slide}>
                {p.image_url && (
                  <img
                    src={p.image_url}
                    style={img}
                  />
                )}

                <div style={content}>
                  <h3 style={name}>
                    {p.title}
                  </h3>

                  <p style={desc}>
                    {p.description}
                  </p>

                  <p style={tech}>
                    {p.tech}
                  </p>

                  <div style={btnRow}>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        style={btn}
                      >
                        Code
                      </a>
                    )}

                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        style={btn2}
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

        <button onClick={nextSlide} style={arrowRight}>
          ›
        </button>
      </div>

      <div style={dots}>
        {projects.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              ...dot,
              opacity: index === i ? 1 : 0.35,
              transform:
                index === i
                  ? "scale(1.2)"
                  : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

const wrap = {
  paddingTop: 70,
};

const title = {
  fontSize: 56,
  color: "white",
  marginBottom: 24,
};

const slider = {
  position: "relative" as const,
};

const trackWrap = {
  overflow: "hidden",
  borderRadius: 28,
};

const track = {
  display: "flex",
  transition: "all 0.8s ease",
};

const slide = {
  minWidth: "100%",
  background:
    "linear-gradient(135deg,#03242b,#062e36)",
  borderRadius: 28,
  padding: 28,
};

const img = {
  width: "100%",
  height: 380,
  objectFit: "cover" as const,
  borderRadius: 22,
};

const content = {
  marginTop: 24,
};

const name = {
  fontSize: 34,
  color: "white",
};

const desc = {
  color: "rgba(255,255,255,0.75)",
  marginTop: 10,
  fontSize: 18,
  lineHeight: 1.6,
};

const tech = {
  color: "#19E6D2",
  marginTop: 12,
};

const btnRow = {
  display: "flex",
  gap: 14,
  marginTop: 24,
};

const btn = {
  padding: "12px 20px",
  borderRadius: 999,
  background: "#19E6D2",
  color: "#00232A",
  textDecoration: "none",
  fontWeight: 700,
};

const btn2 = {
  padding: "12px 20px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.18)",
  color: "white",
  textDecoration: "none",
};

const arrowLeft = {
  position: "absolute" as const,
  left: -18,
  top: "45%",
  zIndex: 5,
  width: 52,
  height: 52,
  borderRadius: "50%",
  border: "none",
  fontSize: 32,
  background: "#19E6D2",
  cursor: "pointer",
};

const arrowRight = {
  position: "absolute" as const,
  right: -18,
  top: "45%",
  zIndex: 5,
  width: 52,
  height: 52,
  borderRadius: "50%",
  border: "none",
  fontSize: 32,
  background: "#19E6D2",
  cursor: "pointer",
};

const dots = {
  display: "flex",
  justifyContent: "center",
  gap: 10,
  marginTop: 20,
};

const dot = {
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: "#19E6D2",
  cursor: "pointer",
  transition: "0.3s",
};
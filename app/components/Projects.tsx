"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Projects() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.from(cardsRef.current.filter(Boolean), {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, []);

  const projects = [
    {
      title: "AI Job Recommendation System",
      dataset: "Resume + Job text data",
      problem: "Manual candidate-job matching is slow and inconsistent.",
      approach: "TF-IDF + cosine similarity NLP pipeline.",
      result: "Improved relevance by ~35%.",
      github: "https://github.com/tushar67",
      video: "https://www.youtube.com/embed/jNQXAC9IVRw",
    },
    {
      title: "Customer Churn Prediction",
      dataset: "Customer behavior data",
      problem: "Businesses lose customers unexpectedly.",
      approach: "Logistic Regression + XGBoost.",
      result: "Identified churn risk segments.",
      github: "https://github.com/tushar67",
      video: "https://www.youtube.com/embed/jNQXAC9IVRw",
    },
    {
      title: "LLM Chatbot",
      dataset: "Internal docs / PDFs",
      problem: "Searching documents wastes time.",
      approach: "LangChain + OpenAI retrieval chatbot.",
      result: "Instant answers from documents.",
      github: "https://github.com/tushar67",
      video: "https://www.youtube.com/embed/jNQXAC9IVRw",
    },
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2 style={{ fontSize: 48 }}>Projects</h2>

        <p style={{ marginTop: 12, color: "#bdd6d8" }}>
          Real-world projects focused on measurable impact.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 24,
            marginTop: 40,
          }}
        >
          {projects.map((p, i) => (
            <div
              key={i}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[i] = el;
              }}
              className="card"
            >
              <h3 style={{ fontSize: 26 }}>{p.title}</h3>

              <p><b>Dataset:</b> {p.dataset}</p>
              <p><b>Problem:</b> {p.problem}</p>
              <p><b>Approach:</b> {p.approach}</p>
              <p><b>Result:</b> {p.result}</p>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <a href={p.github} target="_blank" rel="noreferrer">
                  <button className="btn btn-outline">
                    GitHub
                  </button>
                </a>

                <button
                  className="btn btn-primary"
                  onClick={() => setVideoUrl(p.video)}
                >
                  ▶ Demo
                </button>
              </div>
            </div>
          ))}
        </div>

        {videoUrl && (
          <div
            onClick={() => setVideoUrl(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: 20,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "90%",
                maxWidth: 1000,
                aspectRatio: "16/9",
                borderRadius: 18,
                overflow: "hidden",
                background: "#000",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
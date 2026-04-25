export default function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            display: "inline-block",
            marginBottom: 20,
          }}
        >
          Data Scientist | AI | NLP | Business Impact
        </div>

        <h1
          style={{
            fontSize: "4.5rem",
            maxWidth: 800,
            lineHeight: 1.05,
          }}
        >
          I build AI systems that turn data into business decisions
        </h1>

        <p
          style={{
            marginTop: 24,
            fontSize: 22,
            color: "#bdd6d8",
            maxWidth: 700,
          }}
        >
          Data Scientist focused on AI-powered decision systems and real-world impact.
        </p>

        <div style={{ display: "flex", gap: 14, marginTop: 30 }}>
          <button className="btn btn-primary">Download Resume</button>
          <a href="https://github.com/tushar67" target="_blank">
            <button className="btn btn-outline">GitHub</button>
          </a>
        </div>
      </div>
    </section>
  );
}
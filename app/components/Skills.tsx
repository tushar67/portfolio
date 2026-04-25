export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2 style={{ fontSize: 48 }}>Skills</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 24,
            marginTop: 35,
          }}
        >
          <div className="card">
            <h4>Languages</h4>
            <p>Python, SQL, JavaScript, R</p>
          </div>

          <div className="card">
            <h4>ML / AI</h4>
            <p>Scikit-learn, TensorFlow, NLP, XGBoost</p>
          </div>

          <div className="card">
            <h4>Data</h4>
            <p>Pandas, NumPy, Analytics</p>
          </div>

          <div className="card">
            <h4>Tools</h4>
            <p>Git, Docker, Next.js, FastAPI</p>
          </div>
        </div>
      </div>
    </section>
  );
}
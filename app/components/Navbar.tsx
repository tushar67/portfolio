export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: 1280,
        zIndex: 999,
        padding: "16px 28px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(18px)",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <b>Tushar</b>

      <div style={{ display: "flex", gap: 24 }}>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="/blog">Blog</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
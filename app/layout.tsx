import "./globals.css";

export const metadata = {
  title: "Tushar Sinha",
  description:
    "AI Portfolio • Data Scientist • Builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={body}>
        {/* SMALLER PREMIUM NAVBAR */}
        <header style={nav}>
          <a
            href="/"
            style={logo}
          >
            Tushar
          </a>

          <nav style={menu}>
            <a
              href="/#projects"
              style={link}
            >
              Projects
            </a>

            <a
              href="/#skills"
              style={link}
            >
              Skills
            </a>

            <a
              href="/blog"
              style={link}
            >
              Blog
            </a>

            <a
              href="/#contact"
              style={link}
            >
              Contact
            </a>
          </nav>
        </header>

        <main>{children}</main>

        <footer style={footer}>
          <h2 style={footTitle}>
            Tushar Sinha
          </h2>

          <p style={footText}>
            Data Scientist • AI Engineer • Builder
          </p>

          <div style={socials}>
            <a
              href="https://github.com/tushar67"
              target="_blank"
              style={footLink}
            >
              GitHub
            </a>

            <a
              href="/blog"
              style={footLink}
            >
              Blog
            </a>
          </div>

          <p style={copy}>
            © 2026 Tushar Sinha
          </p>
        </footer>
      </body>
    </html>
  );
}

/* ---------- Styles ---------- */

const body = {
  margin: 0,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"SF Pro Display","Inter",sans-serif',
  background:
    "linear-gradient(135deg,#00161a,#00252c,#001015)",
  color: "white",
};

/* SMALLER NAVBAR */
const nav = {
  height: 68,
  width: "88%",
  margin: "14px auto 0 auto",
  padding: "0 28px",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  position: "sticky" as const,
  top: 14,
  zIndex: 999,

  borderRadius: 18,

  backdropFilter: "blur(18px)",
  WebkitBackdropFilter:
    "blur(18px)",

  background:
    "linear-gradient(135deg, rgba(25,230,210,0.08), rgba(255,255,255,0.03))",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 10px 24px rgba(0,0,0,0.18)",
};

const logo = {
  color: "white",
  textDecoration: "none",
  fontSize: 28,
  fontWeight: 800,
  letterSpacing: "-0.5px",
};

const menu = {
  display: "flex",
  gap: 24,
};

const link = {
  color:
    "rgba(255,255,255,0.88)",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 16,
};

/* FOOTER */
const footer = {
  marginTop: 120,
  padding:
    "70px 8% 50px 8%",
  borderTop:
    "1px solid rgba(255,255,255,0.06)",
};

const footTitle = {
  fontSize: 32,
  marginBottom: 8,
};

const footText = {
  opacity: 0.7,
  fontSize: 18,
};

const socials = {
  display: "flex",
  gap: 24,
  marginTop: 24,
};

const footLink = {
  color: "#19E6D2",
  textDecoration: "none",
  fontWeight: 600,
};

const copy = {
  marginTop: 30,
  opacity: 0.45,
  fontSize: 14,
};
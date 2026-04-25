"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });

    setProjects(data || []);
  }

  function autoSlug(v: string) {
    return v
      .toLowerCase()
      .replaceAll(" ", "-")
      .replace(/[^\w-]+/g, "");
  }

  async function saveProject() {
    if (!title || !slug) {
      alert("Title and slug required");
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("projects")
        .update({
          title,
          slug,
          description,
          tech,
          github,
          demo,
          image_url: imageUrl,
          featured,
        })
        .eq("id", editingId);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Project Updated");
    } else {
      const { error } = await supabase
        .from("projects")
        .insert([
          {
            title,
            slug,
            description,
            tech,
            github,
            demo,
            image_url: imageUrl,
            featured,
          },
        ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Project Added");
    }

    clearForm();
    loadProjects();
  }

  async function deleteProject(id: number) {
    const ok = confirm("Delete this project?");
    if (!ok) return;

    await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    loadProjects();
  }

  function editProject(p: any) {
    setEditingId(p.id);
    setTitle(p.title || "");
    setSlug(p.slug || "");
    setDescription(p.description || "");
    setTech(p.tech || "");
    setGithub(p.github || "");
    setDemo(p.demo || "");
    setImageUrl(p.image_url || "");
    setFeatured(p.featured);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function clearForm() {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setTech("");
    setGithub("");
    setDemo("");
    setImageUrl("");
    setFeatured(true);
  }

  return (
    <main style={page}>
      <div style={wrap}>
        <h1 style={titleStyle}>
          Project Admin CMS
        </h1>

        {/* FORM */}
        <div style={card}>
          <h2 style={sub}>
            {editingId
              ? "Edit Project"
              : "Add Project"}
          </h2>

          <input
            style={input}
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!editingId) {
                setSlug(
                  autoSlug(e.target.value)
                );
              }
            }}
          />

          <input
            style={input}
            placeholder="Slug"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value)
            }
          />

          <textarea
            style={textarea}
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <input
            style={input}
            placeholder="Tech Stack (Python, NLP, Next.js)"
            value={tech}
            onChange={(e) =>
              setTech(e.target.value)
            }
          />

          <input
            style={input}
            placeholder="GitHub URL"
            value={github}
            onChange={(e) =>
              setGithub(
                e.target.value
              )
            }
          />

          <input
            style={input}
            placeholder="Live Demo URL"
            value={demo}
            onChange={(e) =>
              setDemo(e.target.value)
            }
          />

          <input
            style={input}
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(
                e.target.value
              )
            }
          />

          <label
            style={{
              marginTop: 14,
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(
                  e.target.checked
                )
              }
            />
            Featured Project
          </label>

          <div style={row}>
            <button
              style={mainBtn}
              onClick={saveProject}
            >
              {editingId
                ? "Update Project"
                : "Add Project"}
            </button>

            {editingId && (
              <button
                style={ghostBtn}
                onClick={clearForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* LIST */}
        <div style={{ marginTop: 40 }}>
          <h2 style={sub}>
            All Projects (
            {projects.length})
          </h2>

          <div style={grid}>
            {projects.map((p) => (
              <div
                key={p.id}
                style={projectCard}
              >
                {p.image_url && (
                  <img
                    src={p.image_url}
                    style={img}
                  />
                )}

                <h3>{p.title}</h3>

                <p style={muted}>
                  {p.description}
                </p>

                <p style={techStyle}>
                  {p.tech}
                </p>

                <div style={row}>
                  <button
                    style={ghostBtn}
                    onClick={() =>
                      editProject(p)
                    }
                  >
                    Edit
                  </button>

                  <button
                    style={deleteBtn}
                    onClick={() =>
                      deleteProject(
                        p.id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background:
    "linear-gradient(135deg,#00232A,#003843,#00181d)",
  color: "white",
  padding: "60px 6%",
};

const wrap = {
  maxWidth: 1300,
  margin: "0 auto",
};

const titleStyle = {
  fontSize: 58,
  marginBottom: 30,
};

const sub = {
  fontSize: 30,
  marginBottom: 20,
};

const card = {
  background:
    "rgba(255,255,255,0.05)",
  borderRadius: 28,
  padding: 28,
  border:
    "1px solid rgba(255,255,255,0.08)",
};

const input = {
  width: "100%",
  padding: 16,
  borderRadius: 16,
  border: "none",
  marginBottom: 14,
};

const textarea = {
  width: "100%",
  minHeight: 130,
  padding: 16,
  borderRadius: 16,
  border: "none",
  marginBottom: 14,
};

const row = {
  display: "flex",
  gap: 14,
  flexWrap: "wrap" as const,
  marginTop: 16,
};

const mainBtn = {
  padding: "14px 26px",
  borderRadius: 999,
  border: "none",
  background: "#19E6D2",
  fontWeight: 800,
  cursor: "pointer",
};

const ghostBtn = {
  padding: "14px 26px",
  borderRadius: 999,
  border:
    "1px solid rgba(255,255,255,0.15)",
  background: "transparent",
  color: "white",
  cursor: "pointer",
};

const deleteBtn = {
  padding: "14px 26px",
  borderRadius: 999,
  border: "none",
  background: "#ff4d4d",
  color: "white",
  cursor: "pointer",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(320px,1fr))",
  gap: 20,
};

const projectCard = {
  background:
    "rgba(255,255,255,0.05)",
  padding: 20,
  borderRadius: 24,
};

const img = {
  width: "100%",
  height: 180,
  objectFit: "cover" as const,
  borderRadius: 18,
  marginBottom: 16,
};

const muted = {
  opacity: 0.75,
  lineHeight: 1.6,
};

const techStyle = {
  color: "#19E6D2",
  marginTop: 10,
};
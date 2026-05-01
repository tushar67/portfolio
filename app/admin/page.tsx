"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  /* BLOG */
  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] =
    useState("");
  const [content, setContent] =
    useState("");

  /* SKILLS */
  const [skillName, setSkillName] =
    useState("");
  const [skillIcon, setSkillIcon] =
    useState("");

  /* PROJECT */
  const [pEditId, setPEditId] =
    useState<number | null>(null);

  const [pTitle, setPTitle] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pTech, setPTech] = useState("");
  const [pGithub, setPGithub] =
    useState("");
  const [pDemo, setPDemo] = useState("");

  const [pImageFile, setPImageFile] =
    useState<File | null>(null);

  const [uploadingProject, setUploadingProject] =
    useState(false);

  /* RESUME */
  const [resumeFile, setResumeFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: p } = await supabase
      .from("posts")
      .select("*")
      .order("id", {
        ascending: false,
      });

    const { data: c } = await supabase
      .from("comments")
      .select("*")
      .order("id", {
        ascending: false,
      });

    const { data: s } = await supabase
      .from("subscribers")
      .select("*")
      .order("id", {
        ascending: false,
      });

    const { data: sk } =
      await supabase
        .from("skills")
        .select("*")
        .order("id", {
          ascending: false,
        });

    const { data: pr } =
      await supabase
        .from("projects")
        .select("*")
        .order("id", {
          ascending: false,
        });

    setPosts(p || []);
    setComments(c || []);
    setSubs(s || []);
    setSkills(sk || []);
    setProjects(pr || []);
  }

  /* BLOG */

  function editPost(post: any) {
    setEditingId(post.id);
    setTitle(post.title || "");
    setSlug(post.slug || "");
    setExcerpt(post.excerpt || "");
    setContent(post.content || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function updatePost() {
    await supabase
      .from("posts")
      .update({
        title,
        slug,
        excerpt,
        content,
      })
      .eq("id", editingId);

    alert("Updated");
    resetPost();
    loadData();
  }

  async function deletePost(id: number) {
    await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    loadData();
  }

  async function deleteComment(
    id: number
  ) {
    await supabase
      .from("comments")
      .delete()
      .eq("id", id);

    loadData();
  }

  function resetPost() {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
  }

  /* SKILLS */

  async function addSkill() {
    if (!skillName) return;

    await supabase
      .from("skills")
      .insert([
        {
          name: skillName,
          icon: skillIcon,
          active: true,
        },
      ]);

    setSkillName("");
    setSkillIcon("");
    loadData();
  }

  async function deleteSkill(id: number) {
    await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    loadData();
  }

  /* PROJECT IMAGE */

  async function uploadProjectImage() {
    if (!pImageFile) return "";

    const ext =
      pImageFile.name
        .split(".")
        .pop();

    const fileName = `project-${Date.now()}.${ext}`;

    const { error } =
      await supabase.storage
        .from("projects")
        .upload(fileName, pImageFile, {
          cacheControl: "3600",
          upsert: false,
        });

    if (error) {
      alert(error.message);
      return "";
    }

    const { data } = supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  function resetProject() {
    setPEditId(null);
    setPTitle("");
    setPDesc("");
    setPTech("");
    setPGithub("");
    setPDemo("");
    setPImageFile(null);
  }

  async function addProject() {
    setUploadingProject(true);

    const imageUrl =
      await uploadProjectImage();

    await supabase
      .from("projects")
      .insert([
        {
          title: pTitle,
          description: pDesc,
          tech: pTech,
          github: pGithub,
          demo: pDemo,
          image_url: imageUrl,
          featured: true,
        },
      ]);

    resetProject();
    setUploadingProject(false);
    loadData();
  }

  function editProject(p: any) {
    setPEditId(p.id);
    setPTitle(p.title || "");
    setPDesc(
      p.description || ""
    );
    setPTech(p.tech || "");
    setPGithub(
      p.github || ""
    );
    setPDemo(p.demo || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function updateProject() {
    setUploadingProject(true);

    let imageUrl =
      projects.find(
        (x) => x.id === pEditId
      )?.image_url || "";

    if (pImageFile) {
      imageUrl =
        await uploadProjectImage();
    }

    await supabase
      .from("projects")
      .update({
        title: pTitle,
        description: pDesc,
        tech: pTech,
        github: pGithub,
        demo: pDemo,
        image_url: imageUrl,
      })
      .eq("id", pEditId);

    resetProject();
    setUploadingProject(false);
    loadData();
  }

  async function deleteProject(
    id: number
  ) {
    await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    loadData();
  }

  /* RESUME */

  async function uploadResume() {
    if (!resumeFile) {
      alert("Choose PDF first");
      return;
    }

    setUploading(true);

    const fileName = `resume-${Date.now()}.pdf`;

    const { error } =
      await supabase.storage
        .from("resumes")
        .upload(fileName, resumeFile, {
          upsert: true,
        });

    setUploading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Resume Uploaded!");
    setResumeFile(null);
  }

  return (
    <main style={page}>
      <div style={container}>
        <h1 style={titleMain}>
          Admin Dashboard
        </h1>

        <p style={subTitle}>
          Manage portfolio
          content easily
        </p>

        {/* STATS */}
        <div style={statsGrid}>
          <div style={card}>
            <p>Posts</p>
            <h2>{posts.length}</h2>
          </div>

          <div style={card}>
            <p>Projects</p>
            <h2>
              {projects.length}
            </h2>
          </div>

          <div style={card}>
            <p>Skills</p>
            <h2>{skills.length}</h2>
          </div>

          <div style={card}>
            <p>Subscribers</p>
            <h2>{subs.length}</h2>
          </div>
        </div>

        {/* RESUME */}
        <section style={section}>
          <h2 style={sectionTitle}>
            Resume Upload
          </h2>

          <div style={glass}>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResumeFile(
                  e.target
                    .files?.[0] ||
                    null
                )
              }
            />

            <button
              onClick={
                uploadResume
              }
              style={saveBtn}
            >
              {uploading
                ? "Uploading..."
                : "Upload Resume"}
            </button>
          </div>
        </section>

        {/* PROJECT */}
        <section style={section}>
          <h2 style={sectionTitle}>
            {pEditId
              ? "Edit Project"
              : "Add Project"}
          </h2>

          <div style={glass}>
            <input
              placeholder="Title"
              value={pTitle}
              onChange={(e) =>
                setPTitle(
                  e.target.value
                )
              }
              style={input}
            />

            <input
              placeholder="Description"
              value={pDesc}
              onChange={(e) =>
                setPDesc(
                  e.target.value
                )
              }
              style={input}
            />

            <input
              placeholder="Tech Stack"
              value={pTech}
              onChange={(e) =>
                setPTech(
                  e.target.value
                )
              }
              style={input}
            />

            <input
              placeholder="GitHub Link"
              value={pGithub}
              onChange={(e) =>
                setPGithub(
                  e.target.value
                )
              }
              style={input}
            />

            <input
              placeholder="Demo Link"
              value={pDemo}
              onChange={(e) =>
                setPDemo(
                  e.target.value
                )
              }
              style={input}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPImageFile(
                  e.target
                    .files?.[0] ||
                    null
                )
              }
              style={input}
            />

            {pEditId ? (
              <div
                style={{
                  display:
                    "flex",
                  gap: 10,
                }}
              >
                <button
                  onClick={
                    updateProject
                  }
                  style={
                    saveBtn
                  }
                >
                  {uploadingProject
                    ? "Saving..."
                    : "Update"}
                </button>

                <button
                  onClick={
                    resetProject
                  }
                  style={
                    danger
                  }
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={
                  addProject
                }
                style={saveBtn}
              >
                {uploadingProject
                  ? "Uploading..."
                  : "Add Project"}
              </button>
            )}
          </div>

          <div style={list}>
            {projects.map((p) => (
              <div
                key={p.id}
                style={row}
              >
                <div>
                  {p.image_url && (
                    <img
                      src={
                        p.image_url
                      }
                      style={{
                        width: 140,
                        height: 90,
                        objectFit:
                          "cover",
                        borderRadius: 12,
                        marginBottom: 10,
                      }}
                    />
                  )}

                  <h3>
                    {p.title}
                  </h3>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    gap: 10,
                  }}
                >
                  <button
                    style={
                      editBtn
                    }
                    onClick={() =>
                      editProject(
                        p
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    style={
                      danger
                    }
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
        </section>

        {/* SKILLS */}
        <section style={section}>
          <h2 style={sectionTitle}>
            Add Skill
          </h2>

          <div style={glass}>
            <input
              placeholder="Skill Name"
              value={skillName}
              onChange={(e) =>
                setSkillName(
                  e.target.value
                )
              }
              style={input}
            />

            <input
              placeholder="Icon"
              value={skillIcon}
              onChange={(e) =>
                setSkillIcon(
                  e.target.value
                )
              }
              style={input}
            />

            <button
              onClick={addSkill}
              style={saveBtn}
            >
              Add Skill
            </button>
          </div>

          <div style={list}>
            {skills.map((s) => (
              <div
                key={s.id}
                style={row}
              >
                <h3>
                  {s.icon}{" "}
                  {s.name}
                </h3>

                <button
                  style={danger}
                  onClick={() =>
                    deleteSkill(
                      s.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* POSTS */}
        <section style={section}>
          <h2 style={sectionTitle}>
            Posts
          </h2>

          <div style={list}>
            {posts.map((post) => (
              <div
                key={post.id}
                style={row}
              >
                <div>
                  <h3>
                    {
                      post.title
                    }
                  </h3>
                  <p>
                    {
                      post.slug
                    }
                  </p>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    gap: 10,
                  }}
                >
                  <button
                    style={
                      editBtn
                    }
                    onClick={() =>
                      editPost(
                        post
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    style={
                      danger
                    }
                    onClick={() =>
                      deletePost(
                        post.id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMMENTS */}
        <section style={section}>
          <h2 style={sectionTitle}>
            Comments
          </h2>

          <div style={list}>
            {comments.map((c) => (
              <div
                key={c.id}
                style={row}
              >
                <div>
                  <h3>
                    {c.name}
                  </h3>
                  <p>
                    {
                      c.message
                    }
                  </p>
                </div>

                <button
                  style={danger}
                  onClick={() =>
                    deleteComment(
                      c.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SUBS */}
        <section style={section}>
          <h2 style={sectionTitle}>
            Subscribers
          </h2>

          <div style={list}>
            {subs.map((s) => (
              <div
                key={s.id}
                style={row}
              >
                <h3>
                  {s.email}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

/* STYLES */

const page = {
  minHeight: "100vh",
  padding: "70px 8%",
  background:
    "linear-gradient(135deg,#00151a,#002d36,#001219)",
  color: "white",
};

const container = {
  maxWidth: 1400,
  margin: "0 auto",
};

const titleMain = {
  fontSize: 68,
  fontWeight: 900,
};

const subTitle = {
  opacity: 0.7,
  marginTop: 8,
};

const section = {
  marginTop: 70,
};

const sectionTitle = {
  fontSize: 38,
  marginBottom: 20,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: 20,
  marginTop: 40,
};

const card = {
  background:
    "rgba(255,255,255,0.06)",
  padding: 26,
  borderRadius: 24,
};

const glass = {
  background:
    "rgba(255,255,255,0.05)",
  borderRadius: 24,
  padding: 24,
};

const list = {
  marginTop: 20,
  display: "grid",
  gap: 16,
};

const row = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  gap: 20,
  padding: 22,
  borderRadius: 22,
  background:
    "rgba(255,255,255,0.05)",
};

const input = {
  width: "100%",
  padding: 15,
  borderRadius: 14,
  border: "none",
  marginTop: 12,
};

const saveBtn = {
  padding: "14px 24px",
  borderRadius: 999,
  border: "none",
  background: "#19E6D2",
  marginTop: 18,
  fontWeight: 800,
  cursor: "pointer",
};

const editBtn = {
  padding: "12px 18px",
  borderRadius: 999,
  border: "none",
  background: "#19E6D2",
  fontWeight: 700,
};

const danger = {
  padding: "12px 18px",
  borderRadius: 999,
  border: "none",
  background: "#ff4d4d",
  color: "white",
  fontWeight: 700,
};

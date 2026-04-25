"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const { id } = useParams();
  const [repo, setRepo] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/tushar67/${id}`)
      .then((res) => res.json())
      .then(setRepo);
  }, [id]);

  if (!repo) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div style={{ padding: "120px 10%" }}>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>

      <p>⭐ {repo.stargazers_count}</p>
      <p>Language: {repo.language}</p>

      <a
        href={repo.html_url}
        target="_blank"
        style={{ color: "#ff7b00" }}
      >
        View on GitHub →
      </a>
    </div>
  );
}
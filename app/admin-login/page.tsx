"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
  localStorage.setItem(
    "admin",
    "true"
  );

  window.location.href =
    "/admin";
} else {
  alert("Wrong password");
}
  }

  return (
    <main style={main}>
      <div style={card}>
        <h1>Admin Login</h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={input}
        />

        <button
          onClick={login}
          style={button}
        >
          Login
        </button>
      </div>
    </main>
  );
}

const main = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: 400,
  padding: 40,
  borderRadius: 20,
  background: "rgba(255,255,255,0.05)",
};

const input = {
  width: "100%",
  padding: 14,
  marginTop: 20,
  borderRadius: 10,
};

const button = {
  marginTop: 20,
  padding: "14px 24px",
  borderRadius: 10,
  border: "none",
  background: "#19E6D2",
  fontWeight: 700,
};
"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMsg(error.message);
    } else {
      router.push("/admin");
    }
  }

  return (
    <main style={page}>
      <div style={box}>
        <h1>Admin Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={login} style={btn}>
          Login
        </button>

        <p>{msg}</p>
      </div>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#00232A",
  display: "grid",
  placeItems: "center",
};

const box = {
  width: 420,
  padding: 40,
  borderRadius: 24,
  background: "rgba(255,255,255,0.06)",
  color: "white",
};

const input = {
  width: "100%",
  padding: 16,
  marginTop: 16,
  borderRadius: 14,
};

const btn = {
  width: "100%",
  marginTop: 20,
  padding: 16,
  borderRadius: 999,
  background: "#19E6D2",
  border: "none",
  fontWeight: 700,
};
"use client";

import { useAuth } from "@/context/AuthContext";
import { use, useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { onRegister } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const res = await onRegister!(email, password);
    if (res?.error) {
      alert(res.msg);
    } else {
      alert("Registration successful! Please log in.");
      useRouter().push("/login");
    }
  };

  return (
    <div>
      <h1>Register into Bilzing</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit"> Register</button>
      </form>
      <p>
        Already have an account?
        <a href="/login">Login Here</a>
      </p>
    </div>
  );
}

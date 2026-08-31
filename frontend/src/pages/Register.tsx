import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password..");
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    // daca backend == error, registration failed
    if (!res.ok) {
      const error = await res.json();
      alert(error.message || "Registration failed");
      return;
    }

    // if everything good => mergi la login
    navigate("/login");
  }

  return (
    <form onSubmit={handleRegister}>
      <h2 style={{ marginTop: "100px" }}>Please register your account....</h2>

      <input
        style={{ marginRight: "15px" }}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="nav-button"
        type="submit"
        style={{ marginLeft: "15px" }}
      >
        Register
      </button>
    </form>
  );
}

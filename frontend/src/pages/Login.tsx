import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      alert("Invalid credentials..");
      return;
    }

    const data = await res.json();

    localStorage.setItem("token", data.access_token);

    localStorage.setItem("user", JSON.stringify(data.user));

    window.dispatchEvent(new Event("storage"));

    navigate("/shelf");
  }

  return (
    <form onSubmit={handleLogin}>
      <h2 style={{ marginTop: "100px" }}>Please login to your account....</h2>

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
        Login
      </button>
    </form>
  );
}

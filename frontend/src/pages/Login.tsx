import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css";

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
    <form onSubmit={handleLogin} className="login-form">
      <h2 className="login-title">Please login to your account....</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button
        className="nav-button login-button"
        type="submit"
        
      >
        Login
      </button>
    </form>
  );
}

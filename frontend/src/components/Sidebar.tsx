import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Sidebar() {
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");

  // avatar
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  if (!token || token === "undefined") {
    return null;
  }

  useEffect(() => {
    fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
        setAvatarUrl(data.avatarUrl);
      });
  }, []);

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">🎮</div>
        <span className="sidebar-title">GameShelf</span>
      </div>

      {/*Greating LOL*/}
      {email && (
        <div
          style={{
            marginTop: "15px",
            marginLeft: "10px",
            marginBottom: "10px",
          }}
        >
          <p style={{ marginBottom: "8px" }}>Hello, {email}</p>

          {/* Poza de profil */}
          {avatarUrl && (
            <input
              type="image"
              src={avatarUrl}
              alt="Profile"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #f7eeff",
                marginLeft: "90px",
                marginBottom: "-50px",
              }}
            />
          )}
        </div>
      )}

      {/* NavBar content */}
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <a href="/shelf" className="sidebar-link">
            🕹️ Home Page
          </a>
          <a href="/add-game" className="sidebar-link">
            ➕ Add Game
          </a>
          <a href="/favorites" className="sidebar-link">
            ⭐ Favorite Games
          </a>
        </nav>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        GameShelfCollection
        <a
          href="/about"
          className="sidebar-link"
          style={{ marginLeft: "10px" }}
        >
          ⓘ About
        </a>
      </div>
    </aside>
  );
}

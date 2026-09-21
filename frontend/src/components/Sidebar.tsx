import { useEffect, useState, useRef } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Sidebar() {
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");

  // avatar
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(true);


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
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 768){
        setIsOpen(false);
      }
      else
      {
        setIsOpen(true);
      }
    };

    handleResize(); // this check the initial size of the window
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []
  );

  if (!token || token === "undefined") {
    return null;
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/users/upload-avatar`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    setAvatarUrl(data.url);
  }

  return (
    <>
    {/* Hamburger icon */}
      <button
        className="md:hidden p-3 text-white bg-gray-800 fixed top-2 left-2 z-50 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
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

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Poza de profil */}
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Profile"
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #f7eeff",
                marginLeft: "90px",
                cursor: "pointer",
                marginBottom: "-45px",
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
    </>
  );
}

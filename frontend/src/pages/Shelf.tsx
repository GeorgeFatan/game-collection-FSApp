import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Game {
  id: number;
  title: string;
  coverUrl: string;
  description: string;
  genre: string;
  platform: string;
  releaseDate: string;
  rating: string;
}

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Shelf() {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadGames();
  }, []);

  function loadGames() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetch(`${API_URL}/games`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setGames(data);
        } else {
          setGames([]);
        }
      })
      .catch(() => {
        setGames([]);
      });
  }

  function deleteGame(id: number) {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/games/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => loadGames());
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  }

  // function handleAbout() {
  //   navigate("/about");
  // }

  return (
    <div className="shelf-page">
      {/* Header sus */}
      <div className="shelf-header">
        <h1>Game Shelf</h1>
        <div className="shelf-buttons">
          <button onClick={handleLogout} className="nav-button">
            Logout
          </button>
        </div>
      </div>

      <div className="shelf-buttons">
        {/* Add Game button tot sus */}
        <Link to="/add-game" className="nav-button add-game-btn">
          Add New Game to Collection!
        </Link>
      </div>

      {/* Conținut centrat */}
      <div className="shelf-content">
        {games.length === 0 && <p>No games found.</p>}

        {games.map((game) => (
          <div key={game.id} className="game-card">
            <Link to={`/game/${game.id}`} className="game-link">
              <img
                src={game.coverUrl}
                alt={game.title}
                className="game-cover"
              />
              <h2>{game.title}</h2>
            </Link>

            <button onClick={() => deleteGame(game.id)} className="nav-button">
              Delete Game
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

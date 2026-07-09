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

    fetch("http://localhost:3000/games", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
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

    fetch(`http://localhost:3000/games/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(() => loadGames());
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  function handleAbout()
  {
    navigate("/about")
  }


  return (
    <div>
      <button onClick={handleLogout} className="nav-button" style={{ marginTop: "20px", marginRight: "20px"}}>
        Logout
      </button>
       <button style ={{marginLeft: "10px"}} onClick={handleAbout} className="nav-button">About</button>

      <h1>Game Shelf</h1>

      <Link to="/add-game" className="nav-button">
        Add New Game to Collection!
      </Link>

      {games.length === 0 && (
        <p style={{ marginTop: "20px" }}>No games found.</p>
      )}

      {games.map((game) => (
        <div
          key={game.id}
          style={{marginBottom: "20px", textAlign: "center", marginTop: "15px",}}
        >
          <Link
            to={`/game/${game.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={game.coverUrl}
              alt={game.title}
              style={{width: "120px", height: "auto", borderRadius: "8px",marginBottom: "10px",}}
            />
            <h2>{game.title}</h2>
          </Link>

          <button onClick={() => deleteGame(game.id)} className="nav-button">
            Delete Game
          </button>
        </div>
      ))}
    </div>
  );
}

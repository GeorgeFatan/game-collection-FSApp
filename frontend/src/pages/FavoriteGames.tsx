import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Game {
  id: number;
  title: string;
  coverUrl: string;
  description: string;
  genre: string;
  releaseDate: string;
  rating: string;
  userId: number;
  personalRating?: number;
  isFavorite: boolean;
}

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function FavoriteGames() {
  const [games, setGames] = useState<Game[]>([]);

  function loadGames() {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/games`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const favorites = data.filter((g: Game) => g.isFavorite);
        setGames(favorites);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/games`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const favorites = data.filter((g: Game) => g.isFavorite);
        setGames(favorites);
      });
    loadGames();
  }, []);

  // delete the game from fav category
  function deleteGame(id: number) {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/games/${id}/favorite`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isFavorite: false }),
    }).then(() => loadGames());
  }

  return (
    <div className="shelf-page">
      <h1>Favorite Games</h1>

      {games.length === 0 && <p>No favorite games yet.</p>}

      <div className="shelf-content">
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
              Delete game from Favorite Games
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

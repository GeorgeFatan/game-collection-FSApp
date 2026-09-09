import { useEffect, useState } from "react";

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
  }, []);

  return (
    <div>
      <h1>Favorite Games</h1>

      {games.length === 0 && <p>No favorite games yet.</p>}

      {games.map((game) => (
        <div key={game.id}>
          <img src={game.coverUrl} alt={game.title} />
          <h2>{game.title}</h2>
        </div>
      ))}
    </div>
  );
}

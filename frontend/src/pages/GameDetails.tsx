import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

export function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/games/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setGame(data))
      .catch((err) => console.error("Failed to load game:", err));
  }, [id]);

  if (!game) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Game not found</h1>
        <img
          src="https://placehold.co/600x800?text=No+Image"
          alt="Not found"
          className="w-64 h-80 object-cover rounded-xl shadow-lg mx-auto"
        />
        <p className="mt-4 text-gray-700">
          Nu există detalii pentru acest joc.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
    
      <h1 className="text-4xl font-bold mb-6">{game.title}</h1>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

       
        <img
          src={game.coverUrl} style={{
             width: "350px",
                height: "400px",
                objectFit: "cover",
                borderRadius: "6px",
                marginTop: "10px"
          }}
          alt={game.title}
          
        />

        <div className="space-y-4">
          <p className="text-gray-700">{game.description}</p>

          <div className="bg-white p-4 rounded-xl shadow-md space-y-2">
            <p><span className="font-semibold">Genre:</span> {game.genre}</p>
            <p><span className="font-semibold">Release:</span> {game.releaseDate}</p>
            <p><span className="font-semibold">Rating:</span> {game.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

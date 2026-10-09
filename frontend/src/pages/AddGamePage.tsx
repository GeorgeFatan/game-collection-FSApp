/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AddGamePage.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function AddGame() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState("");
  const rawgApiKey = import.meta.env.VITE_RAWG_KEY;

  async function searchGame(title: string) {
    if (title.length < 3) return;

    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?search=${title}&key=${rawgApiKey}`,
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0) return;

      const game = data.results[0];

      const detailsRes = await fetch(`${API_URL}/games/rawg/${game.id}`);
      const details = await detailsRes.json();

      setCoverUrl(game.background_image || "");
      setGenre(game.genres?.map((g: any) => g.name).join(", ") || "");
      setReleaseDate(game.released || "");
      setDescription(details.description_raw || "");
      setRating(game.rating?.toString() || "");
    } catch (err) {
      console.error("Error fetching game:", err);
    }
  }

  function handleAddGame() {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        coverUrl,
        description,
        genre,
        releaseDate,
        rating,
      }),
    }).then(() => {
      navigate("/Shelf");
    });
  }

  return (
    <div className="add-game-page">
      <h1 className="add-game-title">Add New Game</h1>

      <div className="add-game-form">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            searchGame(e.target.value);
          }}
          placeholder="Title"
        />

        <img
          src={coverUrl}
          alt="Cover Preview"
          className="add-game-cover-preview"
        />

        <button onClick={handleAddGame} className="nav-button add-game-button">
          Add Game
        </button>
      </div>
    </div>
  );
}

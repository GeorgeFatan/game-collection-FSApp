/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/GameDetailsPage.css";

interface Game {
  id: number;
  title: string;
  coverUrl: string;
  description: string;
  genre: string;
  platform: string;
  releaseDate: string;
  rating: string;
  personalRating?: number;
}

const API_URL = import.meta.env.VITE_API_BASE_URL;

function StarRatingSistem({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const boxes = [1, 2, 3, 4, 5];

  return (
    <div className="stars-container">
      <span className="stars-row">
        {boxes.map((box) => (
          <span
            key={box}
            onClick={() => onChange(box)}
            className="star-box"
          >
            {box <= value ? "★" : "☆"}
          </span>
        ))}
      </span>
    </div>
  );
}

export function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [personalRating, setPersonalRating] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");

    fetch(`${API_URL}/games/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
        setDescription(data.description || "");
        // syncronize personal rating when we have the data
        if (data.personalRating !== undefined) {
          setPersonalRating(data.personalRating);
        }
      })
      .catch((err) => console.error("Failed to load game:", err));
  }, [id]);

  async function handleSave() {
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/games/${game!.id}/description`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ description }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to update description");
      }

      // update UI
      setGame({ ...game!, description });
      setIsEditing(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function savePersonalRating(rating: number) {
    setIsSaving(true);

    try {
      if (!game) return; // save guard

      const res = await fetch(`${API_URL}/games/${game.id}/personal-rating`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ personalRating: rating }),
      });
      const result = await res.json();

      if (!result.success) {
        console.error(result.message);
        return;
      }

      // actualizam local jocul
      setGame((prev) => (prev ? { ...prev, personalRating } : prev)); // asa garantam ca game(prev).id nu este niciodata undefined
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

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
  <div className="game-details-page">
    <h1 className="game-details-title">{game.title}</h1>

    <div className="game-details-grid">
      <img
        src={game.coverUrl}
        alt={game.title}
        className="game-details-cover"
      />

      <div className="game-details-section">
        <div className="game-details-description">
          {error && <p className="error-text">{error}</p>}

          {!isEditing && !game.description && (
            <button className="nav-button" onClick={() => setIsEditing(true)}>
              Add your wanted description
            </button>
          )}

          {!isEditing && game.description && (
            <div>
              <p>{game.description}</p>
              <button className="nav-button" onClick={() => setIsEditing(true)}>
                Edit description
              </button>
            </div>
          )}

          {isEditing && (
            <div className="edit-description">
              <textarea
                className="description-textarea"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="edit-buttons">
                <button
                  className="nav-button"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save description"}
                </button>

                <button
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="game-details-info-card">
          <p><span className="font-semibold">Genre:</span> {game.genre}</p>
          <p><span className="font-semibold">Release:</span> {game.releaseDate}</p>
          <p><span className="font-semibold">Rating:</span> {game.rating}</p>
        </div>
      </div>

      <div className="game-details-rating-card">
        <h3 className="rating-title">Your rating for the game..</h3>

        <StarRatingSistem
          value={Math.ceil(personalRating / 2)}
          onChange={(stars) => {
            const rating = stars * 2;
            setPersonalRating(rating);
            savePersonalRating(rating);
          }}
        />

        <p className="rating-value">{personalRating}/10</p>
      </div>
    </div>
  </div>
);

}

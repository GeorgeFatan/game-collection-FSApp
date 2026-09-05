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
    <div className="flex flex-row gap-2 mt-2 items-center">
      {boxes.map((box) => (
        <div
          key={box}
          onClick={() => onChange(box)}
          className={`w-8 h-8 cursor-pointer border rounded flex items-center justify-center text-xl
            ${box <= value ? "bg-yellow-400 text-black" : "bg-gray-300 text-gray-600"}
          `}
        >
          {box <= value ? "★" : "☆"}
        </div>
      ))}
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

  async function savePersonalRating() {
    setIsSaving(true);

    try {
      if (!game) return; // save guard

      const res = await fetch(`${API_URL}/games/${game.id}/personal-rating`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ personalRating }),
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{game.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={game.coverUrl}
          style={{
            width: "350px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "6px",
            marginTop: "10px",
          }}
          alt={game.title}
        />

        <div className="space-y-4">
          <div className="text-gray-700">
            {error && <p className="text-red-500">{error}</p>}

            {!isEditing && !game.description && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setIsEditing(true)}
              >
                Add your personal description
              </button>
            )}

            {!isEditing && game.description && (
              <div>
                <p>{game.description}</p>
                <button
                  className="nav-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit description
                </button>
              </div>
            )}

            {isEditing && (
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className="mt-2 flex gap-4">
                  <button
                    className="nav-button"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save description"}
                  </button>

                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md space-y-2">
            <p>
              <span className="font-semibold">Genre:</span> {game.genre}
            </p>
            <p>
              <span className="font-semibold">Release:</span> {game.releaseDate}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {game.rating}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md mt-4">
            <h3 className="font-semibold mb-2">
              Your personal rating for the game
            </h3>
            <StarRatingSistem
              value={Math.ceil(personalRating / 2)} // convertim rating 1–10 în stele 1–5
              onChange={(stars) => {
                const rating = stars * 2;
                setPersonalRating(rating); // update UI-ul
                savePersonalRating(); // save
              }}
            />
            <p className="mt-2 text-lg font-bold">{personalRating}/10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

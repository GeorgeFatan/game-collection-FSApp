import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

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
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    loadGames();
  }, []);

  function loadGames(){
    fetch("http://localhost:3000/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
  }

  function addGame()
  {
    fetch("http://localhost:3000/games", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title,
        coverUrl,
        description,
        genre,
        platform,
        releaseDate,
        rating,
      }),
    }).then(() => {
      setTitle("");
      setCoverUrl("");
      setDescription("");
      setGenre("");
      setPlatform("");
      setReleaseDate("");
      setRating("");
      
      loadGames();
    });

  }

  function deleteGame(id: number)
  {
    fetch(`http://localhost:3000/games/${id}`, {
      method: "DELETE",
    }).then(() => loadGames());
  }

  return (
    <div>
      <h1>Game Shelf</h1>
     
      <div>
        <input style={{marginRight: "10px" , marginLeft: "10px"}}
        value ={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Game Title"
        />
        <input style={{marginRight: "10px"}}
        value ={coverUrl}
        onChange={(e) => setCoverUrl(e.target.value)}
        placeholder="Cover URL"
        />
        <input style={{marginRight: "10px"}}
        value ={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        />
        <input style={{marginRight: "10px"}}
        value ={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder = "Genre"
        />
        <input style={{marginRight: "10px"}}
        value = {platform}
        onChange={(e) => setPlatform(e.target.value)}
        placeholder = "Platform"
        />
        <input style={{marginRight: "10px"}}
        value = {releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        placeholder = "Release Date"
        />
        <input style={{marginRight: "10px"}}
        value = {rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder = "Rating"
        />
        <button onClick={addGame} className="nav-button" style={{ marginLeft: "10px" , marginTop: "10px"}}>
          Add Game
        </button>
      </div>
      
      {games.map((game) => (
        <div key={game.id} style={{marginBottom: "20px", textAlign: "center", marginTop: "15px"}}>
          <Link to={`/game/${game.id}`} style={{textDecoration: "none", color:"inherit"}}>
          <img src = {game.coverUrl} alt={game.title} style={{ width: "120px", height: "auto", borderRadius: "8px", marginBottom: "10px" }} />
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

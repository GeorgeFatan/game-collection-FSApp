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

  useEffect(() => {
    loadGames();
  }, []);

  function loadGames(){
    fetch("http://localhost:3000/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
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
     
      <Link to="/add-game" className="nav-button">
        Add New Game to Collection!
      </Link>
      
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

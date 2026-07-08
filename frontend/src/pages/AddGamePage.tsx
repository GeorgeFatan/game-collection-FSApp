import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function AddGame(){
    
    const navigate = useNavigate();
    const[title,setTitle] = useState("");
    const[coverUrl,setCoverUrl] = useState("");
    const[description,setDescription] = useState("");
    const[genre,setGenre] = useState("");
    const[platform,setPlatform] = useState("");
    const[releaseDate,setReleaseDate] = useState("");
    const[rating,setRating] = useState("");


    function handleAddGame(){
        fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
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
        navigate("/");
    });
}

return(
    <div className="add-game-page" style={{ marginTop: "20px" }}>
        <h1>Add New Game To Collection</h1>

        <div className="form">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="Cover URL" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
            <input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Platform" />
            <input value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} placeholder="Release Date" />
            <input value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" />

            <button onClick={handleAddGame} className="nav-button">
                Add Game
            </button>
        </div>

    </div>
);

}



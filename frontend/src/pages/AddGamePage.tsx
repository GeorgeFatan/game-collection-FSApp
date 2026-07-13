import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function AddGame(){
    
    const navigate = useNavigate();
    const[title,setTitle] = useState("");
    const[coverUrl,setCoverUrl] = useState("");
    const[description,setDescription] = useState("");
    const[genre,setGenre] = useState("");
    const[releaseDate,setReleaseDate] = useState("");
    const[rating,setRating] = useState("");
    const rawgApiKey = import.meta.env.VITE_RAWG_KEY;
    

    async function searchGame(title: string)
    {
        if(title.length < 3){
            return;
        }

        try{
            const res = await fetch(
                `https://api.rawg.io/api/games?search=${title}&key=${rawgApiKey}
`
            );
            const data = await res.json();

            if(!data.results || data.results.length === 0)
                return;

            const game = data.results[0];

            const detailsRes = await fetch(`http://localhost:3000/games/rawg/${game.id}`);
            const details = await detailsRes.json()
            setCoverUrl(game.background_image || "");

            setGenre(game.genres?.map((g: any) => g.name).join(", ") || "");
            setReleaseDate(game.released || "");
            setDescription(details.description_raw || "");
            setRating(game.rating?.toString() || "");
        } catch (err){
            console.error("Error fetching game:", err);
        }
    }


   function handleAddGame() {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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


return(
    <div className="add-game-page" style={{ marginTop: "20px" }}>
        <h1>Add New Game To Collection</h1>

        <div className="form">
            <input 
            value={title}
            onChange={(e) => {
                setTitle(e.target.value);
                searchGame(e.target.value);
            }}
            placeholder="Title"
/>
            <img src={coverUrl} style={{
                width: "50px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "6px",
                marginTop: "10px"
            }} />
            {/* <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="Cover URL" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
            <input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Platform" />
            <input value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} placeholder="Release Date" />
            <input value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" /> */}
            

            <button onClick={handleAddGame} className="nav-button">
                Add Game
            </button>
        </div>

    </div>
);

}



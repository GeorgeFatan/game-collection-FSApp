import {useParams} from "react-router-dom";

export function GameDetails(){
    const {id} = useParams();

    const game = 
    id === "1" ? {
        id: 1,
          title: "Need for Speed: Most Wanted",
          coverUrl: "https://preview.redd.it/need-for-speed-most-wanted-cover-4k-upscale-v0-jcd0799d5vd21.jpg?width=1080&crop=smart&auto=webp&s=fad33ebb48a043866f334fa172e0da6013f84c6c",
          description:
            "Need for Speed: Most Wanted este unul dintre cele mai iconice jocuri de curse, lansat în 2005. Jocul combină curse intense, poliție agresivă și o poveste memorabilă în care urci pe Blacklist.",
          genre: "Racing / Action",
          platform: "PC, PS2, Xbox, GameCube",
          releaseDate: "2005",
          rating: "9.3 / 10",
    }
    : {
         id,
          title: "Game not found",
          coverUrl: "https://placehold.co/600x800?text=No+Image",
          description: "Nu există detalii pentru acest joc.",
          genre: "-",
          platform: "-",
          releaseDate: "-",
          rating: "-",
    };
     return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Titlu */}
      <h1 className="text-4xl font-bold mb-6">{game.title}</h1>

      {/* Layout pe două coloane */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Coperta */}
        <img
          src={game.coverUrl}
          alt={game.title}
          className="w-64 h-80 object-cover rounded-xl shadow-lg mx-auto md:mx-0"
        />

        {/* Informații */}
        <div className="space-y-4">
          <p className="text-gray-700">{game.description}</p>

          <div className="bg-white p-4 rounded-xl shadow-md space-y-2">
            <p><span className="font-semibold">Genre:</span> {game.genre}</p>
            <p><span className="font-semibold">Platform:</span> {game.platform}</p>
            <p><span className="font-semibold">Release:</span> {game.releaseDate}</p>
            <p><span className="font-semibold">Rating:</span> {game.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
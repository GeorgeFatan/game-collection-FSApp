import { GameCard } from "../components/GameCard";

export function Shelf() {

    // mock data 
    const games = [
        { 
          id: 1,
          title: "Need for Speed: Mostwanted",
          coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/4e/NFS_Most_Wanted_cover.jpg"
        },
        {
            id:2,
            title: "Need for Speed: Underground 2",
            coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/5e/NFSU2boxart.jpg"
        },
        {
            id:3,
            title: "Need for Speed: Carbon",
            coverUrl: "https://upload.wikimedia.org/wikipedia/en/0/0e/NFS_Carbon_cover.jpg"
        },
    ];

    return (
        <div className ="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {games.map(game => (
                <GameCard 
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    coverUrl={game.coverUrl}
                />
            ))}
        </div>
    );
}
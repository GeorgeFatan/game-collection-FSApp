type GameCardProps = {
    id: number;
    title: string;
    coverUrl: string;
};

export function GameCard({id, title, coverUrl}: GameCardProps){
    return (
        <a 
         href={`/game/${id}`}
         className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
        >
            <img
            src={coverUrl}
            alt={title}
            className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
        </a>
        );
}
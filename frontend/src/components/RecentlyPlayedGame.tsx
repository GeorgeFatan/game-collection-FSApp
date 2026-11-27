import "../style/RecentlyPlayed.css";
import {Link} from "react-router-dom";

// interfata pentru jocul recent jucat
interface RecentlyPlayedGame {
  id: number | string;
  title: string;
  description?: string;
  hoursPlayed?: number;
  playTime?: number;
  coverUrl?: string;
  status?: string;
  lastPlayed?: string | null;
}

// interfata pentru props componentului RecentlyPlayed
interface RecentlyPlayedProps {
  games: RecentlyPlayedGame[];
}

export default function RecentlyPlayed({ games }: RecentlyPlayedProps) {
  // trebuie sa filtrez jocurile care au fost jucate in ultimele 7 zile
  const sevenDaysAgo = new Date(); // date object
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // data = 7 zile in urma
  const cutoffTime = sevenDaysAgo.getTime(); // timestamp pentru 7 zile in urma

  const recentGames = (games ?? [])
    .filter((game) => {
      if (!game.lastPlayed) return false; // daca nu exista lastPlayed => nu includ
      const playedTime = new Date(game.lastPlayed).getTime(); // luam timestampul pentru lastPlayed
      return !Number.isNaN(playedTime) && playedTime >= cutoffTime; // daca data este valida si >= cutoffTime => includ
    })
    .sort((a, b) => {
      const timeA = a.lastPlayed ? new Date(a.lastPlayed).getTime() : 0;
      const timeB = b.lastPlayed ? new Date(b.lastPlayed).getTime() : 0;
      return timeB - timeA; // sortam descrescator dupa lastPlayed (cel mai recent primul)
    });

  // daca nu exista jocuri recent jucate (in ultimele 7 zile) afisam un mesaj in card
  if (recentGames.length === 0) {
    return (
      <section className="recently-played-card">
        <div className="recently-played-header">
          <span className="recently-played-badge">Recently Played</span>
          <span className="recently-played-subtitle">
            No games played in the last 7 days
          </span>
        </div>
      </section>
    );
  }

  // luam primul joc din lista sortata (cel mai recent jucat)
  const latestGame = recentGames[0];
  // formatam data lastPlayed pentru afisare
  const formattedLastPlayed = latestGame.lastPlayed
    ? new Date(latestGame.lastPlayed).toLocaleDateString()
    : "";

  return (
    <section className="recently-played-card">
      <div className="recently-played-header">
        <span className="recently-played-badge">Recently Played</span>
        <span className="recently-played-subtitle">
          Last played: {formattedLastPlayed}
        </span>
      </div>

      <div className="recently-played-body">
        {/* afisam coperta doar daca exista coverUrl */}
        {latestGame.coverUrl && (
          <img
            src={latestGame.coverUrl}
            alt={latestGame.title}
            className="recently-played-cover"
          />
        )}

        <div className="recently-played-info">
            <Link to={`/game/${latestGame.id}`} className="recently-played-link">
            <h3 className="recently-played-title">{latestGame.title}</h3>
            </Link>
        </div>
      </div>
    </section>
  );
}
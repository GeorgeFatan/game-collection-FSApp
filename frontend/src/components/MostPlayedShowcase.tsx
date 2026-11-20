import "../style/MostPlayedShowcase.css";

interface MostPlayedGame{
    id: number | string;
    title: string;
    hoursPlayed?: number;
    playTime?: number;
    coverUrl?: string;
    status?: string;
}

interface MostPlayedShowcaseProps {
    games: MostPlayedGame[];
}

export default function MostPlayedShowcase( {games} : MostPlayedShowcaseProps){
    let topGame: MostPlayedGame |  null = null;

    let maxHoursPlayed = 0;

    for (const game of games){
        const hours = game.hoursPlayed ?? game.playTime ?? 0;
        
        if(hours > maxHoursPlayed){
             maxHoursPlayed = hours;
             topGame = game;
        }
    }

    // nu afisez cardu daca nu exista jocuri cu ore inregistrare in shelf

    if(!topGame || maxHoursPlayed === 0){
        return null;
    }

    const cover = topGame.coverUrl ?? "https://via.placeholder.com/150";

    return(
        <section className="showcase-card">
      <div className="showcase-header">
        <span className="showcase-badge">Most Played Showcase</span>
        <span className="showcase-subtitle">
          All-time favorite across your shelf
        </span>
      </div>

      <div className="showcase-body">
        {cover && (
          <img
            src={cover}
            alt={topGame.title}
            className="showcase-cover"
          />
        )}

        <div className="showcase-info">
          <h3 className="showcase-game-title">{topGame.title}</h3>

          <div className="showcase-stats">
            <div className="showcase-stat-box">
              <span className="showcase-stat-label">Total Playtime</span>
              <span className="showcase-stat-value">
                {Number(maxHoursPlayed.toFixed(1))} {maxHoursPlayed === 1 ? "hr" : "hrs"}
              </span>
            </div>

            {topGame.status && (
              <div className="showcase-stat-box">
                <span className="showcase-stat-label">Status</span>
                <span className="showcase-stat-value">{topGame.status}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    );
}
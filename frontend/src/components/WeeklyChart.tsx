import { useEffect, useState } from "react";
import "../style/WeeklyChart.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface DailyEntry {
  date: string;
  hours: number;
}

interface GameActivity {
  title: string;
  total: number;
  daily: DailyEntry[];
}

// luam ultimele 7 zile
function getLast7Days() {
  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    days.push({
      dateStr: date.toISOString().slice(0, 10), // format "YYYY-MM-DD"
      label:
        i === 0
          ? "Today"
          : date.toLocaleDateString("en-US", { weekday: "short" }),
      isToday: i === 0,
    });
  }

  return days;
}

export default function WeeklyChart() {
  const [data, setData] = useState<GameActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/games/activity?days=7`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        setData(Array.isArray(json) ? json : []);
      } catch (err) {
        console.error("Failed to fetch weekly activity", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) {
    return <div className="weekly-card">Loading weekly activity...</div>;
  }

  // 1. calc. totalul orelor jucate last 7 days
  let totalHours = 0;
  for (const game of data) {
    totalHours += game.total;
  }
  totalHours = Number(totalHours.toFixed(1));

  // 2. Pentru fiecare zi din ultimele 7, insumam orele din toate jocurile
  const days = getLast7Days().map((day) => {
    let hours = 0;

    for (const game of data) {
      for (const entry of game.daily) {
        if (entry.date === day.dateStr) {
          hours += entry.hours;
        }
      }
    }

    return {
      ...day,
      hours: Number(hours.toFixed(1)),
    };
  });

  return (
    <section className="weekly-card">
      <div className="weekly-header">
        <div>
          <h2 className="weekly-title">Weekly Gaming Activity</h2>
          <p className="weekly-subtitle">
            Last 7 days playtime across your collection
          </p>
        </div>

        <div className="weekly-total-badge">
          <span style={{ marginRight: "10px" }} className="weekly-total-label">
            Total Playtime
          </span>
          <span className="weekly-total-value">
            {totalHours} {totalHours === 1 ? "hr" : "hrs"}
          </span>
        </div>
      </div>

      {/* Graficul pe 7 zile */}
      <div className="weekly-chart-area">
        {days.map((day) => {
          // 1 ora = 20px inaltime 
          const barHeight = day.hours > 0 ? Math.min(day.hours * 20, 130) : 6;

          return (
            <div key={day.dateStr} className="weekly-day-col">
              <span
                className={`weekly-bar-hours ${
                  day.hours === 0 ? "empty" : ""
                }`}
              >
                {day.hours > 0 ? `${day.hours}h` : "0"}
              </span>

              <div
                style={{ height: `${barHeight}px` }}
                className={`weekly-bar ${day.hours === 0 ? "empty" : ""}`}
              />

              <span
                className={`weekly-day-label ${day.isToday ? "today" : ""}`}
              >
                {day.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function WeeklyChart() {
  const [data, setData] = useState([]);
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
        setData(json);
      } catch (err) {
        console.error("Failed to fetch weekly activity", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) return <div>Loading weekly activity...</div>;

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Weekly Activity (Last 7 Days)</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Shelf } from "./pages/Shelf";
import { GameDetails } from "./pages/GameDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Shelf />} />
        <Route path="game/:id" element={<GameDetails />} />
      </Route>
    </Routes>
  );
}

export default App;

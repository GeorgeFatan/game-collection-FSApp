import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Shelf from "./pages/Shelf";
import { GameDetails } from "./pages/GameDetails";
import About from "./pages/About";
import AddGame from "./pages/AddGamePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Shelf />} />
        <Route path="game/:id" element={<GameDetails />} />
        <Route path="about" element={<About />} />
        <Route path="add-game" element={<AddGame />} />
      </Route>
    </Routes>
  );
}

export default App;

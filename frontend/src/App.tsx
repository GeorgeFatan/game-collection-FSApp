import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Shelf from "./pages/Shelf";
import { GameDetails } from "./pages/GameDetails";
import About from "./pages/About";
import AddGame from "./pages/AddGamePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="shelf" element={<Shelf />} />
      <Route path="game/:id" element={<GameDetails />} />
      <Route path="about" element={<About />} />
      <Route path="add-game" element={<AddGame />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      
    </Routes>
  );
}

export default App;

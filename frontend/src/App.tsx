import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Shelf from "./pages/Shelf";
import { GameDetails } from "./pages/GameDetails";
import About from "./pages/About";
import AddGame from "./pages/AddGamePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import FavoriteGames from "./pages/FavoriteGames";
import { useEffect } from "react";
import "./backToTop.css";

function App() {

  useEffect( () => {
    const handleScroll = () => {
      const btn = document.getElementById("backToTop");
      if(window.scrollY > 300){
        btn?.classList.add("show");
      }
      else{
        btn?.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    <div>
<Routes>
      <Route path="/" element={<MainPage />} />

      <Route element={<Layout />}>
        <Route path="shelf" element={<Shelf />} />
        <Route path="game/:id" element={<GameDetails />} />
        <Route path="about" element={<About />} />
        <Route path="add-game" element={<AddGame />} />
        <Route path="favorites" element={<FavoriteGames />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>

    <button id="backToTop" onClick={scrollToTop}>↑</button>
    </div>
    
  );
}

export default App;

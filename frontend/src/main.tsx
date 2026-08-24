import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Sidebar from "./components/Sidebar";

function mountSidebar() {
  // verific if user == logged in
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const sidebarRoot = document.getElementById("sidebar");

  if (isLoggedIn && sidebarRoot && !sidebarRoot.hasChildNodes()) {
    ReactDOM.createRoot(sidebarRoot).render(<Sidebar />);
  } else if (!isLoggedIn && sidebarRoot?.hasChildNodes()) {
    sidebarRoot.innerHTML = "";
  }
}

// we listen in local storage if we are loged in or loged out
window.addEventListener("storage", mountSidebar);

// montam sidebaru initial la pornirea app
mountSidebar();

// montam aplicatia principala
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

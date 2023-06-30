import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Personajes from "./components/personajes/Personajes";
import Ubicaciones from "./components/ubicaciones/Ubicaciones";
import Episodios from "./components/episodios/Episodios";
import DetallePersonaje from "./components/personajes/DetallePersonaje";
import DetalleUbicacion from "./components/ubicaciones/DetalleUbicacion";
import DetalleEpisodio from "./components/episodios/DetalleEpisodio";
import "./App.css"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/personajes" element={<Personajes />} caseSensitive />
        <Route path="/ubicaciones" element={<Ubicaciones />} caseSensitive />
        <Route path="/episodios" element={<Episodios />} caseSensitive />
        <Route path="/personajes/:id" element={<DetallePersonaje />} caseSensitive />
        <Route path="/ubicaciones/:id" element={<DetalleUbicacion />} caseSensitive />
        <Route path="/episodios/:id" element={<DetalleEpisodio />} caseSensitive />
      </Routes>
    </Router>
  );
}

export default App;
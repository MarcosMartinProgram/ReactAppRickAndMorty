import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";
import CardPersonaje from "./CardPersonaje";
import "./Episodios";
import "./DetalleEpisodio.css"
import { Episodio } from "./Episodios";



type DetalleEpisodioProps = {
  episodio: Episodio;
  caracteristicasPrincipales: { name: string; episode: string };
  onVolverAtras: () => void;
};

const DetalleEpisodio: React.FC<DetalleEpisodioProps> = ({
  episodio,
  caracteristicasPrincipales,
  onVolverAtras,
}) => {
  const [charactersNames, setCharacterNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchCharacterNames = async () => {
      const promises = episodio.characters.map((characterUrl) =>
        axios.get(characterUrl).then((response) => response.data)
      );
      const characterData = await Promise.all(promises);
      const names = characterData.map((character) => character.name);
      setCharacterNames(names);
    };

    fetchCharacterNames();
  }, [episodio.characters]);

  const handleVolverAtras = () => {
    onVolverAtras();
  };

  const { name, episode, air_date, } = episodio;

  return (
    <div className="detalle-episodio-container">
      <div className="episodio-name">Nombre: {name}</div>
      <div className="episodio-type">Episodio N°: {episode}</div>
      <div className="episodio-dimension">Fecha al aire: {air_date}</div>
      <div className="episodio-residentes">
        <h4>Personajes:</h4>
        <ul>
          {charactersNames.map((characterName) => (
            <li key={characterName}>{characterName}</li>
          ))}
        </ul>
      </div>
      <button className="episodio-back-button" onClick={handleVolverAtras}>
        Volver
      </button>
    </div>
  );
};

export default DetalleEpisodio;

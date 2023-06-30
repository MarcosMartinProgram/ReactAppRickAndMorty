import React from "react";
import { Personaje } from "./Personajes";
import "./DetallePersonaje.css";

type DetallePersonajeProps = {
  personaje: Personaje;
  caracteristicasPrincipales: { name: string; species: string; status: string };
  onVolverAtras: () => void;
};

const DetallePersonaje: React.FC<DetallePersonajeProps> = ({
  personaje,
  
  onVolverAtras,
}) => {
  if (!personaje) {
    return null;
  }

  const handleVolverAtras = () => {
    onVolverAtras(); 
  };

  const {
    name,
    species,
    status,
    image,
    type,
    gender,
    origin,
    location,
    episode,
  } = personaje;

  return (
    <div className="detalle-personaje-container">
      <img className="personaje-image" src={image} alt={name} />
      <h2 className="personaje-name">{name}</h2>
      <h3 className="personaje-status">Estado: {status}</h3>
      <h3 className="personaje-species">Especie: {species}</h3>
      <h4>Type: {type}</h4>
      <h4>Gender: {gender}</h4>
      <h4>Origin: {origin.name}</h4>
      <h4>Location: {location.name}</h4>
      <h4>Episodes: {episode.length}</h4>

      <button className="personaje-back-button" onClick={handleVolverAtras}>
        Volver
      </button>
    </div>
  );
};

export default DetallePersonaje;


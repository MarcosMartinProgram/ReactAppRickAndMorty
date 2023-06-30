// PersonajeCard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import './CardPersonaje.css'

interface PersonajeCardProps {
  url: string;
}

const PersonajeCard: React.FC<PersonajeCardProps> = ({ url }) => {
  const [personaje, setPersonaje] = useState<any>(null);

  useEffect(() => {
    const fetchPersonaje = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        setPersonaje(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPersonaje();
  }, [url]);

  if (!personaje) {
    return null;
  }

  const { name, image } = personaje;

  return (
    <div className="personaje-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default PersonajeCard;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Error from "../Error";
import Loader from "../Loader";
import "./Personajes.css";
import DetallePersonaje from "./DetallePersonaje";


export interface Personaje {
  id: number;
  name: string;
  species: string;
  image: string;
  status: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  episode: Array<string>;
}

function Personajes() {
  const [personajes, setPersonajes] = useState<Array<Personaje>>([]);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState<Personaje | null>(
    null
  );

  useEffect(() => {
    obtenerPersonajes();
  }, [pagina]);

  const obtenerPersonajes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${pagina}`
      );
      const data = response.data.results;
      setPersonajes(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error al cargar los personajes");
      setLoading(false);
    }
  };

  const cargarMasPersonajes = () => {
    setPagina(pagina + 1);
  };

  const retrocederPagina = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const seleccionarPersonaje = (personaje: Personaje) => {
    setPersonajeSeleccionado(personaje);
  };

  const volverAtras = () => {
    setPersonajeSeleccionado(null);
  };

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error} />;
  }

  if (personajeSeleccionado) {
    return (
      <div>
        
        <DetallePersonaje
          personaje={personajeSeleccionado}
          caracteristicasPrincipales={{
            name: personajeSeleccionado.name,
            species: personajeSeleccionado.species,
            status: personajeSeleccionado.status,
          }}
          onVolverAtras={volverAtras}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Personajes</h1>
      <div className="personajes-container">
        {personajes.map((personaje) => {
          const {
            id,
            name,
            species,
            image,
            status,
            type,
            gender,
            origin,
            location,
            episode,
          } = personaje;

          const caracteristicasPrincipales = {
            name,
            species,
            status,
          };

          return (
            <div
              className="personaje-card"
              key={id}
              onClick={() => seleccionarPersonaje(personaje)}
            >
              <h2>{name}</h2>
              <h3>
                {status}-{species}
              </h3>
              <img src={image} alt={name} />
              {personajeSeleccionado === personaje && (
                <DetallePersonaje
                  personaje={personaje}
                  caracteristicasPrincipales={caracteristicasPrincipales}
                  onVolverAtras={volverAtras}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <button onClick={retrocederPagina} disabled={pagina === 1}>
          Atrás
        </button>
        <p>Pág. ({pagina})</p>
        <button onClick={cargarMasPersonajes}>Siguiente</button>
      </div>
    </div>
  );
}

export default Personajes;

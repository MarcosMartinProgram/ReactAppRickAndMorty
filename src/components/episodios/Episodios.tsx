import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";
import DetalleEpisodio from "./DetalleEpisodio";
import "./Episodios.css";


export interface Episodio {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<{
    url: string;
  }>;
}

function Episodios() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [episodios, setEpisodios] = useState<Array<Episodio>>([]);
  const [pagina, setPagina] = useState(1);
  const [episodioSeleccionado, setEpisodioSeleccionado] = useState<Episodio | null>(
    null
  );

  useEffect(() => {
    obtenerEpisodios();
  }, [pagina]);

  const obtenerEpisodios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${pagina}`);
      const data = response.data.results;
      setEpisodios(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error al obtener los episodios");
      setLoading(false);
    }
  };

  const cargarMasEpisodios = () => {
    setPagina(pagina + 1);
  };

  const retrocederPagina = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const seleccionarEpisodio = (episodio: Episodio) => {
    setEpisodioSeleccionado(episodio);
  };

  const volverAtras = () => {
    setEpisodioSeleccionado(null);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  if (episodioSeleccionado) {
    return (
      <div>
        <DetalleEpisodio
          episodio={episodioSeleccionado}
          caracteristicasPrincipales={{
            name: episodioSeleccionado.name,
            episode: episodioSeleccionado.episode,
          }}
          onVolverAtras={volverAtras}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Episodios</h1>
      <div className="episodios-container">
        {episodios.map((episodio) => (
          <div
            key={episodio.id}
            className="episodio-card"
            onClick={() => seleccionarEpisodio(episodio)}
          >
            <h2>Name: {episodio.name}</h2>
            <h3>Episodio: {episodio.episode}</h3>
            <p>{episodio.air_date}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={retrocederPagina} disabled={pagina === 1}>
          Atrás
        </button>
        <p>Pág. ({pagina})</p>
        <button onClick={cargarMasEpisodios}>Página Siguiente</button>
      </div>
    </div>
  );
}

export default Episodios;

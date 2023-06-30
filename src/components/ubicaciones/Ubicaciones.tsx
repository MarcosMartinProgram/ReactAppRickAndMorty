import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";
import DetalleUbicacion from "./DetalleUbicacion";
import "./Ubicaciones.css";

export interface Ubicacion {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Array<{
    url: string;
  }>;
  url: {
    name: string;
    url: string;
  };
}

function Ubicaciones() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ubicaciones, setUbicaciones] = useState<Array<Ubicacion>>([]);
  const [pagina, setPagina] = useState(1);
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState<Ubicacion | null>(
    null
  );

  useEffect(() => {
    obtenerUbicaciones();
  }, [pagina]);

  const obtenerUbicaciones = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${pagina}`);
      const data = response.data.results;
      setUbicaciones(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error al obtener las ubicaciones");
      setLoading(false);
    }
  };

  const cargarMasUbicaciones = () => {
    setPagina(pagina + 1);
  };

  const retrocederPagina = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const seleccionarUbicacion = (ubicacion: Ubicacion) => {
    setUbicacionSeleccionada(ubicacion);
  };

  const volverAtras = () => {
    setUbicacionSeleccionada(null);
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

  if (ubicacionSeleccionada) {
    return (
      <div>
        <DetalleUbicacion
          ubicacion={ubicacionSeleccionada}
          caracteristicasPrincipales={{
            name: ubicacionSeleccionada.name,
            type: ubicacionSeleccionada.type,
          }}
          onVolverAtras={volverAtras}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Ubicaciones</h1>
      <div className="ubicaciones-container">
        {ubicaciones.map((ubicacion) => (
          <div
            key={ubicacion.id}
            className="ubicacion-card"
            onClick={() => seleccionarUbicacion(ubicacion)}
          >
            <h2>Name: {ubicacion.name}</h2>
            <h3>Type: {ubicacion.type}</h3>
            <p>{ubicacion.dimension}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={retrocederPagina} disabled={pagina === 1}>
           Atrás
        </button>
        <p>Pág. ({pagina})</p>
        <button onClick={cargarMasUbicaciones}>Pagina Siguiente</button>
      </div>
    </div>
  );
}

export default Ubicaciones;

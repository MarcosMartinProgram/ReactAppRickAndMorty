import React, { useEffect, useState } from "react";
import { Ubicacion } from "./Ubicaciones";
import "./DetalleUbicacion.css";
import axios from "axios";


type DetalleUbicacionProps = {
  ubicacion: Ubicacion;
  caracteristicasPrincipales: { name: string; type: string };
  onVolverAtras: () => void;
};

const DetalleUbicacion: React.FC<DetalleUbicacionProps> = ({
  ubicacion,
  caracteristicasPrincipales,
  onVolverAtras,
}) => {
  const [residentNames, setResidentNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchResidentNames = async () => {
      const promises = ubicacion.residents.map((residentUrl) =>
        axios.get(residentUrl).then((response) => response.data)
      );
      const residentData = await Promise.all(promises);
      const names = residentData.map((resident) => resident.name);
      setResidentNames(names);
    };

    fetchResidentNames();
  }, [ubicacion.residents]);

  const handleVolverAtras = () => {
    onVolverAtras();
  };

  const { name, type, dimension } = ubicacion;

  return (
    <div className="detalle-ubicacion-container">
      <div className="ubicacion-name">{name}</div>
      <div className="ubicacion-type">{type}</div>
      <div className="ubicacion-dimension">Dimension: {dimension}</div>
      <div className="ubicacion-residentes">
        <h4>Residentes:</h4>
        <ul>
          {residentNames.map((residentName) => (
            <li key={residentName}>{residentName}</li>
          ))}
        </ul>
      </div>
      <button className="ubicacion-back-button" onClick={handleVolverAtras}>
        Volver
      </button>
    </div>
  );
};

export default DetalleUbicacion;






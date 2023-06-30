import React, { useEffect, useState } from 'react';

// Componente de detalles de ubicación
const LocationDetails = ({ location }) => {
  const { name, type, dimension, residents } = location;
  const [residentNames, setResidentNames] = useState([]);

  useEffect(() => {
    const fetchResidentNames = async () => {
      const promises = residents.map(residentUrl =>
        fetch(residentUrl).then(response => response.json())
      );
      const residentData = await Promise.all(promises);
      const names = residentData.map(resident => resident.name);
      setResidentNames(names);
    };

    fetchResidentNames();
  }, [residents]);

  return (
    <div>
      <h2>{name}</h2>
      <p>Type: {type}</p>
      <p>Dimension: {dimension}</p>
      <h3>Residents:</h3>
      <ul>
        {residentNames.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocationDetails;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentPromises = planet.residents.map(async (residentUrl) => {
        const response = await fetch(residentUrl);
        return await response.json();
      });

      Promise.all(residentPromises)
        .then((residentData) => setResidents(residentData))
        .catch((error) => console.error('Error fetching residents:', error));
    };

    fetchResidents();
  }, [planet.residents]);

  return (
    <div className="planetcard-parent">
      <div className="planet-card">
      <h2>{planet.name}</h2>
      <p><strong>Climate:</strong> {planet.climate}</p>
      <p><strong>Population:</strong> {planet.population}</p>
      <p><strong>Terrain:</strong> {planet.terrain}</p>
      <h5>Residents:</h5>
      <ul>
        {residents.map((resident) => (
          <li key={resident.name}>
            
            {resident.name} - Height: {resident.height} | Mass: {resident.mass} | Gender: {resident.gender}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

PlanetCard.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    climate: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired,
    terrain: PropTypes.string.isRequired,
    residents: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PlanetCard;








// import React from 'react';
// import PropTypes from 'prop-types';

// const PlanetCard = ({ planet }) => {
//   console.log(planet)
//   return (
//     <div className="App">

//     <div className="planet-card">
//       <h2>{planet.name}</h2>
//       <p><strong>Climate:</strong> {planet.climate}</p>
//       <p><strong>Population:</strong> {planet.population}</p>
//       <p><strong>Terrain:</strong> {planet.terrain}</p>
//     </div>
//     </div>

//   );
// };

// PlanetCard.propTypes = {
//   planet: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     climate: PropTypes.string.isRequired,
//     population: PropTypes.string.isRequired,
//     terrain: PropTypes.string.isRequired,
//    }).isRequired,
// };

// export default PlanetCard;

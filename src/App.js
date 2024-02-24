import React, { useEffect, useState } from 'react';
import PlanetCard from './components/PlanetCard';
import { Audio } from 'react-loader-spinner';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [planetsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/planets/?format=json`);
        const data = await response.json();
        setTimeout(() => {
          setPlanets(data.results);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching planets:', error);
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  const indexOfLastPlanet = currentPage * planetsPerPage;
  const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
  const currentPlanets = planets.slice(indexOfFirstPlanet, indexOfLastPlanet);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(planets.length / planetsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container">
      <h3>Star Wars Planets</h3>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Audio type="TailSpin" color="#ff9900" height={80} width={80} />
      </div>

      ) : (
        <div>
          <div className="planet-cards-container">
            {currentPlanets.map((planet) => (
              <PlanetCard key={planet.name} planet={planet} />
            ))}
          </div>
          <div className="pagination">
            <button className="pagination-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            {[...Array(Math.ceil(planets.length / planetsPerPage))].map((_, index) => (
              <button
                key={index + 1}
                className="pagination-btn"
                onClick={() => handlePagination(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(planets.length / planetsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

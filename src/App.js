import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetCard from './components/PlanetCard';
import Pagination from './components/Pagination';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [planetsPerPage] = useState(4);

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
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
      <div className="planet-cards-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          currentPlanets.map((planet) => (
            <PlanetCard key={planet.name} planet={planet} />
          ))
        )}
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
  );
};

App.propTypes = {};

export default App;




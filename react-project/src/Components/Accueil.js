import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Accueil.css";
import MovieList from "./MovieList";
import Pagination from "./Pagination";

function Accueil() {
  const [keyword, setKeyword] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingTo, setRatingTo] = useState("");

  // Pagination
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    axios.get("movies.json").then((res) => setMovies(res.data.movies));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // handle form submission on search button click
  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredMovies = movies.filter((movie) => {
      if (movie.title.toLowerCase().includes(keyword.toLowerCase())) {
        if (
          (yearFrom === "" || movie.year >= parseInt(yearFrom)) &&
          (yearTo === "" || movie.year <= parseInt(yearTo))
        ) {
          if (
            (ratingFrom === "" || movie.rating >= parseFloat(ratingFrom)) &&
            (ratingTo === "" || movie.rating <= parseFloat(ratingTo))
          ) {
            return true;
          }
        }
      }
      return false;
    });

    setMovies(filteredMovies);
  };

  // handle form reset on clear button click
  const handleClear = () => {
    setKeyword("");
    setYearFrom("");
    setYearTo("");
    setRatingFrom("");
    setRatingTo("");
    setMovies([]);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="header-movies">
        <h2>Movies Database</h2>
      </div>
      <div className="movies-database-container">
        {/* Div 20% */}
        <div className="movies-database-sidebar">
          <form onSubmit={handleSubmit}>
            <label htmlFor="keyword">Keyword:</label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />

            <label htmlFor="yearFrom">Year From:</label>
            <input
              type="text"
              id="yearFrom"
              value={yearFrom}
              onChange={(event) => setYearFrom(event.target.value)}
            />

            <label htmlFor="yearTo">Year To:</label>
            <input
              type="text"
              id="yearTo"
              value={yearTo}
              onChange={(event) => setYearTo(event.target.value)}
            />

            <label htmlFor="ratingFrom">Rating From:</label>
            <input
              type="text"
              id="ratingFrom"
              value={ratingFrom}
              onChange={(event) => setRatingFrom(event.target.value)}
            />

            <label htmlFor="ratingTo">Rating To:</label>
            <input
              type="text"
              id="ratingTo"
              value={ratingTo}
              onChange={(event) => setRatingTo(event.target.value)}
            />
            <div>
              <div class="btn-container">
                <button type="submit" className="btn-search">
                  Search
                </button>
              </div>
              <div class="btn-container">
                <button
                  type="button"
                  className="btn-clear"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Div 80% */}
        <div className="movies-database-content">
          <div className="movies-database-pagination">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={movies.length}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
          <div className="movies-database-sorting">
            <span className="movies-database-sort-label">Trier par:</span>
            <select>
              <option value="title">By title</option>
            </select>
          </div>
          <div className="movies-database-grid">
            <MovieList />
          </div>
          <div className="movies-database-pagination">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={movies.length}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <div className="movies-database-footer">
        {/* Footer */}
        <span>© 2023 Movies Database. All Rights Reserved.</span>
      </div>
    </div>
  );
}

export default Accueil;

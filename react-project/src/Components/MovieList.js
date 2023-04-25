import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MovieList.css";
import Pagination from "./Pagination";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12);

  useEffect(() => {
    axios
      .get("http://localhost:3011/movies")
      .then((res) => setMovies(res.data));
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="movie-list-container">
      <div className="movie-list">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={require(`../images/${movie.Image}`)} alt={movie.Title} />
            <div className="movie-details">
              <div className="movie-rating">{movie.Rating}</div>
              <div className="movie-title">{movie.Title}</div>
              <div className="movie-date">{movie.ReleaseDate}</div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={movies.length}
        paginate={paginate}
      />
    </div>
  );
}

export default MovieList;

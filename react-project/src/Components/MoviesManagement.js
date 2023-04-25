import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import "./MoviesManagement.css";
import Pagination from "./Pagination";

function MoviesManagement() {
  const navigate = useNavigate();
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
  const handleDeleteMovie = (movieId) => {
    const updatedMovies = movies.filter((movie) => movie.id !== movieId);
    setMovies(updatedMovies);
    axios.delete(`http://localhost:3011/movies/${movieId}`).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div>
      <h2 className="header">Admin Portal</h2>
      <div className="container">
        <div className="container-item-1">
          <div className="button-group">
            <button
              className="container-item-1-btn"
              onClick={() => navigate("/MoviesManagement")}
            >
              Movies
            </button>
            <button
              className="container-item-1-btn"
              onClick={() => navigate("/UserManagment")}
            >
              Users
            </button>
            <Link to="/" className="container-item-1-btn">
              Logout
            </Link>
          </div>
        </div>
        <div className="container-item-2">
          <button
            className="container-item-2-btn"
            onClick={() => navigate("/AddMovie")}
          >
            Add Movie
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Country</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentMovies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.Title}</td>
                  <td>{movie.Duration}</td>
                  <td>{movie.Country}</td>
                  <tr>
                    <td>
                      <button
                        className="container-item-2-btn-1"
                        onClick={() => navigate("/AddMovie")}
                      >
                        Add
                      </button>
                      <button
                        className="container-item-2-btn-1"
                        onClick={() => navigate(`/EditMovie/${movie.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="container-item-2-btn-1"
                        onClick={() =>
                          handleDeleteMovie(movie.id).then.navigate(
                            "/MoviesManagement"
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={movies.length}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MoviesManagement;

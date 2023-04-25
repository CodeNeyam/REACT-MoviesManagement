import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import "./EditMovie.css";

function EditMovie() {
  const navigate = useNavigate("");
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3011/movies/${id}`)
      .then((res) => setMovie(res.data));
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3011/movies/${id}`, movie)
      .then(navigate("/MoviesManagement"));
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
            <Link className="container-item-1-btn" to="/">
              Logout
            </Link>
          </div>
        </div>
        <div className="container-item-2">
          <h1>Edit Movies</h1>
          <form>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={movie?.Title}
              onChange={(e) => setMovie({ ...movie, Title: e.target.value })}
            />
            <br />
            <label>Description:</label>
            <textarea
              type="text"
              name="synopsis"
              value={movie?.Synopsis}
              onChange={(e) => setMovie({ ...movie, Synopsis: e.target.value })}
            ></textarea>
            <br />
            <label>Duration:</label>
            <input
              type="number"
              name="duration"
              value={movie?.Duration}
              onChange={(e) => setMovie({ ...movie, Duration: e.target.value })}
            />
            <br />

            <label>Image:</label>
            {movie.Image && (
              <img
                src={require(`../images/${movie?.Image}`)}
                alt={movie.Title}
              />
            )}
            <input
              type="file"
              name="image"
              // value={movie?.Image}
              onChange={(e) => setMovie({ ...movie, Image: e.target.value })}
            />
            <br />
            <label>Release Date:</label>
            <input
              type="date"
              name="releaseDate"
              value={movie?.ReleaseDate}
              onChange={(e) =>
                setMovie({ ...movie, ReleaseDate: e.target.value })
              }
            />
            <br />
            <label>Rating:</label>
            <input
              type="text"
              name="rating"
              value={movie?.Rating}
              onChange={(e) => setMovie({ ...movie, Rating: e.target.value })}
            />
            <br />
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={movie?.Country}
              onChange={(event) =>
                setMovie({ ...movie, Country: event.target.value })
              }
            />
            <br />
            <input
              onClick={handleSave}
              type="submit"
              className="btn-add"
              value="Save"
            ></input>
            <input
              type="submit"
              className="btn-add"
              value="Cancel"
              onClick={() => navigate("/")}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMovie;

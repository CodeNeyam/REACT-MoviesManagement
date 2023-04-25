import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import "./AddMovie.css";

function AddMovie() {
  const navigate = useNavigate();

  const [ID, setID] = useState("");
  const [Title, setTitle] = useState("");
  const [Synopsis, setSynopsis] = useState("");
  const [Duration, setDuration] = useState("");
  const [Image, setImage] = useState("");
  const [ReleaseDate, setReleaseDate] = useState("");
  const [Rating, setRating] = useState("");
  const [Country, setCountry] = useState("");

  const data = {
    id: ID,
    Title: Title,
    Synopsis: Synopsis,
    Duration: Duration,
    Image: Image,
    ReleaseDate: ReleaseDate,
    Rating: Rating,
    Country: Country,
  };

  function Save(e) {
    e.preventDefault();
    console.log(data);
    axios
      .post("http://localhost:3011/movies", data)
      .then(navigate("/MoviesfManagement"));
  }

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
          <h1>Add Movie</h1>
          <form>
            <label>ID :</label>
            <input
              value={ID}
              onChange={(e) => setID(e.target.value)}
              type="text"
            />
            <br />
            <label>Title:</label>
            <input
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
            <br />
            <label>Description:</label>
            <input
              value={Synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              type="text"
            ></input>
            <br />
            <label>Duration:</label>
            <input
              value={Duration}
              onChange={(e) => setDuration(e.target.value)}
              type="text"
            />
            <br />
            <label>Image:</label>
            <input
              value={Image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
            />
            <br />
            <label>Release Date:</label>
            <input
              value={ReleaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              type="date"
            />
            <br />
            <label>Rating:</label>
            <input
              value={Rating}
              onChange={(e) => setRating(e.target.value)}
              type="number"
            />
            <br />
            <label>Country:</label>
            <input
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
            />
            <br />
            <input
              onClick={Save}
              type="submit"
              value="Save"
              className="btn-add"
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

export default AddMovie;

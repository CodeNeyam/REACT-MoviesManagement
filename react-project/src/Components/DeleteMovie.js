import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteMovie({ movie }) {
  const navigate = useNavigate("");

  function handleDelete(e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:3011/movies/${movie.id}`)
      .then(navigate("/MoviesManagement"));
  }

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteMovie;

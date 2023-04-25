import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteUser({ user }) {
  const navigate = useNavigate("");

  function handleDelete(e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/users/${user.id}`)
      .then(navigate("/UserManagment"));
  }

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteUser;

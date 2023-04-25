import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    id: id,
    username: username,
    password: password,
  };

  function Save(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", data)
      .then(navigate("/UserManagment"));
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
          <h1>Add Users</h1>
          <form>
            <label>Id: </label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
            />
            <br />
            <label>Username:</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
            <br />
            <label>Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
            />
            <br />
            <br />
            <input
              onClick={Save}
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

export default AddUser;

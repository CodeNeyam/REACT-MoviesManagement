import axios from "axios";
import React, { useState, useEffect, Children } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

function EditUser() {
  const navigate = useNavigate("");
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => setUser(res.data));
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/users/${id}`, user)
      .then(navigate("/UserManagment"));
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
          <h1>Edit User</h1>
          <form>
            <label>Id: </label>
            <input
              value={user?.id}
              onChange={(e) => setUser({ ...user, id: e.target.value })}
              type="text"
            />
            <br />
            <label>Username:</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
            />
            <br />
            <label>Password:</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="text"
            />
            <br />
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

export default EditUser;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import "./UserManagment.css";
import Pagination from "./Pagination";
import DeleteUser from "./DeleteUser";

function UsersManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get("accounts.json").then((res) => setUsers(res.data.users));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    axios.delete(`http://localhost:3000/users/${userId}`).then((res) => {
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
            <button className="container-item-1-btn">Users</button>
            <Link className="container-item-1-btn" to="/">
              Logout
            </Link>
          </div>
        </div>
        <div className="container-item-2">
          <button
            className="container-item-2-btn"
            onClick={() => navigate("/AddUser")}
          >
            Add User
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <tr>
                    <td>
                      <button
                        className="container-item-2-btn-1"
                        onClick={() => navigate("/AddUser")}
                      >
                        Add
                      </button>
                      <button
                        className="container-item-2-btn-1"
                        onClick={() => navigate(`/EditUser/${user.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="container-item-2-btn-1"
                        onClick={() =>
                          handleDeleteUser(user.id).then.navigate(
                            "/UserManagment"
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
          </table>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={users.length}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default UsersManagement;

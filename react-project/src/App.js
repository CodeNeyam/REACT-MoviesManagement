import { Routes, Route } from "react-router-dom";
import React from "react";
import LoginForm from "./Components/LoginForm";
import MoviesManagement from "./Components/MoviesManagement";
import AddMovie from "./Components/AddMovie";
import EditMovie from "./Components/EditMovie";
import DeleteMovie from "./Components/DeleteMovie";
import MoviesPage from "./Components/MoviesPage";
import UserManagment from "./Components/UserManagment";
import AddUser from "./Components/AddUser";
import DeleteUser from "./Components/DeleteUser";
import EditUser from "./Components/EditUser";
import Accueil from "./Components/Accueil";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="MoviesManagement" element={<MoviesManagement />} />
        <Route path="AddMovie" element={<AddMovie />} />
        <Route path="EditMovie/:id" element={<EditMovie />} />
        <Route path="DeleteMovie" element={<DeleteMovie />} />
        <Route path="MoviesPage" element={<MoviesPage />} />
        <Route path="UserManagment" element={<UserManagment />} />
        <Route path="AddUser" element={<AddUser />} />
        <Route path="DeleteUser" element={<DeleteMovie />} />
        <Route path="EditUser/:id" element={<EditUser />} />
        <Route path="Accueil" element={<Accueil />} />
      </Routes>
    </div>
  );
}

export default App;

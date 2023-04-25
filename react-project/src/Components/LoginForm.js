import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [database, setDatabase] = useState([]);
  const navigate = useNavigate();

  // User Login info
  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  useEffect(() => {
    fetch("accounts.json")
      .then((response) => response.json())
      .then((data) => {
        setDatabase(data.users);
      });
  }, []);

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        navigate("/MoviesManagement");
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" className="form-control" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            className="form-control"
            name="pass"
            required
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" className="btn" value="Login" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="">
      <div className="login-form">
        <h2 className="header">Admin Portal</h2>
        {renderForm}
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default LoginForm;

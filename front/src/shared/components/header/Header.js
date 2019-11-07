import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import LoginDialog from "../dialog/LoginDialog";

const Header = props => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                About
              </Link>
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <button className="btn btn-info my-2 mr-2 my-sm-0" type="submit">
              Inscription
            </button>
            <button
              className="btn btn-success my-2 mr-2 my-sm-0"
              onClick={handleClickOpen}
            >
              Connexion
            </button>
            <Link to="/logout" className="btn btn-warning my-2 my-sm-0">
              Déconnexion
            </Link>
          </div>
        </div>
      </nav>
      <LoginDialog open={open} handleClose={handleClose} />
    </Router>
  );
};

export default Header;

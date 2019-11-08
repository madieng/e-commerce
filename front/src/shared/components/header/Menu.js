import React from "react";
import { Link } from "@material-ui/core";

const Menu = props => {
  return (
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
  );
};

export default Menu;

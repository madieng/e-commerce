import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import LoginDialog from "../dialog/LoginDialog";
import HomeIcon from "../icons/HomeIcon";
import LoginDialogContext from "./../../context/login-dialog.context";
import Buttons from "./Buttons";
import Menu from "./Menu";

const Header = props => {
  const [open, setOpen] = useState(false);
  const contextValue = {
    open,
    setOpen
  };

  return (
    <LoginDialogContext.Provider value={contextValue}>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">
            <HomeIcon fontSize="large" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <Menu />
            <div className="form-inline my-2 my-lg-0">
              <Buttons />
            </div>
          </div>
        </nav>
        <LoginDialog />
      </Router>
    </LoginDialogContext.Provider>
  );
};

export default Header;

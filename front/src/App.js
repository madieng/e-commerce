import React, { useState } from "react";
import "./App.css";
import "./config/axios.config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./shared/components/header/Header";
import AuthService from "./shared/services/auth.service";
import AuthContext from "./shared/context/auth.context";
import DrawerContext from "./shared/context/drawer.context";

function App() {
  // Authentificated
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );
  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated
  };
  // Drawer
  const [openDrawer, setOpenDrawer] = useState({
    register: false,
    login: false,
    profile: false
  });
  const drawerContextValue = {
    openDrawer,
    setOpenDrawer
  };

  return (
    <div className="App">
      <AuthContext.Provider value={authContextValue}>
        <DrawerContext.Provider value={drawerContextValue}>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </DrawerContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

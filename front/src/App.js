import React from "react";
import "./App.css";
import "./config/axios.config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import { Container } from "react-bootstrap";
import Header from "./shared/components/header/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;

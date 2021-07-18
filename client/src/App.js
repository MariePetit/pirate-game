import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RandomCard from "./components/RandomCard";
import { GlobalStyle } from "./components/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route exact path="/game">
            <RandomCard />
          </Route>
          <Route exact path="/harbor">
            Harbor
          </Route>
          <Route exact path="/settings">
            Settings
          </Route>
          <Route exact path="/profile">
            Profile
          </Route>
          <Route exact path="/signup">
            Signup
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RandomCard from "./components/RandomCard";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import { GlobalStyle } from "./components/GlobalStyle";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Harbor from "./pages/Harbor";
import About from "./pages/About";
import Forum from "./pages/Forum";
import Pirate from "./pages/Pirate";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/game">
            <RandomCard />
          </Route>
          <Route exact path="/harbor">
            <Harbor />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/pirate">
            <Pirate />
          </Route>
          <Route exact path="/signin">
            <Signup />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/forum">
            <Forum />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;

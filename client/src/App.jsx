import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

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
import DropDown from "./components/DropDown";
import IntroPage from "./pages/IntroPage";
import Graveyard from "./pages/Graveyard";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/intro">
            <IntroPage />
          </Route>
          <Route exact path="/game">
            <RandomCard />
          </Route>
          <Route exact path="/harbor">
            <DropDown />
            <Harbor />
          </Route>
          <Route exact path="/settings">
            <DropDown />
            <Settings />
          </Route>
          <Route exact path="/profile">
            <DropDown />
            <Profile />
          </Route>
          <Route exact path="/pirate">
            <DropDown />
            <Pirate />
          </Route>
          <Route exact path="/signin">
            <Signup />
          </Route>
          <Route exact path="/about">
            <DropDown />
            <About />
          </Route>
          <Route exact path="/forum">
            <DropDown />
            <Forum />
          </Route>
          <Route exact path="/graveyard">
            <DropDown />
            <Graveyard />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default App;

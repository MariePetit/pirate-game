import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { UserProvider } from "./components/Contexts/UserContext";
import { GameProvider } from "./components/Contexts/GameContext";
import { TransitionProvider } from "./components/Contexts/TransitionContext";

ReactDOM.render(
  <TransitionProvider>
    <UserProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </UserProvider>
  </TransitionProvider>,
  document.getElementById("root")
);

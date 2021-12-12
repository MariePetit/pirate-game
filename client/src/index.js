import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { StatsProvider } from "./components/StatsContext";
import { CardProvider } from "./components/CardContext";
import { UserProvider } from "./components/UserContext";
import { GameProvider } from "./components/Contexts/GameContext";

ReactDOM.render(
  <UserProvider>
    <CardProvider>
      <StatsProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </StatsProvider>
    </CardProvider>
  </UserProvider>,
  document.getElementById("root")
);

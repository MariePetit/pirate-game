import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { UserProvider } from "./components/UserContext";
import { GameProvider } from "./components/Contexts/GameContext";

ReactDOM.render(
  <UserProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </UserProvider>,
  document.getElementById("root")
);

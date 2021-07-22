import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { StatsProvider } from "./components/StatsContext";
import { CardProvider } from "./components/CardContext";
import { UserProvider } from "./components/UserContext";

ReactDOM.render(
  <UserProvider>
    <CardProvider>
      <StatsProvider>
        <App />
      </StatsProvider>
    </CardProvider>
  </UserProvider>,
  document.getElementById("root")
);

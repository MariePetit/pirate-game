import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { StatsProvider } from "./components/StatsContext";
import { CardProvider } from "./components/CardContext";

ReactDOM.render(
  <CardProvider>
    <StatsProvider>
      <App />
    </StatsProvider>
  </CardProvider>,
  document.getElementById("root")
);

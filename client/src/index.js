import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { StatsProvider } from "./components/StatsContext";

ReactDOM.render(
  <StatsProvider>
    <App />
  </StatsProvider>,
  document.getElementById("root")
);

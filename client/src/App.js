import React from "react";

import RandomCard from "./components/RandomCard";
import { GlobalStyle } from "./components/GlobalStyle";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <RandomCard />
    </div>
  );
};

export default App;

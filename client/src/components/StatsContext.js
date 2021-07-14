import React, { createContext, useState } from "react";

const initialState = {
  gold: 50,
  moral: 100,
  health: 200,
  energy: 100,
};

export const StatsContext = createContext(null);

export const StatsProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <StatsContext.Provider value={{ state, setState }}>
      {children}
    </StatsContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";

import { checkIfLost } from "./checkIfLostFunction";

const initialState = {
  gold: 50,
  moral: 100,
  health: 200,
  energy: 100,
};

export const StatsContext = createContext(null);

export const StatsProvider = ({ children }) => {
  const [scurvy, setScurvy] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [showChanges, setShowChanges] = useState("none");
  const [state, setState] = useState(initialState);
  const [reasonForLost, setReasonForLost] = useState("");

  useEffect(() => {
    const reason = checkIfLost(state);

    if (reason) {
      setHasLost(true);
      setReasonForLost(reason.toLocaleLowerCase());
    }
  }, [state]);
  return (
    <StatsContext.Provider
      value={{
        state,
        setState,
        hasLost,
        setHasLost,
        reasonForLost,
        setReasonForLost,
        initialState,
        scurvy,
        setScurvy,
        showChanges,
        setShowChanges,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

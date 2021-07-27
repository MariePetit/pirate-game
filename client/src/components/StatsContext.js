import React, { createContext, useState, useEffect, useContext } from "react";

import { checkIfLost } from "./checkIfLostFunction";
// import { UserContext } from "./UserContext";

const initialState = {
  gold: 50,
  moral: 100,
  health: 200,
  energy: 100,
};

export const StatsContext = createContext(null);

export const StatsProvider = ({ children }) => {
  const [isCursed, setIsCursed] = useState(false);
  const [scurvy, setScurvy] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [showChanges, setShowChanges] = useState("none");
  const [state, setState] = useState(initialState);
  const [reasonForLost, setReasonForLost] = useState("");
  const [chosenMap, setChosenMap] = useState(null);

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
        chosenMap,
        setChosenMap,
        isCursed,
        setIsCursed,
        hasWon,
        setHasWon,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

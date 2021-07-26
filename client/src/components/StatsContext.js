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
  const [scurvy, setScurvy] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [showChanges, setShowChanges] = useState("none");
  const [state, setState] = useState(initialState);
  const [reasonForLost, setReasonForLost] = useState("");
  const [chosenMap, setChosenMap] = useState(null);

  // const { user } = useContext(UserContext);

  // a useEffect that takes the user's stats and sets them for the game
  // useEffect(() => {
  //   if (user._id) {
  //     const pirate = user.pirates.filter((pirate) => !pirate.isDead);
  //     console.log(pirate[0]);
  //     const crewEnergy = pirate[0].boat.crew.reduce((total, crewMate) => {
  //       return total + crewMate.energy;
  //     }, 0);
  //     const crewMoral = pirate[0].boat.crew.reduce((total, crewMate) => {
  //       return total + crewMate.moral;
  //     }, 0);

  //     const moral = crewMoral + pirate[0].moral;
  //     const energy = crewEnergy + pirate[0].energy;
  //     const health = pirate[0].boat.health;
  //     const gold = pirate[0].gold + Math.round(Math.random() * 100);

  //     setState({ gold, moral, health, energy });
  //   }
  // }, [user]);

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
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

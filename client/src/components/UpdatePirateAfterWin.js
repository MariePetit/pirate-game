import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

export const UpdatePirateAfterWin = (state, tick, chosenMap) => {
  const { alivePirate, setAlivePirate } = useContext(UserContext);
  const history = useHistory();
  const newTreasureMapArray = alivePirate.treasureMaps.filter(
    (map) => map.id !== chosenMap.id
  );
  setAlivePirate({
    ...alivePirate,
    age: alivePirate.age + tick,
    boat: { ...alivePirate.boat, health: state.health },
    gold: alivePirate.gold + state.gold,
    energy:
      state.energy > alivePirate.energy ? alivePirate.energy : state.energy,
    moral: state.moral > alivePirate.moral ? alivePirate.moral : state.moral,
    treasureMaps: newTreasureMapArray,
  });

  history.push("/pirate");
};

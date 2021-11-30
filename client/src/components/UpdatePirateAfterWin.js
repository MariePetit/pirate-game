import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

export const UpdatePirateAfterWin = (state, tick, chosenMap) => {
  const { alivePirate, setAlivePirate, user, update, setUpdate } =
    useContext(UserContext);
  const history = useHistory();
  const changedState = {
    age: alivePirate.age + tick,
    health:
      state.health > alivePirate.boat.health
        ? alivePirate.boat.health
        : state.health,
    gold: alivePirate.gold + state.gold,
    energy:
      state.energy > alivePirate.energy ? alivePirate.energy : state.energy,
    moral: state.moral > alivePirate.moral ? alivePirate.moral : state.moral,
  };
  async () => {
    await fetch(
      `/pirate/remove/treasuremap/${user._id}/${alivePirate.pirateId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chosenMap),
      }
    );
    await fetch(`/pirate/winTripUpdate/${user._id}/${alivePirate.pirateId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...changedState }),
    });
    history.push("/pirate");
  };
};

// setAlivePirate({
//   ...alivePirate,
//   age: alivePirate.age + tick,
//   boat: { ...alivePirate.boat, health: state.health },
//   gold: alivePirate.gold + state.gold,
//   energy:
//     state.energy > alivePirate.energy ? alivePirate.energy : state.energy,
//   moral: state.moral > alivePirate.moral ? alivePirate.moral : state.moral,
//   treasureMaps: newTreasureMapArray,
// });

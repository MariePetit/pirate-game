export const updatePirateAfterWin = (
  state,
  tick,
  chosenMap,
  alivePirate,
  user,
  update,
  setUpdate
) => {
  const changedState = {
    age: alivePirate.age + tick,
    health:
      state.health > alivePirate.boat.totalHealth
        ? alivePirate.boat.totalHealth
        : state.health,
    gold: alivePirate.gold + state.gold,
    energy:
      state.energy > alivePirate.energy ? alivePirate.energy : state.energy,
    moral: state.moral > alivePirate.moral ? alivePirate.moral : state.moral,
  };
  const asyncFunc = async () => {
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
    setUpdate(!update);
  };
  asyncFunc();
};

export const udpatePirateAfterLoss = (
  user,
  alivePirate,
  chosenMap,
  update,
  setUpdate
) => {
  const asyncFunc = async () => {
    await fetch(
      `/pirate/remove/treasuremap/${user._id}/${alivePirate.pirateId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chosenMap),
      }
    );
    await fetch(
      `/pirate/removeDeadPirate/${user._id}/${alivePirate.pirateId}`,
      {
        method: "PATCH",
      }
    );
    setUpdate(!update);
  };
  asyncFunc();
};

export const checkIfLost = (state) => {
  const values = Object.values(state);
  const keys = Object.keys(state);

  const result = values.filter((value) => {
    return Math.sign(value) !== 1;
  });
  let reason = "";

  values.forEach((value, index) => {
    if (value === result[0]) {
      reason = keys[index];
    }
  });
  if (result.length > 0) {
    return reason;
  }
};

export const newCheckIfLost = (statsState, choice, scurvy, cursed) => {
  let values = Object.values(statsState);
  let keys = Object.keys(statsState);
  keys = keys.filter((key) => typeof statsState[key] === "number");
  values = values.filter((value) => typeof value === "number");

  const result = keys.filter((key, index) => {
    let check;
    if (key === "moral" && cursed) {
      check = values[index] + choice[key] - 5;
    } else if (key === "health" && scurvy) {
      check = values[index] + choice[key] - 10;
    } else {
      check = values[index] + choice[key];
    }
    return Math.sign(check) !== 1;
  });

  if (result.length > 0) {
    return result[0];
  }
};

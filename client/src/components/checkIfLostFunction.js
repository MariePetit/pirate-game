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

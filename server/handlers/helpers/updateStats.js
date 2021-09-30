const updateStats = (pirate, stats) => {
  Object.keys(stats).forEach((key) => {
    if (key === "health") {
      pirate.boat[key] = stats[key];
    } else {
      pirate[key] = stats[key];
    }
  });

  return pirate;
};

module.exports = { updateStats };

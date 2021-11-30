const eventCardStructure = {
  name: "",
  description: "",
  leftChoice: {
    text: "",
    gold: 0,
    moral: 0,
    health: 0,
    energy: 0,
  },
  rightChoice: {
    text: "",
    gold: 0,
    moral: 0,
    health: 0,
    energy: 0,
  },
  image: "",
};

const checkCardValues = (type, data) => {
  // checks for the type of card we are trying to add and looks at what the minimum amount of value is needed
  // for each of them.
  //returns true or false depending if it passes.
  switch (type) {
    case "eventCards": {
      const structureArray = Object.keys(eventCardStructure);

      return structureArray.every((key) => {
        return data[key];
      });
    }
    case "endCards": {
      return false;
    }
  }
};

module.exports = { eventCardStructure, checkCardValues };

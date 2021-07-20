const PirateChangesObjectCreator = (changes) => {
  let NewPirateObject = {};
  const keysOfChanges = Object.keys(changes);
  Object.values(changes).forEach((value, index) => {
    if (value !== null) {
      NewPirateObject[keysOfChanges[index]] = value;
    }
  });

  return NewPirateObject;
};

module.exports = { PirateChangesObjectCreator };

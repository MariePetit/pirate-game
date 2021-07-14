const { v4: uuidv4 } = require("uuid");

const { eventCards, endCards } = require("../Cards");

const getAllCards = (req, res) => {
  const newEventCards = eventCards.map((card) => {
    return { ...card, id: uuidv4() };
  });

  const newEndCards = endCards.map((card) => {
    return { ...card, id: uuidv4() };
  });

  res.status(200).json({
    status: 200,
    data: { eventCards: newEventCards, endCards: newEndCards },
    message: "grabbed all cards",
  });
};

module.exports = { getAllCards };

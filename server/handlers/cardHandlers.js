const { v4: uuidv4 } = require("uuid");

const { eventCards, endCards, SpecialCasesCards } = require("../Cards");

const getAllCards = (req, res) => {
  const newEventCards = eventCards.map((card) => {
    return { ...card, id: uuidv4() };
  });

  const newEndCards = endCards.map((card) => {
    return { ...card, id: uuidv4() };
  });

  res.status(200).json({
    status: 200,
    data: {
      eventCards: newEventCards,
      endCards: newEndCards,
      SpecialCasesCards,
    },
    message: "grabbed all cards",
  });
};

module.exports = { getAllCards };

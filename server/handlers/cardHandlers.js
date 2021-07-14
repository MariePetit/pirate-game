const { eventCards, endCards } = require("../Cards");

const getAllCards = (req, res) => {
  res
    .status(200)
    .json({
      status: 200,
      data: { eventCards, endCards },
      message: "grabbed all cards",
    });
};

module.exports = { getAllCards };

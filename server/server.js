const express = require("express");
const morgan = require("morgan");

const { getAllCards } = require("./handlers/cardHandlers");

const PORT = 8000;

express()
  .use(morgan("dev"))

  //getting all cards
  .get(`/cards`, getAllCards)

  .listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });

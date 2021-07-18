const express = require("express");
const morgan = require("morgan");

const { getAllCards } = require("./handlers/cardHandlers");
const { CreateUser, GetUserById } = require("./handlers/userHandlers");

const PORT = 8000;

express()
  .use(morgan("dev"))
  .use(express.json())

  //GET - getting all cards
  .get(`/cards`, getAllCards)
  //GET -getting user by id
  .get("/user/:_id", GetUserById)
  //POST - creating a new user
  .post(`/user`, CreateUser)

  .listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });

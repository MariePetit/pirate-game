const express = require("express");
const morgan = require("morgan");

const { getAllCards } = require("./handlers/cardHandlers");
const {
  AddNewPirate,
  ChangePirateStats,
  ManageCrewMates,
} = require("./handlers/piratehandler");
const {
  EditUserById,
  CreateUser,
  GetUserById,
  GetAllUsers,
  FakeRemoveUser,
  RealRemoveUser,
  AccountRecovery,
} = require("./handlers/userHandlers");

const PORT = 8000;

express()
  .use(morgan("dev"))
  .use(express.json())

  //GET - getting all cards
  .get(`/cards`, getAllCards)

  //GET - getting all users
  .get(`/users`, GetAllUsers)
  //GET -getting user by id
  .get("/user/:_id", GetUserById)
  //POST - creating a new user
  .post(`/user`, CreateUser)
  //PATCH - recovering fake deleted account
  .patch(`/user/key/:key`, AccountRecovery)
  //PATCH - fake delete/restore of an account
  .patch(`/user/delete/:_id`, FakeRemoveUser)
  //PATCH - edit user information
  .patch(`/user/:_id`, EditUserById)
  //DELETE - real account deletion
  .delete(`/user/:_id/key/:key`, RealRemoveUser)

  //PUT - adds a new pirate to the pirates array of that user
  .put(`/pirate/:_id`, AddNewPirate)
  //PATCH - change the pirate's stats
  .patch(`/pirate/stats/:_id/pirateId/:pirateId`, ChangePirateStats)
  //PATCH - adding/removing crew mates
  .patch(`/pirate/newCrewMate/:_id/pirateId/:pirateId`, ManageCrewMates)

  .listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });

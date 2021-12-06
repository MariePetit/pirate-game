const express = require("express");
const morgan = require("morgan");

const { getAllCards, addACard } = require("./handlers/cardHandlers");
const {
  AddNewPirate,
  ChangePirateStats,
  ManageCrewMates,
  AddTreasureMap,
  RemoveTreasureMap,
  UpdatePirateAfterWin,
  RemoveDeadPirate,
} = require("./handlers/piratehandler");
const {
  EditUserById,
  CreateUser,
  GetUserById,
  GetAllUsers,
  FakeRemoveUser,
  RealRemoveUser,
  AccountRecovery,
  getUserByLogin,
} = require("./handlers/userHandlers");

const PORT = 8000;

express()
  .use(morgan("dev"))
  .use(express.json())

  //GET - getting all cards
  .get(`/cards`, getAllCards)
  //PUT - create a new card
  .put(`/cards/:cardType`, addACard)
  //GET - getting all users
  .get(`/users`, GetAllUsers)
  //GET -getting user by id
  .get("/user/:_id", GetUserById)
  //GET -get user by login info
  .get("/user/userName/:userName/password/:password", getUserByLogin)
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

  .patch(`/pirate/add/treasuremap/:_id/:pirateId`, AddTreasureMap)

  .patch(`/pirate/remove/treasuremap/:_id/:pirateId`, RemoveTreasureMap)

  .patch(`/pirate/winTripUpdate/:_id/:pirateId`, UpdatePirateAfterWin)

  .patch(`/pirate/removeDeadPirate/:_id/:pirateId`, RemoveDeadPirate)

  .listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { randomBoatName } = require("../randomBoatName");
const { randomPirateName } = require("../randomCaptainName");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const CreateUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const _id = uuidv4();
    const joined = new Date();
    const friends = [];
    const pirates = [];
    const pirate = {
      name: req.body.pirateName ? req.body.pirateName : randomPirateName(),
      avatarSrc: "",
      treasureMap: [],
      moral: 100,
      energy: 100,
      boat: {
        boatName: req.body.boatName ? req.body.boatName : randomBoatName(),
        crew: [],
        health: 75,
        customizations: [],
      },
      gold: 0,
      age: 0,
      isDead: false,
    };

    pirates.push(pirate);
    const newUser = {
      _id,
      joined,
      friends,
      pirates,
    };

    const db = client.db("Pirate-Looter");

    const results = await db.collection("users").insertOne({ ...newUser });
    assert(_id, results.insertedId);

    return res.status(200).json({
      status: 200,
      data: { ...newUser },
      message: "New user created.",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, data: { ...newUser }, message: err });
  }

  client.close();
  console.log("disconnected");
};

const GetUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const db = client.db("Pirate-Looter");

    const result = await db
      .collection("users")
      .findOne({ _id: req.params._id });

    if (result) {
      return res
        .status(202)
        .json({ status: 202, data: result, message: "user found" });
    } else {
      return res.status(404).json({
        status: 404,
        data: req.params._id,
        message: "No user found at the given id",
      });
    }
  } catch (err) {
    res.status(400).json({ status: 400, data: err, message: "uh oh" });
  }

  client.close();
  console.log("disconnected");
};

module.exports = { CreateUser, GetUserById };

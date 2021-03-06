const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { randomBoatName } = require("./helpers/randomBoatName");
const { randomPirateName } = require("./helpers/randomCaptainName");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const RealRemoveUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");
  const { _id, key } = req.params;
  try {
    const query = { _id, recoveryKey: key };
    const db = client.db("Pirate-Looter");

    const result = await db.collection("users").deleteOne({ ...query });
    assert.strictEqual(1, result.deletedCount);
    res.status(200).json({
      status: 200,
      data: result,
      message: "user has been permanently deleted.",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: err,
      message: "something went wrong. This account might already be deleted.",
    });
  }

  client.close();
  console.log("disconnected");
};

const FakeRemoveUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const { _id } = req.params;
    const db = client.db("Pirate-Looter");

    const recoveryKey = `${_id}-${uuidv4()}`;
    const newValue = { $set: { accountDeleted: true, recoveryKey } };
    const query = { _id };

    const result = await db.collection("users").updateOne(query, newValue);
    assert.strictEqual(1, result.modifiedCount);

    return res.status(200).json({
      status: 200,
      data: recoveryKey,
      message: "account has been deleted.",
    });
  } catch (err) {
    console.log(err);
    const { _id } = req.params;
    res.status(404).json({
      status: 404,
      error: err,
      data: _id,
      message: "user does not exist or is already deleted.",
    });
  }

  client.close();
  console.log("disconnected");
};

const AccountRecovery = async (req, res) => {
  const { key } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  console.log("connected");

  try {
    const db = client.db("Pirate-Looter");

    const query = { recoveryKey: key };
    const newValue = { $set: { accountDeleted: false, recoveryKey: false } };

    const result = await db.collection("users").updateOne(query, newValue);
    assert.strictEqual(1, result.modifiedCount);
    res.status(202).json({
      status: 202,
      data: result.document,
      message: "account recovered. you no longer need the recovery key.",
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: 404, data: err, message: "no account found" });
  }

  client.close();
  console.log("disconnected");
};

const CreateUser = async (req, res) => {
  const { firstName, lastName, email, userName, password, avatarSrc } =
    req.body;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const _id = uuidv4();
    const joined = new Date();
    const friends = [];
    const pirates = [];
    const pirate = {
      pirateId: uuidv4(),
      name: req.body.pirateName ? req.body.pirateName : randomPirateName(),
      avatarSrc: "",
      treasureMaps: [],
      moral: 100,
      totalMoral: 100,
      energy: 100,
      totalEnergy: 100,
      boat: {
        boatName: req.body.boatName ? req.body.boatName : randomBoatName(),
        crew: [],
        level: 1,
        crewSize: 2,
        health: 75,
        totalHealth: 75,
        customizations: [],
      },
      gold: Math.round(Math.random() * 50 + 50),
      age: 0,
      isDead: false,
      tutorials: { merchant: true, pirate: true, game: true },
    };

    pirates.push(pirate);
    const newUser = {
      _id,
      firstName,
      lastName,
      email,
      userName,
      password,
      avatarSrc,
      joined,
      friends,
      pirates,
    };

    const db = client.db("Pirate-Looter");

    const results = await db.collection("users").insertOne({ ...newUser });
    assert(_id, results.insertedId);

    return res.status(201).json({
      status: 201,
      data: { ...newUser },
      message: "New user created.",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, data: { ...newUser }, message: err });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const GetAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const db = client.db("Pirate-Looter");

    const results = await db.collection("users").find().toArray();

    results.length > 0
      ? res.status(200).json({ status: 200, data: results })
      : res.status(404).json({ status: 404, data: results });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected");
  }
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
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const EditUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;
  const { firstName, lastName, email, userName, password, avatarSrc } =
    req.body;

  await client.connect();
  console.log("connected");

  try {
    const db = client.db("Pirate-Looter");
    const user = await db.collection("users").findOne({ _id });
    const query = { _id };
    const newValue = {
      $set: {
        firstName: `${firstName ? firstName : user.firstName}`,
        lastName: `${lastName ? lastName : user.lastName}`,
        email: `${email ? email : user.email}`,
        userName: `${userName ? userName : user.userName}`,
        password: `${password ? password : user.password}`,
        avatarSrc: `${avatarSrc ? avatarSrc : user.avatarSrc}`,
      },
    };
    await db.collection("users").updateOne(query, newValue);
    res
      .status(200)
      .json({ status: 200, data: newValue, message: "changes made!" });
  } catch (err) {
    console.log(`SOMETHING WENT TERRIBLY WRONG--- ${err}`);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const getUserByLogin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const { userName, password } = req.params;
    const db = client.db("Pirate-Looter");

    const result = await db.collection("users").findOne({ userName, password });
    if (result.userName) {
      return res.status(202).json({ status: 202, data: result });
    } else {
      res.status(404).json({ status: 404, message: "user not found." });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong..." });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const toggleTutorial = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const { type, value } = req.body;
    const { _id } = req.params;
    const db = client.db("Pirate-Looter");

    const results = await db
      .collection("users")
      .updateOne({ _id }, { $set: { [`tutorials.${type}`]: !value } });
    results.modifiedCount > 0 &&
      res
        .status(200)
        .json({ status: 200, message: `${type} was changed to ${!value}` });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      err,
    });
  } finally {
    client.close();
    console.log("disconnect");
  }
};

module.exports = {
  EditUserById,
  CreateUser,
  GetAllUsers,
  GetUserById,
  FakeRemoveUser,
  RealRemoveUser,
  AccountRecovery,
  getUserByLogin,
  toggleTutorial,
};

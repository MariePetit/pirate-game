const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { randomPirateName } = require("./helpers/randomCaptainName");
const { randomBoatName } = require(`./helpers/randomBoatName`);
const { updateStats } = require("./helpers/updateStats");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const AddNewPirate = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  console.log("connected");

  try {
    const { _id } = req.params;
    const { name, boatName } = req.body;
    const db = client.db("Pirate-Looter");

    const user = await db.collection("users").findOne({ _id });

    // small check to see if the pirates in the pirates Array are all dead.
    if (user.pirates.every((pirate) => pirate.isDead === true)) {
      const newPirate = {
        pirateId: uuidv4(),
        name: `${name ? name : randomPirateName()}`,
        avatarSrc: `randomPic`,
        treasureMaps: [],
        moral: 100,
        totalMoral: 100,
        energy: 100,
        totalEnergy: 100,
        boat: {
          boatName: boatName ? boatName : randomBoatName(),
          crew: [],
          level: 1,
          crewSize: 2,
          health: 75,
          totalHealth: 75,
          customizations: [],
        },
        gold: 0,
        age: 0,
        isDead: false,
      };

      const query = { _id };
      const newValue = { $addToSet: { pirates: newPirate } };
      const result = await db.collection("users").updateOne(query, newValue);
      assert.strictEqual(1, result.modifiedCount);
      return res.status(200).json({
        status: 200,
        data: newPirate,
        message: "New Pirate has been created",
      });
    } else {
      const alivePirate = user.pirates.filter((pirate) => {
        return pirate.isDead === false;
      });
      return res.status(400).json({
        status: 400,
        data: alivePirate,
        message: " pirate still alive, can't create a new one yet.",
      });
    }
  } catch (err) {
    console.log(`ERROR`, err);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const ChangePirateStats = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  const { newStats } = req.body;
  const { _id, pirateId } = req.params;

  try {
    const db = client.db("Pirate-Looter");

    const user = await db.collection("users").findOne({ _id });

    let pirate = user.pirates.filter(
      (pirate) => pirate.pirateId === pirateId
    )[0];
    const updatedPirate = updateStats(pirate, newStats);

    await db
      .collection("users")
      .updateOne(
        { _id, "pirates.pirateId": pirateId },
        { $set: { "pirates.$": updatedPirate } }
      );

    res
      .status(200)
      .json({ message: "update successful! ", data: updatedPirate });
  } catch (err) {
    console.log("ERROR", err);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const ManageCrewMates = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  const { _id } = req.params;
  const { crewMate, action } = req.body;

  try {
    const db = client.db("Pirate-Looter");

    const user = await db.collection("users").findOne({ _id });
    const alivePirate = user.pirates.filter((pirate) => !pirate.isDead)[0];
    let query;
    let newValue;
    let options;
    let message;
    switch (action) {
      case "adding": {
        crewMate._id = uuidv4();
        newValue = {
          $set: {
            "pirates.$[pirateId].totalMoral":
              Number(alivePirate.totalMoral) + Number(crewMate.moral),
            "pirates.$[pirateId].totalEnergy":
              Number(alivePirate.totalEnergy) + Number(crewMate.energy),
          },
          $addToSet: { "pirates.$[pirateId].boat.crew": crewMate },
        };
        options = { arrayFilters: [{ "pirateId.isDead": false }] };
        query = { _id };
        message = `added ${crewMate.name} to the Crew!`;

        break;
      }
      case "removing": {
        newValue = {
          $set: {
            "pirates.$[pirateId].totalMoral":
              Number(alivePirate.totalMoral) - Number(crewMate.moral),
            "pirates.$[pirateId].totalEnergy":
              Number(alivePirate.totalEnergy) - Number(crewMate.energy),
          },
          $pull: { "pirates.$[pirateId].boat.crew": { ...crewMate } },
        };
        options = { arrayFilters: [{ "pirateId.isDead": false }] };
        message = `removed ${crewMate.name} from the Crew!`;
        query = { _id };

        break;
      }
    }

    const result = await db
      .collection("users")
      .updateOne(query, newValue, options);

    console.log("MODIFIED---", result.modifiedCount);

    res.status(200).json({ status: 200, data: crewMate, message });
  } catch (err) {
    console.log("ERROR---", err);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const RemoveDeadPirate = async (req, res) => {
  const { _id, pirateId } = req.params;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const query = { _id, "pirates.pirateId": pirateId };
    const newValue = { $set: { "pirates.$.isDead": true } };

    const db = client.db("Pirate-Looter");

    const result = await db.collection("users").updateOne(query, newValue);

    if (result.modifiedCount === 1) {
      res
        .status(202)
        .json({ status: 202, message: "pirate is no longer alive" });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "something happened internally",
      error: err,
    });
  } finally {
    client.close();
  }
};

const AddTreasureMap = async (req, res) => {
  const { _id, pirateId } = req.params;
  const { map, newGold } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  console.log("connected");

  try {
    const query = { _id, "pirates.pirateId": pirateId };
    const newValue = {
      $push: {
        "pirates.$.treasureMaps": { ...map, _id: uuidv4() },
      },
      $set: {
        "pirates.$.gold": newGold,
      },
    };
    const db = client.db("Pirate-Looter");

    const result = await db.collection("users").updateOne(query, newValue);

    if (result.matchedCount > 0) {
      res.status(200).json({
        status: 200,
        message: "added map!",
        data: result.modifiedCount,
      });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "something went wrong.", data: result });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const RemoveTreasureMap = async (req, res) => {
  const { _id, pirateId } = req.params;
  const map = req.body;
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  console.log("connected");

  try {
    const query = { _id, "pirates.pirateId": pirateId };
    const newValue = {
      $pull: { "pirates.$.treasureMaps": map },
    };
    const db = client.db("Pirate-Looter");

    const result = await db.collection("users").updateOne(query, newValue);

    if (result.matchedCount > 0) {
      res.status(200).json({
        status: 200,
        message: "removed map!",
        data: result.modifiedCount,
      });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "something went wrong.", data: result });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const UpdatePirateAfterWin = async (req, res) => {
  const { _id, pirateId } = req.params;
  const { age, gold, energy, moral, health } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  console.log("connected");

  try {
    const db = client.db("Pirate-Looter");
    const query = { _id, "pirates.pirateId": pirateId };
    const newValues = {
      $set: {
        "pirates.$.age": age,
        "pirates.$.gold": gold,
        "pirates.$.energy": energy,
        "pirates.$.moral": moral,
        "pirates.$.boat.health": health,
      },
    };

    const result = await db.collection("users").updateOne(query, newValues);

    console.log(result.modifiedCount, result.matchedCount);

    res.status(200).json({ status: 200, message: "changed successfully" });
  } catch (err) {
  } finally {
    client.close();
    console.log("disconnected");
  }
};

module.exports = {
  AddNewPirate,
  ChangePirateStats,
  ManageCrewMates,
  RemoveDeadPirate,
  AddTreasureMap,
  RemoveTreasureMap,
  UpdatePirateAfterWin,
};

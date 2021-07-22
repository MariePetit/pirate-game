const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { randomPirateName } = require("./helpers/randomCaptainName");
const { randomBoatName } = require(`./helpers/randomBoatName`);
const {
  PirateChangesObjectCreator,
} = require("./helpers/PirateStatsFunctions");

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
        energy: 100,
        boat: {
          boatName: boatName ? boatName : randomBoatName(),
          crew: [],
          health: 75,
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

  const { moral, energy, health, gold, age, isDead } = req.body;
  const { _id } = req.params;

  try {
    const db = client.db("Pirate-Looter");

    const query = { _id };
    const newValue = { $update: { pirates: health } };

    const result = await db.collection("users").updateOne(query, newValue);
    console.log("RESULT", result);
    res.status(200).json({ message: "hello :) " });
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

  const { _id, pirateId } = req.params;
  const { crewMate, action } = req.body;

  try {
    const db = client.db("Pirate-Looter");
    let query;
    let newValue;
    let options;
    let message;
    switch (action) {
      case "adding": {
        newValue = { $addToSet: { "pirates.$[pirateId].boat.crew": crewMate } };
        options = { arrayFilters: [{ "pirateId.isDead": false }] };
        query = { _id };
        message = `added ${crewMate.name} to the Crew!`;
        break;
      }
      case "removing": {
        newValue = {
          $pull: { "pirates.$[pirateId].boat.crew": { name: crewMate } },
        };
        options = { arrayFilters: [{ "pirateId.isDead": false }] };
        query = { _id };

        break;
      }
      case "stat-change": {
        // BAD CODE. BREAKS THE CREW ARRAY
        // newValue = {
        //   $set: {
        //     "pirates.$[pirateId].boat.crew": [{ energy: crewMate.energy }],
        //   },
        // };
        // options = {
        //   arrayFilters: [{ "pirateId.isDead": false }],
        // };
        // query = {
        //   _id,
        //   "pirates.pirateId": pirateId,
        // };

        break;
      }
    }

    const result = await db
      .collection("users")
      .updateOne(query, newValue, options);
    console.log("MODIFIED ---", result.modifiedCount);
    console.log("FOUND ---", result.matchedCount);

    res.status(200).json({ status: 200, data: crewMate, message, result });
  } catch (err) {
    console.log("ERROR---", err);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

module.exports = {
  AddNewPirate,
  ChangePirateStats,
  ManageCrewMates,
};

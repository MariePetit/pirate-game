const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;

const {
  eventCardStructure,
  checkCardValues,
} = require(`./helpers/cardStructures`);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addACard = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const { cardType } = req.params;
  try {
    const db = client.db("Pirate-Looter");

    if (checkCardValues(cardType, req.body)) {
      // if the function runs and all the right keys have values in the req.body
      // it will create the card.
      await db.collection(cardType).insertOne({
        _id: uuidv4(),
        ...req.body,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "required field missing",
      });
    }

    res.status(202).json({
      status: 202,
      message: `added the ${req.body.name} card to the collection!`,
      data: req.body,
    });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getAllCards = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("Pirate-Looter");

    const eventCards = await db.collection("eventCards").find().toArray();
    const endCards = await db.collection("endCards").find().toArray();
    res.status(200).json({
      status: 200,
      data: {
        eventCards,
        endCards,
      },
      message: "grabbed all cards",
    });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

module.exports = { getAllCards, addACard };

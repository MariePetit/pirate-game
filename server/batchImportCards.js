const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { eventCards, endCards } = require("./Cards");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async (batch, name) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  try {
    batch.map((element) => (element._id = uuidv4()));
    const filteredBatch = batch.filter(
      (element) => element.name !== "cardName"
    );
    const db = client.db("Pirate-Looter");

    await db.collection(name).insertMany(filteredBatch);
  } catch (err) {
    console.log("CAP WE GOT AN ERROR", err);
  } finally {
    client.close();
  }
};

batchImport(endCards, "endCards");

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//last used to add the tutorial object
const batchEdit = async () => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("Pirate-Looter");

  await db
    .collection("users")
    .updateMany(
      {},
      { $set: { tutorials: { merchant: true, pirate: true, game: true } } }
    );

  client.close();
};

batchEdit();

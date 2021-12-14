const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { eventCards, endCards } = require("./Cards");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const newCard = [
  {
    name: "Privateers",
    description:
      "A boat approaches with a privateers flag. They have a big crew and a bigger Cannon.",
    leftChoice: {
      text: "Deploy the sails and go as fast as you can!!",
      gold: 0,
      moral: +10,
      health: -30,
      energy: -30,
    },
    rightChoice: {
      text: "Try to sweet talk your way out of this.",
      gold: 0,
      moral: 0,
      health: 0,
      energy: -10,
      useSecondAction: true,
    },
    secondAction: {
      items: [
        {
          name: "Go on...",
          description:
            "The privateers listened for a few sentences and decided payement was still due.",
          leftChoice: {
            text: "Accept and pay the toll.",
            gold: -30,
            moral: -10,
            health: 0,
            energy: 0,
          },
          rightChoice: {
            text: "Accept and pay the toll.",
            gold: -30,
            moral: -10,
            health: 0,
            energy: 0,
          },
          image:
            "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/003-receipt.png",
        },
        {
          name: "Everything checks out.",
          description:
            "The privateers listened and realized they had the wrong guy and give you a fist pump as they leave.",
          leftChoice: {
            text: "I'm the sweetest talker in all the 7 seas!",
            gold: 0,
            moral: 15,
            health: 0,
            energy: 0,
          },
          rightChoice: {
            text: "I'm the sweetest talker in all the 7 seas!",
            gold: 0,
            moral: 15,
            health: 0,
            energy: 0,
          },
          image:
            "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/002-fist-bump.png",
        },
        {
          name: "What the What?!",
          description:
            "The privateers seems so confused by all of what you said. They end up giving you money and apologizing!",
          leftChoice: {
            text: "That's called respect!",
            gold: 20,
            moral: 0,
            health: 0,
            energy: 0,
          },
          rightChoice: {
            text: "That's called respect!",
            gold: 20,
            moral: 0,
            health: 0,
            energy: 0,
          },
          image:
            "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/001-coin.png",
        },
      ],
    },
    image:
      "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/012-pirate-2.png",
  },
];

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
  } finally {
    client.close();
  }
};

batchImport(newCard, "eventCards");

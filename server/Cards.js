const eventCards = [
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Whirlpools",
    description:
      "One of your crew mates notices a small spiral forming in the water. 'WHIRLPOOOOLS!!!' he shouts. ",
    leftChoice: {
      text: "Dogde, Duck, Dip, Dive and Dodge the whirlpools.",
      gold: 0,
      moral: 10,
      health: -20,
      energy: -30,
    },
    rightChoice: {
      text: "Go the long way around. Like a wise Captain should.",
      gold: 0,
      moral: -10,
      health: 0,
      energy: -30,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Kraken Encounter",
    description:
      "The sea splits open and your boat trembles as you see giant tentacles grasp your ship. In the Krakens eyes, you seem to see it seeks something.",
    leftChoice: {
      text: "Give up some gold.",
      gold: -20,
      moral: 20,
      health: -10,
      energy: 0,
    },
    rightChoice: {
      text: "Give up a crew mate.",
      gold: 0,
      moral: -20,
      health: -30,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Storm",
    description:
      "What started as a few drops has now evolved into a whirlwind of rain and ocean.Your crew is soaking wet but listening for your orders.",
    leftChoice: {
      text: "Go wait below deck. It's quiet crowded here.",
      gold: 0,
      moral: -10,
      health: 0,
      energy: 10,
    },
    rightChoice: {
      text: "Power through like the mighty Pirates you are!",
      gold: 0,
      moral: 10,
      health: 0,
      energy: -20,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Floating Object",
    description:
      " While removing one of the barnacles from the ship. A crew mate notices a floating object. ",
    leftChoice: {
      text: "Reel it in.",
      gold: 0,
      moral: 0,
      health: 0,
      energy: -10,
      useSecondAction: true,
    },
    rightChoice: {
      text: "Keep sailing",
      gold: 0,
      moral: -10,
      health: 0,
      energy: 0,
    },
    secondAction: {
      items: [
        {
          name: "Keg of Rhum",
          description:
            "As you pull the object over. Your crew grins from ear to ear! It is a great day to be a pirate!",
          leftChoice: {
            text: "Pirate's life for me!",
            gold: 0,
            moral: 30,
            health: -10,
            energy: -10,
          },
          rightChoice: {
            text: "Pirate's life for me!",
            gold: 0,
            moral: 30,
            health: -10,
            energy: 0,
          },
        },
        {
          name: "Box of Oranges",
          type: "oranges",
          description:
            "Vitamin C is nothing to scoff at. Everyone eats a few and feels much better. ",
          leftChoice: {
            text: "Yummy",
            gold: 0,
            moral: 0,
            health: 30,
            energy: 20,
          },
          rightChoice: {
            text: "Yummy",
            gold: 0,
            moral: 0,
            health: 30,
            energy: 20,
          },
        },
        {
          name: "Poutch of Gold",
          description:
            "Faint clinging of the coins as you reel it in. This trip is already a success!",
          leftChoice: {
            text: "HAR HAR!",
            gold: 20,
            moral: 0,
            health: 0,
            energy: 0,
          },
          rightChoice: {
            text: "HAR HAR!",
            gold: 20,
            moral: 0,
            health: 0,
            energy: 0,
          },
        },
        {
          name: "Letters",
          description:
            "While opening the barrel, lost letters start pouring out. Too wet to read.",
          leftChoice: {
            text: "ok",
            gold: 0,
            moral: 0,
            health: 0,
            energy: 0,
          },
          rightChoice: {
            text: "ok",
            gold: 0,
            moral: 0,
            health: 0,
            energy: 0,
          },
        },
        {
          name: "Clothes",
          description:
            "A tightly closed box is pried open, showing leather clothes. The crew will sleep in the warmth tonight!",
          leftChoice: {
            text: "finally, some warmth",
            gold: 0,
            moral: 0,
            health: 0,
            energy: 30,
          },
          rightChoice: {
            text: "finally, some warmth",
            gold: 0,
            moral: 0,
            health: 0,
            energy: 30,
          },
        },
        {
          name: "Cursed Skull",
          description:
            "As you pry open the box a cold wind goes down your spine, your crew loose determination to carry on...",
          leftChoice: {
            text: "Spooky",
            gold: 0,
            moral: -30,
            health: 0,
            energy: 0,
          },
          rightChoice: {
            text: "Spooky",
            gold: 0,
            moral: -30,
            health: 0,
            energy: 0,
          },
        },
        {
          name: "Music Box",
          description:
            "Dripping with water but still managing to work, one crew mate spins it up and everyone has a little dance.",
          leftChoice: {
            text: "*dances*",
            gold: 0,
            moral: 30,
            health: 0,
            energy: 0,
          },
          rightChoice: {
            text: "*dances*",
            gold: 0,
            moral: 30,
            health: 0,
            energy: 0,
          },
        },
        {
          name: "Spoil Food",
          description:
            "One of the crew fancy's himself a cook and convices everyone to eat the spoiled remains... what ever it was.",
          leftChoice: {
            text: "*pukes*",
            gold: 0,
            moral: -10,
            health: -20,
            energy: 0,
          },
          rightChoice: {
            text: "*pukes*",
            gold: 0,
            moral: -10,
            health: -20,
            energy: 0,
          },
        },
        {
          name: "Sea Monkey",
          description:
            "Once the box dropped on deck it breaks and spills with water, a Sea Monkey jumps at your gold poutch and leaps into the sea with it.",
          leftChoice: {
            text: "Oh no!",
            gold: -20,
            moral: 0,
            health: 0,
            energy: 0,
          },
          rightChoice: {
            text: "Oh no!",
            gold: -20,
            moral: 0,
            health: 0,
            energy: 0,
          },
        },
        {
          name: "Fresh Wood",
          description:
            "This must not of been floating for long! Let's use it to repair the ship!",
          leftChoice: {
            text: "Fix it!",
            gold: 0,
            moral: 0,
            health: 10,
            energy: 0,
          },
          rightChoice: {
            text: "Fix it!",
            gold: 0,
            moral: 0,
            health: 10,
            energy: 0,
          },
        },
      ],
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Peaceful voyage",
    description:
      "The sea is calm and so are the skies. Sails in the wind, everything is going well. A sailors life for us!",
    leftChoice: {
      text: "Excellent!",
      gold: 0,
      moral: 10,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "Excellent",
      gold: 0,
      moral: 10,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Boat Leak",
    description:
      "The ship suddenly gets a loud thud on the bottom of it. Then faint running water. A small leak has sprung!",
    leftChoice: {
      text: "Repair it at once!",
      gold: 0,
      moral: 0,
      health: -10,
      energy: -20,
    },
    rightChoice: {
      text: "A small leak never bothered anyone.",
      gold: 0,
      moral: -20,
      health: -20,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Pirates",
    description:
      "A boat is a approaching and you can see by the flag! They are Pirates and they are looking for trouble!",
    leftChoice: {
      text: "Give them gold and keep going. ",
      gold: -30,
      moral: -20,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "Refuse to pay and fight!",
      gold: 0,
      moral: +10,
      health: -20,
      energy: -20,
    },
    image: "this will be where we put the image sprite for the card",
  },
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
      secondChoices: {
        name: "Go on...",
        description:
          "The privateers listened for a few sentences and decided payement was still due.",
        leftChoice: {
          text: "Accept and pay the toll.",
          gold: -40,
          moral: -20,
          health: 0,
          energy: 0,
        },
        rightChoice: {
          text: "Dance around to pay less taxes.",
          gold: -10,
          moral: -10,
          health: 0,
          energy: -20,
        },
      },
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Davy Jones",
    description:
      "An old beaten up ship appears in the horizon... It seems to be roaming the sea since it's creation.",
    leftChoice: {
      text: "Leave as fast as the crew can row!",
      gold: 0,
      moral: 0,
      health: 0,
      energy: -30,
    },
    rightChoice: {
      text: "Stay put, frozen in fear.",
      gold: 0,
      moral: -30,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Soft Music",
    description:
      "a slight mist settles in and you start to hear a soft singing voice.",
    leftChoice: {
      text: "Investigate!",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
      useSecondAction: true,
    },
    rightChoice: {
      text: "stay on course.",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    secondAction: {
      items: [
        {
          name: "Sirens",
          description:
            "as you get closer to the music, the fog clears and you notice you are in a sirens' nest. They start trying to drag your crew out of the ship!",
          leftChoice: {
            text: "Escape!!",
            gold: 0,
            moral: -20,
            health: -40,
            energy: -20,
          },
          rightChoice: {
            text: "Escape!!",
            gold: 0,
            moral: -20,
            health: -40,
            energy: -20,
          },
        },
        {
          name: "Mermaids",
          description:
            "Your ship get's close to a single rock peaking out of the sea, you sea a beautiful mermaid and your eyes meet. The mermaid jumps and disappears in the ocean.",
          leftChoice: {
            text: "Smile at the rare sighting",
            gold: 0,
            moral: 20,
            health: 0,
            energy: 10,
          },
          rightChoice: {
            text: "Smile at the rare sighting",
            gold: 0,
            moral: 20,
            health: 0,
            energy: 10,
          },
        },
        {
          name: "Manatees",
          description:
            "Your crew is all eager to see the rare mermaids, as you get closer, only giant sea cows are to be seen. You haven't been on land for a long time now.",
          leftChoice: {
            text: "Go back on course, dissapointed",
            gold: 0,
            moral: -20,
            health: 0,
            energy: -20,
          },
          rightChoice: {
            text: "Go back on course, dissapointed",
            gold: 0,
            moral: -20,
            health: 0,
            energy: -20,
          },
        },
      ],
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Scurvy",
    description:
      "Your crew forgot to pack some oranges. After not being at sea for long, your crew now has scurvy! (each turn you will loose health until you find oranges)",
    leftChoice: {
      text: "aaarrrgggg",
      gold: 0,
      moral: 0,
      health: -10,
      energy: 0,
    },
    rightChoice: {
      text: "aaaarrrggggg",
      gold: 0,
      moral: 0,
      health: -10,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Oranges!",
    type: "oranges",
    description:
      "having found a crate of oranges, your crew gulps it down! (removes scurvy) ",
    leftChoice: {
      text: "Vitamns are important!",
      gold: 0,
      moral: 0,
      health: +10,
      energy: 0,
    },
    rightChoice: {
      text: "Vitamins are important!",
      gold: 0,
      moral: 0,
      health: +10,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Oranges!",
    type: "oranges",
    description:
      "having found a crate of oranges, your crew gulps it down! (removes scurvy) ",
    leftChoice: {
      text: "Vitamns are important!",
      gold: 0,
      moral: 0,
      health: +10,
      energy: 0,
    },
    rightChoice: {
      text: "Vitamins are important!",
      gold: 0,
      moral: 0,
      health: +10,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Oranges!",
    type: "oranges",
    description:
      "having found a crate of oranges, your crew gulps it down! (removes scurvy) ",
    leftChoice: {
      text: "Vitamns are important!",
      gold: 0,
      moral: 0,
      health: +10,
      energy: 0,
    },
    rightChoice: {
      text: "Vitamins are important!",
      gold: 0,
      moral: 0,
      health: +10,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "cardName",
    description: "",
    leftChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    rightChoice: {
      text: "",
      gold: 0,
      moral: 0,
      health: 0,
      energy: 0,
    },
    image: "this will be where we put the image sprite for the card",
  },
];

const endCards = [
  {
    name: "Empty Moral",
    type: "moral",
    description:
      "With your crews moral at the complete floor, no one wants to paddle. No one wants to move.This is the end.",
    leftChoice: {
      text: "Ok",
    },
    rightChoice: {
      text: "Ok",
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Full Moral",
    description:
      "Your crew is happy. Too happy... They think you have gone soft and are not fit to be their Pirate Captain. They staged a mutiny and threw you off the ship.",
    leftChoice: {
      text: "how dare they.",
    },
    rightChoice: {
      text: "how dare they.",
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Empty Ship Health",
    type: "health",
    description:
      "Your ship has just took it's last hit. As a good Captain. You are sinking with your beloved.",
    leftChoice: {
      text: "A true pirate's end.",
    },
    rightChoice: {
      text: "A true pirate's end.",
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Empty Energy",
    type: "energy",
    description:
      "As you try to shout at your crew orders. Your throat runs dry and your vision blurs. A loud 'thud' is heard, and you, the captain, never said an other word.",
    leftChoice: {
      text: "walk towards the light",
    },
    rightChoice: {
      text: "walk towards the light",
    },
    image: "this will be where we put the image sprite for the card",
  },
  {
    name: "Yaaarrr broke.",
    type: "gold",
    description:
      " You've managed to loose your last gold coin! With no treasure, your crew turns on you and cuts your career short!",
    leftChoice: {
      text: "Me booty!",
    },
    rightChoice: {
      text: "Me booty!",
    },
    image: "this will be where we put the image sprite for the card",
  },
];

module.exports = { eventCards, endCards };

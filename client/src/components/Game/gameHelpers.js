import { newCheckIfLost } from "./checkIfLostFunction";

// this fires everytime the user clicks on a choice while in the game.
export const handleChoice = (
  choice,
  actions,
  statsState,
  gameState,
  gameDispatch,
  statDispatch
) => {
  const { energy, health, moral, gold } = choice;
  const { scurvy, cursed } = statsState;
  const { tick, tripLength, loot, mapId } = gameState;

  // if the player has scurvy, removes some health and the function
  // CONTINUES
  if (scurvy) {
    actions.receiveChangedStats({
      data: { health: -10, energy: 0, moral: 0, gold: 0 },
      statDispatch,
    });
  }
  // if the player is cursed, removes some moral and the function
  // CONTINUES
  if (cursed) {
    actions.receiveChangedStats({
      data: { health: 0, energy: 0, moral: -5, gold: 0 },
      statDispatch,
    });
  }

  // if the choice has a second action it will fire and set the card to this second action
  // without increasing the amount of days.
  // EXITS
  if (choice.useSecondAction) {
    actions.receiveSecondAction({ gameDispatch });
    actions.receiveChangedStats({
      data: { energy, health, moral, gold },
      statDispatch,
    });
    return;
  }

  // checks if any of the stats go to 0 or below and sets the death reason
  // to what ever stat did it.
  // EXITS
  if (newCheckIfLost(statsState, choice)) {
    actions.receiveChangedStats({
      data: { energy, health, moral, gold },
      statDispatch,
    });
    actions.lostGame({
      data: { lostType: newCheckIfLost(statsState, choice) },
      gameDispatch,
      statDispatch,
    });
    return;
  }

  // win function. If the tick is equal to the length it means the player has won.
  // EXITS
  if (tick === tripLength) {
    actions.receiveChangedStats({
      data: { energy, health, moral, gold },
      statDispatch,
    });
    actions.winGame({ gameDispatch, statDispatch });
    return;
  }

  // treasure function. If the tick is at half the trip length it means they arrived at the treasure.
  //sets the next card to the treasureCard
  // EXITS
  if (tick === Math.floor(tripLength / 2)) {
    actions.setCardToTreasure({
      data: { treasureCard: TreasureMapAdapter(loot, mapId) },
      gameDispatch,
    });
    actions.receiveChangedStats({
      data: { energy, health, moral, gold },
      statDispatch,
    });
    return;
  }

  // switch state that checks if that card removes or add any handicap.
  // applies all the necesarry damage and changes the card
  // EXITS
  switch (choice.type) {
    case "scurvy":
      actions.scurvyToggle({ data: { scurvy: true }, statDispatch });
      actions.receiveChangedStats({
        data: { energy, health, moral, gold },
        statDispatch,
      });
      actions.changeCard({ gameDispatch });
      return;
    case "oranges":
      actions.scurvyToggle({ data: { scurvy: false }, statDispatch });
      actions.receiveChangedStats({
        data: { energy, health, moral, gold },
        statDispatch,
      });
      actions.changeCard({ gameDispatch });
      return;
    case "curse":
      actions.curseToggle({ data: { cursed: true }, statDispatch });
      actions.foundCrewMate({ gameDispatch });
      actions.receiveChangedStats({
        data: { energy, health, moral, gold },
        statDispatch,
      });
      actions.changeCard({ gameDispatch });
      return;
    case "devineSight":
      actions.curseToggle({ data: { cursed: false }, statDispatch });
      actions.receiveChangedStats({
        data: { energy, health, moral, gold },
        statDispatch,
      });
      actions.changeCard({ gameDispatch });
      return;
    default:
      break;
  }

  // endcase where if nothing was triggered simply changes the stats and
  // changes the card.
  actions.receiveChangedStats({
    data: { energy, health, moral, gold },
    statDispatch,
  });
  //changeCard function increases tick by 1
  actions.changeCard({ gameDispatch });
};

export const getRandomCard = (cards) => {
  return cards[Math.floor(Math.random() * cards.length)];
};

export const getEndCard = (cards, type) => {
  return cards.filter((card) => card.type === type)[0];
};

const TreasureMapAdapter = (loot, id) => {
  return {
    name: "Burried Treasure!!",
    id: id,
    description: `X marks the spot! You arrived at the burried treasure and found ${loot} gold!`,
    image:
      "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/treasure.png",
    leftChoice: {
      energy: 0,
      gold: loot,
      health: 0,
      moral: 0,
      text: "Back to Harbor we go!",
    },
    rightChoice: {
      energy: 0,
      gold: loot,
      health: 0,
      moral: 0,
      text: "Back to Harbor we go!",
    },
  };
};

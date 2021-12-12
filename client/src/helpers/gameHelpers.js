import { newCheckIfLost } from "../components/checkIfLostFunction";

export const handleChoice = (
  choice,
  actions,
  statsState,
  gameState,
  gameDispatch,
  statDispatch
) => {
  const { energy, health, moral, gold } = choice;
  const { scurvy, cursed, hasWon, hasLost } = statsState;
  const { tick, tripLength, loot, mapId } = gameState;

  if (hasWon || hasLost) {
    actions.exitGame({
      //need to change this to reset game to original values.
      data: { pushTo: hasWon ? "pirate" : "graveyard" },
      gameDispatch,
      statDispatch,
    });
    return;
  }

  if (scurvy) {
    actions.receiveChangedStats({
      data: { health: -10, energy: 0, moral: 0, gold: 0 },
      statDispatch,
    });
  }
  if (cursed) {
    actions.receiveChangedStats({
      data: { health: 0, energy: 0, moral: -5, gold: 0 },
      statDispatch,
    });
  }

  if (choice.useSecondAction) {
    console.log("second action");
    actions.receiveSecondAction({ gameDispatch });
    actions.receiveChangedStats({
      data: { energy, health, moral, gold },
      statDispatch,
    });
    return;
  }
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

  if (tick === tripLength) {
    actions.receiveChangedStats({
      data: { energy, health, moral, gold },
      statDispatch,
    });
    actions.winGame({ gameDispatch, statDispatch });
    return;
  }
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

  actions.receiveChangedStats({
    data: { energy, health, moral, gold },
    statDispatch,
  });
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

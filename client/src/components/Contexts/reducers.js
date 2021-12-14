import { getEndCard, getRandomCard } from "../../helpers/gameHelpers";
import crewMateGenerator from "../CrewMate/crewMateGenerator";

export const gameReducer = (gameState, action) => {
  switch (action.type) {
    case "receive-cards":
      return {
        ...gameState,
        eventCards: action.eventCards,
        endCards: action.endCards,
      };
    case "receive-game-map":
      return {
        ...gameState,
        tripLength: action.map.tripLength,
        tick: 0,
        loot: action.map.loot,
        mapId: action.map._id,
        chosenMap: action.map,
      };
    case "start-game":
      return {
        ...gameState,
        gameStarted: true,
        singleCard: getRandomCard(gameState.eventCards),
      };
    case "change-card":
      return {
        ...gameState,
        singleCard: getRandomCard(gameState.eventCards),
        tick: gameState.tick + 1,
      };
    case "receive-second-action":
      return {
        ...gameState,
        singleCard: getRandomCard(gameState.singleCard.secondAction.items),
      };
    case "set-card-to-treasure":
      return {
        ...gameState,
        singleCard: action.treasureCard,
        tick: gameState.tick + 1,
      };
    case "win-game":
      return {
        ...gameState,
        singleCard: getEndCard(gameState.endCards, action.winType),
      };
    case "lost-game":
      return {
        ...gameState,
        singleCard: getEndCard(gameState.endCards, action.lostType),
      };
    case "found-crew-mate":
      return {
        ...gameState,
        crewMate: crewMateGenerator(),
      };
    case "reset-game":
      return {
        ...initialGameState,
        eventCards: gameState.eventCards,
        endCards: gameState.endCards,
      };
    default:
      return gameState;
  }
};
export const statReducer = (statsState, action) => {
  switch (action.type) {
    case "receive-game-info":
      return {
        ...statsState,
        moral: action.moral,
        energy: action.energy,
        health: action.health,
        gold: action.gold,
      };
    case "receive-hover-over":
      return {
        ...statsState,
        hoverOver: action.hoverOver,
      };
    case "receive-changed-stats":
      return {
        ...statsState,
        moral: statsState.moral + action.moral,
        energy: statsState.energy + action.energy,
        health: statsState.health + action.health,
        gold: statsState.gold + action.gold,
      };
    case "win-game":
      return {
        ...statsState,
        hasWon: true,
      };
    case "lost-game":
      return {
        ...statsState,
        hasLost: true,
      };
    case "scurvy-toggle":
      return {
        ...statsState,
        scurvy: action.scurvy,
      };
    case "cursed-toggle":
      return {
        ...statsState,
        cursed: action.cursed,
      };
    case "reset-game":
      return {
        ...initialStatsState,
      };
    default:
      return statsState;
  }
};

export const initialGameState = {
  gameStarted: false,
  eventCards: null,
  endCards: null,
  tripLength: null,
  tick: null,
  singleCard: null,
  mapId: null,
  crewMate: false,
  loot: null,
  pushTo: null,
  chosenMap: null,
};
export const initialStatsState = {
  scurvy: false,
  cursed: false,
  hasWon: false,
  hasLost: false,
  gold: null,
  moral: null,
  health: null,
  energy: null,
  hoverOver: "none",
};

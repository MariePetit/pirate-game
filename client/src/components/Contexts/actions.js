//exptected keys { eventCards, endCards }
const receiveCards = ({ data, gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "receive-cards",
    ...data,
  });
};

//expected keys { map }
const receiveGameMap = ({ data, gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "receive-game-map",
    ...data,
  });
};

//expected keys { map , moral , health , energy, gold }
const receiveGameInfo = ({ data, gameDispatch, statDispatch }) => {
  statDispatch({
    type: "receive-game-info",
    ...data,
  });
};

// no data needed
const startGame = ({ gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "start-game",
  });
};

// expected keys { hoverOver }
const receiveHoverOver = ({ data, gameDispatch, statDispatch }) => {
  statDispatch({
    type: "receive-hover-over",
    ...data,
  });
};

// expected keys { moral, gold, health, energy }
const receiveChangedStats = ({ data, gameDispatch, statDispatch }) => {
  statDispatch({
    type: "receive-changed-stats",
    ...data,
  });
};

// no data needed
const changeCard = ({ gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "change-card",
  });
};

// no data needed
const receiveSecondAction = ({ gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "receive-second-action",
  });
};

// expected keys { treasureCard }
const setCardToTreasure = ({ data, gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "set-card-to-treasure",
    ...data,
  });
};

// no data needed
const winGame = ({ gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "win-game",
    winType: "victory",
  });
  statDispatch({
    type: "win-game",
  });
};

// expected keys { lostType }
const lostGame = ({ data, gameDispatch, statDispatch }) => {
  statDispatch({
    type: "lost-game",
  });
  gameDispatch({
    type: "lost-game",
    ...data,
  });
};

const retreatFromGame = ({ data, gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "retreat-from-game",
    ...data,
  });

  statDispatch({
    type: "retreat-from-game",
    ...data,
  });
};
//expected keys { scurvy }
const scurvyToggle = ({ data, gameDispatch, statDispatch }) => {
  statDispatch({
    type: "scurvy-toggle",
    ...data,
  });
};

//expected keys { cursed, crewMate }
const curseToggle = ({ data, gameDispatch, statDispatch }) => {
  statDispatch({
    type: "cursed-toggle",
    ...data,
  });
};

// no data needed
const foundCrewMate = ({ gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "found-crew-mate",
  });
};

// no data needed
const resetGame = ({ gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "reset-game",
  });
  statDispatch({
    type: "reset-game",
  });
};

export const actions = {
  receiveCards,
  startGame,
  receiveHoverOver,
  receiveChangedStats,
  changeCard,
  receiveSecondAction,
  setCardToTreasure,
  winGame,
  lostGame,
  retreatFromGame,
  scurvyToggle,
  curseToggle,
  foundCrewMate,
  resetGame,
  receiveGameInfo,
  receiveGameMap,
};

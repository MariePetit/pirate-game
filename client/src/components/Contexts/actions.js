//exptected keys { eventCards, endCards }
const receiveCards = ({ data, gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "receive-cards",
    ...data,
  });
};

//expected keys { map , moral , health , energy }
const startGame = ({ data, gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "start-game",
    ...data,
  });
  statDispatch({
    type: "start-game",
    ...data,
  });
};

//expected keys { gold }
const setGameGold = ({ data, gameDispatch, statDispatch }) => {
  statDispatch({
    type: "set-game-gold",
    ...data,
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

//expected keys { pushTo }
const exitGame = ({ data, gameDispatch, statDispatch }) => {
  gameDispatch({
    type: "exit-game",
    ...data,
  });
};

export const actions = {
  receiveCards,
  startGame,
  setGameGold,
  receiveHoverOver,
  receiveChangedStats,
  changeCard,
  receiveSecondAction,
  setCardToTreasure,
  winGame,
  lostGame,
  scurvyToggle,
  curseToggle,
  foundCrewMate,
  exitGame,
};

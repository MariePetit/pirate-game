import React, { useReducer, useEffect } from "react";
import { createContext } from "react";

import {
  gameReducer,
  statReducer,
  initialGameState,
  initialStatsState,
} from "./reducers";

import { actions } from "./actions";

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);
  const [statsState, statDispatch] = useReducer(statReducer, initialStatsState);

  //fetches all the cards
  useEffect(() => {
    fetch("/cards").then((res) => {
      res.json().then(({ data }) => {
        let eventCards = data.eventCards.filter((eventCard) => {
          return eventCard.name !== "cardName";
        });
        actions.receiveCards({
          data: { eventCards, endCards: data.endCards },
          gameDispatch,
        });
      });
    });
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        statsState,
        dispatches: {
          gameDispatch,
          statDispatch,
        },
        actions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

import React, { useState, useContext } from "react";
import styled from "styled-components";

import { GameContext } from "../components/Contexts/GameContext";
import oceanBg from "../assets/oceanBackground.jpg";
import treasureMapImg from "../assets/treasureMap.png";
import NewCard from "../components/Game/NewCard";
import { handleChoice } from "../helpers/gameHelpers";

const Game = () => {
  const [showChanges, setShowChanges] = useState("none");
  const {
    gameState,
    statsState,
    actions: { startGame },
    dispatches: { gameDispatch, statDispatch },
  } = useContext(GameContext);

  return (
    <Wrapper bgImg={oceanBg}>
      <ImgFilter />
      <GameWrapper>
        {gameState.singleCard ? (
          <NewCard
            handleChoice={handleChoice}
            setShowChanges={setShowChanges}
            card={gameState.singleCard}
          />
        ) : (
          <NewCardButton
            bgImg={treasureMapImg}
            onClick={() => {
              //here is all the things we'll need to start the game hard coded
              startGame({
                data: {
                  map: {
                    loot: 200,
                    tripLength: 5,
                    _id: "124fwsf1qe614",
                    cost: 31,
                    sold: 13,
                    name: "level 1 treasure map",
                  },
                  moral: 100,
                  energy: 100,
                  health: 75,
                },
                gameDispatch,
                statDispatch,
              });
            }}
          >
            start
          </NewCardButton>
        )}
      </GameWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: ${({ bgImg }) => `url(${bgImg})`};
  background-size: cover;
  width: auto;
  height: 100vh;
  z-index: 2;
`;

const ImgFilter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.3);
  z-index: -1;
`;

const GameWrapper = styled.div`
  width: 90%;
  margin-left: 5%;
  background: rgb(255, 255, 255, 0.3);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3%;
`;

const NewCardButton = styled.button`
  background: ${({ bgImg }) => `url(${bgImg})`};
  background-size: 100% 100%;
  padding: 20px 30px;
  background-repeat: no-repeat;
  border-radius: 2px;
  text-align: center;
  color: white;
  font-size: 19px;
  text-shadow: 0 0 9px black;
  cursor: pointer;
  border: none;
  outline: none;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1) translate(0, -10px);
  }
  &:active {
    transform: scale(0.9) translate(0, 0px);
  }
`;

export default Game;

import React, { useContext } from "react";
import styled from "styled-components";

import { GameContext } from "../components/Contexts/GameContext";
import oceanBg from "../assets/oceanBackground.jpg";
import treasureMapImg from "../assets/treasureMap.png";
import NewCard from "../components/Game/NewCard";
import { handleChoice } from "../components/Game/gameHelpers";
import NewStatDisplay from "../components/Game/NewStatDisplay";

const Game = () => {
  const {
    gameState: { singleCard, tick, tripLength, gameStarted, chosenMap },
    actions: { startGame },
    dispatches: { gameDispatch },
  } = useContext(GameContext);

  return (
    <Wrapper bgImg={oceanBg}>
      <ImgFilter />
      <GameWrapper>
        {gameStarted ? (
          <>
            <ContentWrapper>
              <NewCard
                handleChoice={handleChoice}
                card={singleCard}
                chosenMap={chosenMap}
              />
            </ContentWrapper>
            <GameStats>
              <TripStats>
                <StatsItem>Day: {tick}</StatsItem>
                <StatsItem>Trip day's left: {tripLength - tick}</StatsItem>
              </TripStats>
              <NewStatDisplay color="rgb(201, 133, 44)" type="Gold" />
              <NewStatDisplay color="rgb(69, 133, 111)" type="Moral" />
              <NewStatDisplay color="rgb(148, 17, 3)" type="Health" />
              <NewStatDisplay color="rgb(186, 180, 0)" type="Energy" />
            </GameStats>
          </>
        ) : (
          <NewCardButton
            bgImg={treasureMapImg}
            onClick={() => {
              // toggling gameStarted to true
              startGame({
                gameDispatch,
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

const GameStats = styled.div`
  border: 2px solid black;
  background: rgb(94, 73, 58);
  border-radius: 2px;
  width: 500px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
`;

const StatsItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  font-weight: bold;
  font-size: 20px;
`;

const TripStats = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid black;
  padding: 5px 0;
  text-shadow: 0 0 5px black;
  color: white;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
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

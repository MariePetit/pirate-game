import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import Card from "./Card";
import StatDisplay from "./StatDisplay";
import { StatsContext } from "./StatsContext";
import { CardContext } from "./CardContext";

import oceanBg from "../assets/oceanBackground.jpg";
import treasureMapImg from "../assets/treasureMap.png";

const RandomCard = () => {
  const [singleCard, setSingleCard] = useState({});
  const [tick, setTick] = useState(10);
  const [adventureLength, setAdventureLength] = useState(null);

  const {
    hasLost,
    reasonForLost,
    setHasLost,
    setScurvy,
    chosenMap,
    setIsCursed,
    hasWon,
    setHasWon,
  } = useContext(StatsContext);
  const { eventCards, endCards } = useContext(CardContext);

  //COMMENTED OUT FOR STYLE EDITING REASONS
  // useEffect(() => {
  //   if (chosenMap) {
  //     setAdventureLength(chosenMap.tripLength);
  //   }
  // }, [chosenMap]);

  useEffect(() => {
    if (hasLost) {
      const lostCard = endCards.filter((card) => {
        return card.type === reasonForLost;
      });
      setSingleCard(lostCard[0]);
      setScurvy(false);
      setIsCursed(false);
    }

    if (adventureLength === 0) {
      setHasWon(true);
    }
  }, [hasLost, adventureLength]);

  const getRandomCard = () => {
    if (hasWon) {
      const victoryCard = endCards.filter((card) => card.type === "victory");
      setSingleCard(victoryCard[0]);
    } else {
      let randomNum = Math.round(Math.random() * (eventCards.length - 1));
      if (singleCard?.name === eventCards[randomNum]?.name) {
        randomNum = Math.round(Math.random() * eventCards.length);
      }
      if (tick === Math.floor(adventureLength / 2)) {
        // if (tick === Math.floor(chosenMap.tripLength / 2)) {
        setSingleCard({
          name: "Burried Treasure!!",
          id: randomNum,
          description: `X marks the spot! You arrived at the burried treasure and found ${chosenMap.loot} gold!`,
          leftChoice: {
            energy: 0,
            gold: chosenMap.loot,
            health: 0,
            moral: 0,
            text: "Back to Harbor we go!",
          },
          rightChoice: {
            energy: 0,
            gold: chosenMap.loot,
            health: 0,
            moral: 0,
            text: "Back to Harbor we go!",
          },
        });
      } else {
        setSingleCard(eventCards[randomNum]);
      }

      if (singleCard.name) {
        setAdventureLength(adventureLength - 1);
        setTick(tick + 1);
      }
    }
  };

  return (
    <Wrapper bgImg={oceanBg}>
      <ImgFilter />
      <GameWrapper>
        {!singleCard.name ? (
          <NewCardButton bgImg={treasureMapImg} onClick={getRandomCard}>
            start
          </NewCardButton>
        ) : (
          <>
            <ContentWrapper>
              {hasLost
                ? singleCard?.name && (
                    <Card
                      tick={tick}
                      setTick={setTick}
                      getRandomCard={getRandomCard}
                      card={singleCard}
                      setSingleCard={setSingleCard}
                      hasLost={hasLost}
                      setHasLost={setHasLost}
                    />
                  )
                : singleCard?.name && (
                    <Card
                      tick={tick}
                      chosenMap={chosenMap}
                      getRandomCard={getRandomCard}
                      card={singleCard}
                      setSingleCard={setSingleCard}
                    />
                  )}
            </ContentWrapper>
            <GameStats>
              <TripStats>
                <StatsItem>Day: {tick}</StatsItem>
                <StatsItem>Trip day's left: {adventureLength}</StatsItem>
              </TripStats>
              {singleCard && (
                <>
                  <StatDisplay
                    singleCard={singleCard}
                    type="Gold"
                    color="rgb(201, 133, 44)"
                  />{" "}
                  <StatDisplay
                    singleCard={singleCard}
                    type="Moral"
                    color="rgb(69, 133, 111)"
                  />{" "}
                  <StatDisplay
                    singleCard={singleCard}
                    type="Health"
                    color="rgb(148, 17, 3)"
                  />{" "}
                  <StatDisplay
                    singleCard={singleCard}
                    type="Energy"
                    color="rgb(186, 180, 0)"
                  />
                </>
              )}
            </GameStats>
          </>
        )}
      </GameWrapper>
    </Wrapper>
  );
};

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

const Wrapper = styled.div`
  position: relative;
  background: ${({ bgImg }) => `url(${bgImg})`};
  background-size: cover;
  width: auto;
  height: 100vh;
  z-index: 2;
`;

const TripStats = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid black;
  padding: 5px 0;
  text-shadow: 0 0 5px black;
  color: white;
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
  transition: 0.4s ease-in-out;
  &:hover {
    transform: scale(1.1) translate(0, -10px);
  }
  &:active {
    transform: scale(0.9) translate(0, 0px);
  }
`;

export default RandomCard;

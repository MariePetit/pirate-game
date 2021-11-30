import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import Card from "./Card";
import StatDisplay from "./StatDisplay";
import { StatsContext } from "./StatsContext";
import { CardContext } from "./CardContext";

const RandomCard = () => {
  const [singleCard, setSingleCard] = useState({});
  const [tick, setTick] = useState(0);
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

  useEffect(() => {
    if (chosenMap) {
      setAdventureLength(chosenMap.tripLength);
    }
  }, [chosenMap]);

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

      if (tick === Math.floor(chosenMap.tripLength / 2)) {
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
    <Wrapper>
      <StatsWrapper>
        <StatsItem>Day: {tick}</StatsItem>
        <StatsItem>Trip day's left: {adventureLength}</StatsItem>
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
      </StatsWrapper>
      <ContentWrapper>
        <NewCardButton onClick={getRandomCard}>New Card</NewCardButton>

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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: rgb(227, 216, 200);
  width: auto;
  height: 100vh;
`;

const StatsWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 50px;
  flex-direction: column;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(227, 216, 100, 0.3);
  border-radius: 2px;
  padding: 30px;
  border: 1px solid gray;
  position: absolute;
  transition: 0.3s ease-in-out;
  max-width: 700px;
  top: 30%;
`;

const NewCardButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background: rgb(209, 208, 207);
  border-radius: 2px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  &:hover {
    background: white;
  }
  &:active {
    transform: scale(0.95);
  }
`;

export default RandomCard;

import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import Card from "./Card";
import StatDisplay from "./StatDisplay";
import { StatsContext } from "./StatsContext";
import { CardContext } from "./CardContext";

const RandomCard = () => {
  const [singleCard, setSingleCard] = useState({});
  const [tick, setTick] = useState(0);

  const { hasLost, reasonForLost, setHasLost, setScurvy } =
    useContext(StatsContext);
  const { eventCards, endCards } = useContext(CardContext);

  useEffect(() => {
    if (hasLost) {
      const lostCard = endCards.filter((card) => {
        return card.type === reasonForLost;
      });
      setSingleCard(lostCard[0]);
      setScurvy(false);
    }
  }, [hasLost]);

  const getRandomCard = () => {
    setTick(tick + 1);
    let randomNum = Math.round(Math.random() * (eventCards.length - 1));
    if (singleCard?.name === eventCards[randomNum]?.name) {
      randomNum = Math.round(Math.random() * eventCards.length);
    }

    if (eventCards[randomNum]?.type?.toLowerCase() === "oranges") {
      setScurvy(false);
    }

    if (eventCards[randomNum]?.name?.toLowerCase() === "scurvy") {
      setScurvy(true);
    }
    setSingleCard(eventCards[randomNum]);
  };
  return (
    <Wrapper>
      <StatsWrapper>
        <StatsItem>Day: {tick}</StatsItem>
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

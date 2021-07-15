import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import Card from "./Card";
import { StatsContext } from "./StatsContext";
import { CardContext } from "./CardContext";

const RandomCard = () => {
  const {
    state,
    setState,
    hasLost,
    reasonForLost,
    setHasLost,
    scurvy,
    setScurvy,
  } = useContext(StatsContext);
  const { eventCards, endCards } = useContext(CardContext);
  const [singleCard, setSingleCard] = useState({});

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
        <StatsItem>Gold:{state.gold}</StatsItem>
        <StatsItem>Moral:{state.moral}</StatsItem>
        <StatsItem>Health:{state.health}</StatsItem>
        <StatsItem>Energy:{state.energy}</StatsItem>
      </StatsWrapper>
      <ContentWrapper>
        <NewCardButton onClick={getRandomCard}>New Card</NewCardButton>

        {hasLost
          ? singleCard?.name && (
              <Card
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
  display: flex;
  flex-direction: column;
`;

const StatsItem = styled.div`
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

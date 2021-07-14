import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import Card from "./Card";
import { StatsContext } from "./StatsContext";

const RandomCard = () => {
  const { state } = useContext(StatsContext);

  const [eventCards, setEventCards] = useState([]);
  const [singleCard, setSingleCard] = useState({});

  useEffect(() => {
    fetch("/cards").then((res) => {
      res.json().then(({ data }) => {
        let createdCards = data.eventCards.filter((eventCard) => {
          return eventCard.name !== "cardName";
        });

        setEventCards(createdCards);
      });
    });
  }, []);

  const getRandomCard = () => {
    const randomNum = Math.round(Math.random() * eventCards.length - 1);

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
        {singleCard?.name && (
          <Card getRandomCard={getRandomCard} card={singleCard} />
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
  left: 50%;
  top: 50px;
  transform: translate(-50%);
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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3s ease-in-out;
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

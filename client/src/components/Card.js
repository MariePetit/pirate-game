import React, { useContext } from "react";
import styled from "styled-components";

import { StatsContext } from "./StatsContext";

const Card = ({ card, getRandomCard }) => {
  const { state, setState } = useContext(StatsContext);
  const { name, description, leftChoice, rightChoice } = card;

  const handleStatChanges = (choice) => {
    const { gold, moral, health, energy } = choice;

    setState({
      gold: state.gold + gold,
      moral: state.moral + moral,
      health: state.health + health,
      energy: state.energy + energy,
    });

    if (choice.useSecondAction) {
      console.log("need to work on second choice!");
    }
    getRandomCard();
  };

  return (
    <Wrapper>
      <CardTitle>{name}</CardTitle>
      <Description>~~{description}~~</Description>
      <ChoiceWrapper>
        <Choice
          onClick={() => {
            handleStatChanges(leftChoice);
          }}
        >
          {leftChoice.text}
        </Choice>
        <Choice
          onClick={() => {
            handleStatChanges(rightChoice);
          }}
        >
          {rightChoice.text}
        </Choice>
      </ChoiceWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: rgb(222, 220, 217);
  border: 2px dashed gray;
  border-radius: 2px;
  padding: 20px;
  margin-top: 20px;
  font-size: 18px;
`;

const CardTitle = styled.div`
  padding: 5px;
  font-weight: bold;
`;

const Description = styled.div``;

const ChoiceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  margin-top: 20px;
`;

const Choice = styled.button`
  font-size: 18px;
  margin: 5px;
  padding: 15px;
  background: rgb(222, 220, 107);
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

export default Card;

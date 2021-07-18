import React, { useContext } from "react";
import styled from "styled-components";

import { StatsContext } from "./StatsContext";

const Card = ({
  card,
  getRandomCard,
  setSingleCard,
  hasLost,
  setHasLost,
  tick,
  setTick,
}) => {
  const { state, setState, scurvy, initialState, setShowChanges } =
    useContext(StatsContext);
  const { name, description, leftChoice, rightChoice, secondAction } = card;

  const handleStatChanges = (choice) => {
    const leftButton = document.getElementById("leftButton");
    const rightButton = document.getElementById("rightButton");

    leftButton.blur();
    rightButton.blur();

    if (hasLost) {
      setSingleCard({});
      setState(initialState);
      alert(`You have survived ${tick} days. A new game will now begin...`);
      setTick(0);
      setHasLost(false);
    } else {
      const { gold, moral, health, energy } = choice;
      if (scurvy) {
        setState({
          gold: state.gold + gold,
          moral: state.moral + moral,
          health: state.health + health - 10,
          energy: state.energy + energy,
        });
      } else {
        setState({
          gold: state.gold + gold,
          moral: state.moral + moral,
          health: state.health + health,
          energy: state.energy + energy,
        });
      }

      if (choice.useSecondAction) {
        if (secondAction.items) {
          let randomNum = Math.round(
            Math.random() * (secondAction.items.length - 1)
          );
          setSingleCard(secondAction.items[randomNum]);
        } else if (secondAction.secondChoices) {
          setSingleCard(secondAction.secondChoices);
        }
      } else {
        getRandomCard();
      }
    }
  };

  return (
    <Wrapper>
      <CardTitle>{name}</CardTitle>
      <Description>~~{description}~~</Description>
      <ChoiceWrapper>
        <Choice
          id="leftButton"
          onMouseOut={() => {
            setShowChanges("none");
          }}
          onMouseOver={() => {
            setShowChanges("left");
          }}
          onClick={() => {
            handleStatChanges(leftChoice);
          }}
        >
          {leftChoice.text}
        </Choice>
        <Choice
          id="rightButton"
          onMouseOut={() => {
            setShowChanges("none");
          }}
          onMouseOver={() => {
            setShowChanges("right");
          }}
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

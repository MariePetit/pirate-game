import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { UserContext } from "./UserContext";
import { StatsContext } from "./StatsContext";

const Card = ({
  card,
  getRandomCard,
  setSingleCard,
  hasLost,
  setHasLost,
  tick,
  setTick,
  chosenMap,
}) => {
  const {
    state,
    setState,
    scurvy,
    setScurvy,
    initialState,
    setShowChanges,
    isCursed,
    setIsCursed,
    hasWon,
    setHasWon,
  } = useContext(StatsContext);
  const { alivePirate, setAlivePirate } = useContext(UserContext);
  const history = useHistory();
  const { name, description, leftChoice, rightChoice, secondAction } = card;

  const handleStatChanges = (choice) => {
    if (hasWon && choice.text === "Pirate's life for me!") {
      setTimeout(() => {
        const newTreasureMapArray = alivePirate.treasureMaps.filter(
          (map) => map.id !== chosenMap.id
        );
        setAlivePirate({
          ...alivePirate,
          age: alivePirate.age + tick,
          boat: { ...alivePirate.boat, health: state.health },
          gold: alivePirate.gold + state.gold,
          energy:
            state.energy > alivePirate.energy
              ? alivePirate.energy
              : state.energy,
          moral:
            state.moral > alivePirate.moral ? alivePirate.moral : state.moral,
          treasureMaps: newTreasureMapArray,
        });
        setHasWon(false);
        history.push("/pirate");
      }, 500);
    }
    if (hasLost) {
      setSingleCard({});
      setState(initialState);
      alert(`You have survived ${tick} days. A new game will now begin...`);
      setTick(0);
      setHasLost(false);
    } else {
      checkForSpecialState(choice);
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

  const checkForSpecialState = (choice) => {
    let { gold, moral, health, energy, type } = choice;
    switch (type) {
      case "scurvy": {
        setScurvy(true);
        break;
      }
      case "oranges": {
        setScurvy(false);
        break;
      }
      case "curse": {
        setIsCursed(true);
        break;
      }
      case "devineSight": {
        setIsCursed(true);
        break;
      }
    }

    if (scurvy) {
      health = health - 10;
    }
    if (isCursed) {
      moral = moral - 5;
    }
    setState({
      gold: state.gold + gold,
      moral: state.moral + moral,
      health: state.health + health,
      energy: state.energy + energy,
    });
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

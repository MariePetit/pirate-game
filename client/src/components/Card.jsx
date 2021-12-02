import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { UserContext } from "./UserContext";
import { StatsContext } from "./StatsContext";
import { updatePirateAfterWin } from "./updatePirateAfterWin";

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
  const { alivePirate, setAlivePirate, user, update, setUpdate } =
    useContext(UserContext);
  const history = useHistory();
  const { name, description, leftChoice, rightChoice, secondAction, image } =
    card;

  const handleStatChanges = (choice) => {
    if (hasWon && choice.text === "Pirate's life for me!") {
      updatePirateAfterWin(
        state,
        tick,
        chosenMap,
        alivePirate,
        user,
        update,
        setUpdate
      );
      history.push("/pirate");
      setHasWon(false);
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
      <CardImg src={image} />
      <Description>{description}</Description>
      <ChoiceWrapper>
        <Choice
          style={{ marginRight: "5px" }}
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
          style={{ marginLeft: "5px" }}
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
  border: 2px solid gray;
  border-radius: 2px;
  padding: 12px;
  margin-top: 20px;
  font-size: 18px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.div`
  padding: 5px;
  text-align: center;
  width: 100%;
  border-radius: 2px;
  border: 3px solid rgb(94, 73, 58);
  box-shadow: 0 0 10px 1px rgb(94, 73, 58) inset;
  background: rgb(130, 94, 68);
  color: white;
  text-shadow: 0 0 8px black;
`;

const CardImg = styled.img`
  width: 100%;
  padding: 5%;
  border: 3px solid rgb(94, 73, 58);
  border-radius: 2px;
  box-shadow: 0 0 10px 1px rgb(94, 73, 58) inset;
  margin: 10px 0 2px 0;
  background: gray;
`;

const Description = styled.div`
  margin-top: 10px;
  padding: 5px;
  text-align: start;
  width: 100%;
  border-radius: 2px;
  border: 3px solid rgb(94, 73, 58);
  box-shadow: 0 0 10px 1px rgb(94, 73, 58) inset;
  background: rgb(161, 128, 104);
  color: white;
  text-shadow: 0 0 8px black;
`;

const ChoiceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Choice = styled.button`
  font-size: 15px;
  padding: 7px 8px;

  color: white;
  background: rgb(161, 128, 104);
  border-radius: 2px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: 0.2s ease-in-out;
  box-shadow: 1px 1px 5px 1px gray;
  &:hover {
    text-shadow: 0 0 6px white;
    transform: translate(-2px, -5px);
  }
  &:active {
    transform: scale(0.95);
  }
`;

export default Card;

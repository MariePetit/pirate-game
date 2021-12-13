import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { GameContext } from "../Contexts/GameContext";
import { udpatePirateAfterLoss } from "../updatePirateAfterLoss";
import { updatePirateAfterWin } from "../updatePirateAfterWin";
import { UserContext } from "../UserContext";

const NewCard = ({ card, handleChoice, chosenMap }) => {
  const {
    gameState,
    statsState,
    actions,
    dispatches: { gameDispatch, statDispatch },
  } = useContext(GameContext);
  const { user, alivePirate, update, setUpdate } = useContext(UserContext);
  const { name, description, leftChoice, rightChoice, image } = card;

  const history = useHistory();

  const handleClick = (clickedChoice) => {
    if (statsState.hasWon || statsState.hasLost) {
      const state = {
        energy: statsState.energy,
        moral: statsState.moral,
        health: statsState.health,
        gold: statsState.gold,
      };
      statsState.hasWon &&
        updatePirateAfterWin(
          state,
          gameState.tick,
          chosenMap,
          alivePirate,
          user,
          update,
          setUpdate
        );
      statsState.haslost &&
        udpatePirateAfterLoss(user, alivePirate, chosenMap, update, setUpdate);
      history.push(`/${statsState.hasWon ? "pirate" : "graveyard"}`);
    } else {
      handleChoice(
        clickedChoice,
        actions,
        statsState,
        gameState,
        gameDispatch,
        statDispatch
      );
    }
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
            actions.receiveHoverOver({
              data: { hoverOver: "none" },
              statDispatch,
            });
          }}
          onMouseOver={() => {
            actions.receiveHoverOver({
              data: { hoverOver: "left" },
              statDispatch,
            });
          }}
          onClick={() => {
            handleClick(leftChoice);
          }}
        >
          {leftChoice.text}
        </Choice>
        <Choice
          style={{ marginLeft: "5px" }}
          id="rightButton"
          onMouseOut={() => {
            actions.receiveHoverOver({
              data: { hoverOver: "none" },
              statDispatch,
            });
          }}
          onMouseOver={() => {
            actions.receiveHoverOver({
              data: { hoverOver: "right" },
              statDispatch,
            });
          }}
          onClick={() => {
            handleClick(rightChoice);
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

export default NewCard;

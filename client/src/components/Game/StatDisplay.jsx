import React, { useContext } from "react";
import styled from "styled-components";

import { GameContext } from "../Contexts/GameContext";
import GrowIn from "../../animations/GrowIn";

const StatDisplay = ({ type, color }) => {
  const {
    gameState: {
      singleCard: { leftChoice, rightChoice },
    },
    statsState,
  } = useContext(GameContext);
  const { hoverOver } = statsState;
  return (
    <Wrapper>
      <Stat color={color} length={statsState[type?.toLowerCase()]}>
        {type}
      </Stat>
      <GrowIn state={hoverOver === "left"}>
        <HoverChange
          color={Math.sign(leftChoice[type?.toLowerCase()])}
          size={leftChoice[type?.toLowerCase()]?.toString().replace("-", "")}
        />
      </GrowIn>
      <GrowIn state={hoverOver === "right"}>
        <HoverChange
          color={Math.sign(rightChoice[type?.toLowerCase()])}
          size={rightChoice[type?.toLowerCase()]?.toString().replace("-", "")}
        />
      </GrowIn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Stat = styled.div`
  position: relative;
  margin-top: 5px;
  text-align: center;
  padding-top: 5px;
  color: rgb(232, 232, 232);
  font-size: 15px;
  overflow: hidden;
  height: 25px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  background: ${({ color }) => {
    return color;
  }};
  box-shadow: 0 0 9px 0.5px black;
  transition: 0.3s ease-in-out;
  width: ${({ length }) => {
    return Math.sign(length) === 1 ? `${length}px` : "0px";
  }};
`;

const HoverChange = styled.div`
  position: absolute;
  left: 100%;
  transform: translate(0, -50%);
  z-index: 10000;
  width: ${({ size }) => (size >= 40 ? "20px" : `${size}px`)};
  height: ${({ size }) => (size >= 40 ? "20px" : `${size}px`)};
  border-radius: 50px;
  margin-left: 10px;
  box-shadow: 0 0 3px black;
  background: ${({ color }) =>
    !isNaN(color) && color === 1 ? "#3f8531" : "#a84032"};
`;

export default StatDisplay;

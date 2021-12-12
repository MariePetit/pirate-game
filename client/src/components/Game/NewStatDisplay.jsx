import React, { useContext } from "react";
import styled from "styled-components";

import { GameContext } from "../Contexts/GameContext";

const NewStatDisplay = () => {
  const { gameState, statsState } = useContext(GameContext);
  const { hoverOver } = statsState;
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div``;

export default NewStatDisplay;

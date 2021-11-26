import React, { useContext } from "react";
import styled from "styled-components";

import { StatsContext } from "./StatsContext";

const StatDisplay = ({
  singleCard: { leftChoice, rightChoice },
  type,
  color,
}) => {
  const { state, showChanges } = useContext(StatsContext);
  return (
    <Wrapper>
      <Stat color={color} length={state[type?.toLowerCase()]}>
        {type}
      </Stat>
      {leftChoice && showChanges === "left" ? (
        <HoverChange
          color={Math.sign(leftChoice[type?.toLowerCase()])}
          size={leftChoice[type?.toLowerCase()]?.toString().replace("-", "")}
        />
      ) : (
        leftChoice &&
        showChanges === "right" && (
          <HoverChange
            color={Math.sign(rightChoice[type?.toLowerCase()])}
            size={rightChoice[type?.toLowerCase()]?.toString().replace("-", "")}
          />
        )
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Stat = styled.div`
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
  box-shadow: 0 0 20px 3px gray;
  transition: 0.3s ease-in-out;
  width: ${({ length }) => {
    return Math.sign(length) === 1 ? `${length}px` : "0px";
  }};
`;

const HoverChange = styled.div`
  width: ${({ size }) => (size >= 40 ? "25px" : `${size}px`)};
  height: ${({ size }) => (size >= 40 ? "25px" : `${size}px`)};
  border-radius: 50px;
  margin-left: 5px;
  background: ${({ color }) =>
    !isNaN(color) && color === 1 ? "green" : "red"};
`;

export default StatDisplay;

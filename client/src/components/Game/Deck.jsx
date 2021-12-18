import React from "react";
import styled from "styled-components";
import CardSlide from "../../animations/CardSlide";
import { range } from "../../helpers";

const Deck = ({ amount, gameStarted }) => {
  return (
    <Wrapper>
      {range(amount)
        .reverse()
        .map((element, index, array) => {
          let delay = element * 100;
          if (array.length > 7) {
            delay = delay / 3;
          }
          return (
            <CardSlide state={gameStarted} indent={element} delay={delay} />
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 300px;
  height: 512px;
`;

const FakeCard = styled.div`
  position: absolute;
  top: ${({ indent }) => `${(indent * 10) / 4.9}px`};
  left: ${({ indent }) => `${(indent * 10) / 4.9}px`};
  box-shadow: 0 0 5px 1px #41362c;
  background: #423228;
  border-radius: 2px;
  width: 300px;
  height: 552px;
  z-index: -1;
`;

export default Deck;

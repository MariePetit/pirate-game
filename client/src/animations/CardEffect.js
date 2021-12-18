import React from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";

const CardEffect = ({ children, state }) => {
  const transition = useTransition(state, {
    from: {
      transform: "translateY(0%) rotateY(90deg) rotate(0deg) ",
    },
    enter: {
      transform: "translateY(0%) rotateY(0deg) rotate(0deg) ",
    },
    leave: {
      transform: "translateY(150%) rotateY(0deg) rotate(-5deg) ",
    },
  });

  return transition(
    (style, item) => item && <Wrapper style={style}>{children}</Wrapper>
  );
};

const Wrapper = styled(animated.div)`
  position: absolute;
  left: 0px;
  top: -22px;
  z-index: 2;
  background: rgb(222, 220, 217);
  border: 2px solid #5c5146;
  border-radius: 2px;
  padding: 12px;
  margin-top: 20px;
  font-size: 18px;
  max-width: 300px;
  min-height: 552px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
`;

export default CardEffect;

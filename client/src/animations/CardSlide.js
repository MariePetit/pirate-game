import React from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";

const CardSlide = ({ children, delay, indent, state }) => {
  const transition = useTransition(state, {
    from: { opacity: 1, transform: "translate(-600%,-30%)" },
    enter: { opacity: 1, transform: "translate(0%,0%)" },
    leave: { opacity: 0, transform: "translate(0%,0%)" },
    delay,
  });
  return transition(
    (style, item) =>
      item && (
        <Wrapper indent={indent} style={style}>
          {children}
        </Wrapper>
      )
  );
};

const Wrapper = styled(animated.div)`
  top: ${({ indent }) => `${(indent * 10) / 2.5}px`};
  left: ${({ indent }) => `${(indent * 10) / 2.5}px`};
  position: absolute;
  box-shadow: 0 0 5px 1px #2b2927;
  border: 2px solid black;
  background: #423228;
  border-radius: 2px;
  width: 300px;
  height: 552px;
  z-index: -1;
`;

export default CardSlide;

import React from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";

import { GiPirateFlag } from "react-icons/gi";

const PageTransition = ({ state }) => {
  const transition = useTransition(state, {
    from: { width: "0%" },
    enter: { width: "100%" },
    leave: { width: "0%", right: "0" },
    config: {
      tension: 300,
      clamp: true,
    },
  });
  return transition(
    (style, item) =>
      item && (
        <Wrapper style={style}>
          <GiPirateFlag />
        </Wrapper>
      )
  );
};

const Wrapper = styled(animated.div)`
  position: absolute;
  height: 100%;
  background: black;
  z-index: 10000;
  color: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200px;
`;

export default PageTransition;

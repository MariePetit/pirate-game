import React from "react";
import { useTransition, animated } from "react-spring";

const GrowIn = ({ children, state }) => {
  const transition = useTransition(state, {
    from: { transform: "scale(0)", opacity: "0" },
    enter: { transform: "scale(1)", opacity: "1" },
    leave: { transform: "scale(0)", opacity: "0" },
  });

  return transition(
    (style, item) =>
      item && <animated.div style={style}>{children}</animated.div>
  );
};

export default GrowIn;

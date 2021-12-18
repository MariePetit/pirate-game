import React from "react";
import { useTransition, animated } from "react-spring";

const SlideInFromRight = ({ children, state }) => {
  const transition = useTransition(state, {
    from: { opacity: 0, transform: "translate(100%)" },
    enter: { opacity: 1, height: "100%", transform: "translate(0%)" },
    leave: { opacity: 1, transform: "translate(100%)" },
  });

  return transition((style, item) => {
    return item && <animated.div style={style}>{children}</animated.div>;
  });
};

export default SlideInFromRight;

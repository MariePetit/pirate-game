import React, { useState, createContext } from "react";

export const TransitionContext = createContext(null);

export const TransitionProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);

  const playTransitionAnimation = (callback) => {
    setIsShowing(true);

    setTimeout(() => {
      callback();
    }, 350);

    setTimeout(() => {
      setIsShowing(false);
    }, 400);
  };

  return (
    <TransitionContext.Provider
      value={{ isShowing, setIsShowing, playTransitionAnimation }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

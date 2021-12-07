import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const TypingCharacters = ({ children }) => {
  const [finalSaying, setFinalSaying] = useState("");
  let count = 0;
  let phrase = "";
  useEffect(() => {
    const textAppear = setInterval(() => {
      if (phrase.length === children.length) {
        clearInterval(textAppear);
      } else {
        const letter = children.split("")[count];

        phrase = phrase.concat(letter);
        count++;
      }
      setFinalSaying(phrase);
    }, 30);
  }, [children]);

  return <Wrapper>{finalSaying}</Wrapper>;
};

const Wrapper = styled.div``;
export default TypingCharacters;

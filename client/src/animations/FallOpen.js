import React from "react";
import styled, { keyframes } from "styled-components";

const FallOpen = ({ children, delay }) => {
  return <Wrapper delay={delay}>{children}</Wrapper>;
};

const fallAndOpen = keyframes`
    0%{
        transform: translateY(-100px) rotateX(90deg);
    }
   70%{
    transform: translateY(-50px) rotateX(90deg);

   }
    100%{
        transform: translateY(0px) rotateX(0deg);

    }
`;

const Wrapper = styled.div`
  animation: ${fallAndOpen} 300ms ease-in forwards;
  animation-delay: ${({ delay }) => delay};
  transform: translateY(-100px) rotateX(90deg);
`;

export default FallOpen;

import React from "react";
import styled from "styled-components";

const ForSaleMapCard = ({
  map,
  map: { name, cost, tripLength, sold },
  userGold,
  handlePurchase,
  bgImg,
  isLoading,
}) => {
  return (
    <Wrapper
      bgImg={bgImg}
      disabled={!isLoading && userGold - cost > 0 ? false : true}
      onClick={() => {
        handlePurchase({ map });
      }}
    >
      <Name>{name}</Name>
      <StatList>
        <Stat>costs {cost} gold</Stat>
        <Stat>
          This trip is {Math.round(tripLength / 2)} days to go and{" "}
          {Math.floor(tripLength / 2)} to get back.{" "}
        </Stat>
        <Stat> resell value is {sold} gold</Stat>
      </StatList>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  height: 120px;
  outline: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background: ${({ bgImg }) => `url(${bgImg})`};
  background-size: 100% 100%;
  opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};

  &:hover {
    color: ${({ disabled }) => (disabled ? "default" : "green")};
  }
`;

const Name = styled.div``;
const StatList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
const Stat = styled.li`
  margin: 3px;
`;

export default ForSaleMapCard;

import React from "react";
import styled from "styled-components";

const ForSaleMapCard = ({
  map,
  map: { name, cost, length, sold },
  userGold,
  handlePurchase,
}) => {
  return (
    <Wrapper
      disabled={userGold - cost > 0 ? false : true}
      onClick={() => {
        handlePurchase({ map });
      }}
    >
      <Name>{name}</Name>
      <StatList>
        <Stat>costs {cost} gold</Stat>
        <Stat>
          This trip is {Math.round(length / 2)} days to go and{" "}
          {Math.floor(length / 2)} to get back.{" "}
        </Stat>
        <Stat> resell value is {sold} gold</Stat>
      </StatList>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  font-size: 16px;
  margin: 5px;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const Name = styled.div``;
const StatList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
const Stat = styled.li``;

export default ForSaleMapCard;

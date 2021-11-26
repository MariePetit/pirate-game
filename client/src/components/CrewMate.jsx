import React from "react";
import styled from "styled-components";

const CrewMate = ({ crewMate }) => {
  const { attributes, energy, moral, name } = crewMate;
  return (
    <Wrapper>
      <Name>{name}</Name>
      <Attributes>
        {attributes.map((attr, index) => {
          return <div key={index}>{attr}</div>;
        })}
      </Attributes>
      <Stats>
        <Stat>
          Energy : {energy} / {energy}
        </Stat>
        <Stat>
          Moral : {moral} / {moral}
        </Stat>
      </Stats>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Name = styled.div``;
const Stats = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
const Attributes = styled.div``;
const Stat = styled.li``;

export default CrewMate;

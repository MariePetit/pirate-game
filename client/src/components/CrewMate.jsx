import React, { useState } from "react";
import styled from "styled-components";

const CrewMate = ({ crewMate, update, setUpdate, user }) => {
  const [remove, setRemove] = useState(false);

  const { attributes, energy, moral, name, img } = crewMate;

  const removeCrewMember = () => {
    fetch(`/pirate/crewMate/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ crewMate, action: "removing" }),
    }).then(() => {
      setUpdate(!update);
      setRemove(false);
    });
  };

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={img} />
      </ImageWrapper>
      <Name>{name}</Name>
      <Attributes>
        {attributes?.map((attr, index) => {
          return <div key={index}>{attr}</div>;
        })}
      </Attributes>
      <Stats>
        <Stat>Energy : {energy}</Stat>
        <Stat>Moral : {moral}</Stat>
      </Stats>
      {remove ? (
        <>
          remove ?
          <ButtonWrapper>
            <YesButton onClick={removeCrewMember}>Yes</YesButton>
            <Button onClick={() => setRemove(false)}>No</Button>
          </ButtonWrapper>
        </>
      ) : (
        <Button onClick={() => setRemove(true)}>Fire</Button>
      )}
    </Wrapper>
  );
};

const Image = styled.img`
  width: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const ImageWrapper = styled.div`
  background: #ddd6d6;
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 2px;
  box-shadow: 0 0 20px 5px rgb(138, 117, 100) inset;
`;

const Wrapper = styled.div`
  position: relative;
  border: 2px solid rgb(138, 117, 100);
  padding: 5px;
`;
const Name = styled.div``;
const Stats = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
const Attributes = styled.div``;
const Stat = styled.li``;

const Button = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  background: #7a1515;
  border-radius: 2px;
  width: 100%;
  padding: 6px;
  margin-top: 5px;
  color: white;
  transition: 200ms ease;
  &:hover {
    background: #ac0b0b;
  }
`;

const YesButton = styled(Button)`
  background: #1b3f81;
  &:hover {
    background: #0a59eb;
  }
`;

export default CrewMate;

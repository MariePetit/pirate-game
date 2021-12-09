import React, { useContext } from "react";
import styled from "styled-components";

import { NotStyledButton } from "../buttons/NotStyledButton";
import CrewMate from "../components/CrewMate";

const RescuedCrewMateModal = ({
  onClick,
  cursedMate,
  crewMaxSize,
  boatCrew,
  update,
  setUpdate,
  user,
}) => {
  const handleClose = () => {
    const modal = document.getElementById("RescuedCrewModal");
    if (modal) {
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    }
  };

  if (!boatCrew) {
    return <div></div>;
  }
  return (
    <ModalBgWrapper id="RescuedCrewModal">
      <Modal>
        <CrewCount max={crewMaxSize <= boatCrew.length}>
          {boatCrew.length} / {crewMaxSize} <span> crew size </span>
        </CrewCount>
        <HiddenButton onClick={handleClose}>x</HiddenButton>
        <MateWrapper>
          <Name>{cursedMate.name}</Name>
          <Image src={cursedMate.img} />
          <StatsWrapper>
            <Stat>
              <span>{cursedMate.energy} </span>
              energy boost.
            </Stat>
            <Stat>
              <span>{cursedMate.moral} </span>
              moral boost.
            </Stat>
          </StatsWrapper>
          <Message>
            {crewMaxSize > boatCrew.length
              ? "Thank you from saving me! I hope to join your crew!"
              : "Seems your crew is full, you would need to make some space if you want my services"}
          </Message>
        </MateWrapper>
        {crewMaxSize <= boatCrew.length && (
          <Crews>
            {boatCrew.map((crewMate, index) => {
              return (
                <CrewMate
                  user={user}
                  update={update}
                  setUpdate={setUpdate}
                  key={index}
                  crewMate={crewMate}
                />
              );
            })}
          </Crews>
        )}
        <ButtonsWrapper>
          <ChoiceButton
            disabled={crewMaxSize <= boatCrew.length}
            onClick={() => {
              onClick(cursedMate);
            }}
          >
            Join us!
          </ChoiceButton>
          <CloseButton onClick={handleClose}>Close</CloseButton>
        </ButtonsWrapper>
      </Modal>
    </ModalBgWrapper>
  );
};

const CrewCount = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  color: ${({ max }) => (max ? "grey" : "white")};
  text-shadow: 2px 2px 9px black;

  span {
    font-size: 12px;
    color: gray;
  }
`;

const Crews = styled.div`
  position: relative;
  padding-top: 10px;
  padding: 5px;
  box-shadow: 0 0 20px 5px rgb(138, 117, 100) inset;
  border-radius: 2px;
  width: 100%;
  background: #ddd6d6;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;
const MateWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StatsWrapper = styled.div`
  background: #5f5151;
  padding: 5px;
  color: white;
  width: 100%;
  border: 2px solid rgb(138, 117, 100);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Name = styled.div`
  color: white;
  font-size: 20px;
`;

const Stat = styled.div`
  span {
    font-weight: bold;
  }
`;

const Image = styled.img`
  width: 90px;
`;

const Message = styled.div`
  background: #5f5151;
  padding: 5px;
  border-radius: 2px;
  border: 2px solid rgb(138, 117, 100);
  color: white;
`;

const ChoiceButton = styled(NotStyledButton)`
  background: #7a1515;
  border-radius: 2px;
  padding: 6px;
  color: white;
  transition: 200ms ease;
  background: #1b3f81;
  &:disabled {
    background: gray;
    color: black;
  }

  &:hover {
    background: #0a59eb;
  }

  &:hover:disabled {
    background: gray;
    cursor: default;
  }
`;
const ButtonsWrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const HiddenButton = styled(NotStyledButton)`
  font-weight: bold;
  font-size: 20px;
  background: none;
  color: white;
  position: absolute;
  top: 0px;
  right: 5px;
`;
const CloseButton = styled(ChoiceButton)`
  background: #7a1515;
  border-radius: 2px;
  padding: 6px;
  color: white;
  transition: 200ms ease;
  &:hover {
    background: #ac0b0b;
  }
`;
const Modal = styled.div`
  background: rgb(87, 41, 2);
  box-shadow: 0 0 10px 1px rgb(138, 117, 100);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalBgWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.4);
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s;
`;
export default RescuedCrewMateModal;

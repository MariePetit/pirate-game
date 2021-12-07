import React, { useState, useEffect } from "react";
import styled from "styled-components";

import woodenBoard from "../assets/woodenBoard.png";

import { NotStyledButton } from "../buttons/NotStyledButton";

const CreatePirateModal = ({ _id, update, setUpdate }) => {
  const [name, setName] = useState("");
  const [boatName, setBoatName] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  const handleClose = () => {
    const modal = document.getElementById("createPirateModal");
    if (modal) {
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    }
  };

  const handleCreatePirate = () => {
    setDisabledButton(true);
    fetch(`/pirate/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.length > 0 ? name : null,
        boatName: boatName.length > 0 ? boatName : null,
      }),
    }).then(() => {
      setUpdate(!update);
      setDisabledButton(false);
      handleClose();
    });
  };

  const handleKeyPress = (ev) => {
    switch (ev.key) {
      case "Escape": {
        handleClose();
        break;
      }
      case "ArrowUp": {
        const nameEle = document.getElementById("nameElement");
        nameEle.focus();
        break;
      }
      case "ArrowDown": {
        const boatNameEle = document.getElementById("boatNameElement");
        boatNameEle.focus();
        break;
      }
      case "Enter": {
        handleCreatePirate();
      }
    }
  };

  return (
    <ModalBgWrapper onKeyDown={handleKeyPress} id="createPirateModal">
      <Modal bgImg={woodenBoard}>
        <ContentWrapper>
          <HiddenButton onClick={handleClose}>x</HiddenButton>
          <InputsWrapper>
            <Label>Pirate Name</Label>
            <Input
              id="nameElement"
              type="text"
              htmlFor="name"
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
              }}
              placeholder="optional"
            />
            <Label>Boat Name</Label>
            <Input
              id="boatNameElement"
              type="text"
              htmlFor="boatName"
              value={boatName}
              onChange={(ev) => {
                setBoatName(ev.target.value);
              }}
              placeholder="optional"
            />
          </InputsWrapper>
          <ButtonsWrapper>
            <ChoiceButton
              onClick={() => {
                handleCreatePirate();
              }}
              disabled={disabledButton}
            >
              {disabledButton ? "Creating..." : "Create"}
            </ChoiceButton>
            <CloseButton onClick={handleClose}>Close</CloseButton>
          </ButtonsWrapper>
        </ContentWrapper>
      </Modal>
    </ModalBgWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  margin-top: 115px;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 0 5px;
  text-shadow: 1px 1px 5px black;
`;

const Input = styled.input`
  padding: 5px;
  margin: 8px 5px;
  outline: none;
  border: none;
  border-radius: 2px;
  box-shadow: 0 0 5px 1px rgb(0, 0, 0, 0.6);
`;

const ChoiceButton = styled(NotStyledButton)`
  margin: 9px 5px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HiddenButton = styled(NotStyledButton)`
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  top: -25px;
  right: 5px;
  background: none;
`;
const CloseButton = styled(ChoiceButton)``;

const Modal = styled.div`
  background: ${({ bgImg }) => `url(${bgImg})`};
  background-size: 100%;
  border-radius: 5px;
  color: white;
  padding: 10px;
  height: 320px;
  width: 300px;
  display: flex;
  flex-direction: column;
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

export default CreatePirateModal;

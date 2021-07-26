import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { NotStyledButton } from "../buttons/NotStyledButton";

const GoldAmountModal = ({ alivePirate, handleStartGame }) => {
  const [goldAmount, setGoldAmount] = useState(1);

  const GoldAmountAdjust = (type) => {
    if (goldAmount <= 1 && type === "decrease") {
      setGoldAmount(1);
    } else if (goldAmount === Number(alivePirate.gold) && type === "increase") {
    } else {
      if (type === "increase") {
        setGoldAmount(goldAmount + 1);
      } else {
        setGoldAmount(goldAmount - 1);
      }
    }
  };
  const handleClose = () => {
    const modal = document.getElementById("goldAmountModal");
    if (modal) {
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    }
  };

  const handleKeyValue = (ev) => {
    if (ev.key === "ArrowDown") {
      GoldAmountAdjust("decrease");
    }
    if (ev.key === "ArrowUp") {
      GoldAmountAdjust("increase");
    }
  };

  const WriteGoldAmount = (ev) => {
    let value = Number(ev.target.value);
    if (!!value || value === 0) {
      if (value >= alivePirate.gold) {
        setGoldAmount(alivePirate.gold);
      } else if (value <= 1) {
        setGoldAmount(1);
      } else {
        setGoldAmount(value);
      }
    }
  };
  return (
    <ModalBgWrapper id="goldAmountModal">
      <Modal>
        How much gold will you take on your Journey?
        <div>
          You have {alivePirate.gold} gold available to bring. You need a
          minimum of 1 gold.
        </div>
        <HiddenButton onClick={handleClose}>x</HiddenButton>
        <AmountInput
          type="text"
          value={goldAmount}
          onChange={WriteGoldAmount}
          onKeyDown={handleKeyValue}
        />
        <AmountButton
          onClick={() => {
            GoldAmountAdjust("increase");
          }}
        >
          +
        </AmountButton>
        <AmountButton
          onClick={() => {
            GoldAmountAdjust("decrease");
          }}
        >
          -
        </AmountButton>
        <ButtonsWrapper>
          <ChoiceButton
            onClick={() => {
              handleStartGame(goldAmount);
            }}
          >
            Sail off!
          </ChoiceButton>
          <CloseButton onClick={handleClose}>Close</CloseButton>
        </ButtonsWrapper>
      </Modal>
    </ModalBgWrapper>
  );
};

const ChoiceButton = styled(NotStyledButton)`
  margin: 2px 2px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HiddenButton = styled(NotStyledButton)`
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  top: 0px;
  right: 5px;
`;
const CloseButton = styled(ChoiceButton)``;

const AmountInput = styled.input`
  margin-top: 5px;
  width: 50px;
`;

const AmountButton = styled(NotStyledButton)`
  user-select: none;
  width: 20px;
  height: 20px;
  text-align: center;
  margin: 5px;
  background-color: gray;
`;

const Modal = styled.div`
  background: white;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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

export default GoldAmountModal;

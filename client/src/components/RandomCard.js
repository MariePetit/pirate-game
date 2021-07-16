import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import Card from "./Card";
import { StatsContext } from "./StatsContext";
import { CardContext } from "./CardContext";

const RandomCard = () => {
  const [singleCard, setSingleCard] = useState({});
  const [tick, setTick] = useState(0);

  const {
    state,
    hasLost,
    reasonForLost,
    setHasLost,
    setScurvy,
    showChanges,
    setShowChanges,
  } = useContext(StatsContext);
  const { eventCards, endCards } = useContext(CardContext);

  useEffect(() => {
    if (hasLost) {
      const lostCard = endCards.filter((card) => {
        return card.type === reasonForLost;
      });
      setSingleCard(lostCard[0]);
      setScurvy(false);
    }
  }, [hasLost]);

  const getRandomCard = () => {
    setTick(tick + 1);
    let randomNum = Math.round(Math.random() * (eventCards.length - 1));
    if (singleCard?.name === eventCards[randomNum]?.name) {
      randomNum = Math.round(Math.random() * eventCards.length);
    }

    if (eventCards[randomNum]?.type?.toLowerCase() === "oranges") {
      setScurvy(false);
    }

    if (eventCards[randomNum]?.name?.toLowerCase() === "scurvy") {
      setScurvy(true);
    }
    setSingleCard(eventCards[randomNum]);
  };
  return (
    <Wrapper>
      <StatsWrapper>
        <StatsItem>Day: {tick}</StatsItem>
        <StatsItem>
          {/* :{state.gold} */}
          <StatsQuantityBar color="rgb(201, 133, 44)" length={state.gold}>
            Gold
          </StatsQuantityBar>
          {showChanges === "left" ? (
            <Amount
              color={Math.sign(singleCard.leftChoice?.gold)}
              size={singleCard.leftChoice?.gold?.toString().replace("-", "")}
            />
          ) : (
            showChanges === "right" && (
              <Amount
                color={Math.sign(singleCard.rightChoice?.gold)}
                size={singleCard.rightChoice?.gold?.toString().replace("-", "")}
              />
            )
          )}
        </StatsItem>
        <StatsItem>
          {/* :{state.moral} */}
          <StatsQuantityBar color="rgb(69, 133, 111)" length={state.moral}>
            Moral
          </StatsQuantityBar>
          {showChanges === "left" ? (
            <Amount
              color={Math.sign(singleCard.leftChoice?.moral)}
              size={singleCard.leftChoice?.moral?.toString().replace("-", "")}
            />
          ) : (
            showChanges === "right" && (
              <Amount
                color={Math.sign(singleCard.rightChoice?.moral)}
                size={singleCard.rightChoice?.moral
                  ?.toString()
                  .replace("-", "")}
              />
            )
          )}
        </StatsItem>
        <StatsItem>
          {/* :{state.health} */}
          <StatsQuantityBar color="rgb(148, 17, 3)" length={state.health}>
            Health
          </StatsQuantityBar>
          {showChanges === "left" ? (
            <Amount
              color={Math.sign(singleCard.leftChoice?.health)}
              size={singleCard.leftChoice?.health?.toString().replace("-", "")}
            />
          ) : (
            showChanges === "right" && (
              <Amount
                color={Math.sign(singleCard.rightChoice?.health)}
                size={singleCard.rightChoice?.health
                  ?.toString()
                  .replace("-", "")}
              />
            )
          )}
        </StatsItem>
        <StatsItem>
          {/* :{state.energy} */}
          <StatsQuantityBar color="rgb(186, 180, 0)" length={state.energy}>
            Energy
          </StatsQuantityBar>
          {showChanges === "left" ? (
            <Amount
              color={Math.sign(singleCard.leftChoice?.energy)}
              size={singleCard.leftChoice?.energy?.toString().replace("-", "")}
            />
          ) : (
            showChanges === "right" && (
              <Amount
                color={Math.sign(singleCard.rightChoice?.energy)}
                size={singleCard.rightChoice?.energy
                  ?.toString()
                  .replace("-", "")}
              />
            )
          )}
        </StatsItem>
      </StatsWrapper>
      <ContentWrapper>
        <NewCardButton onClick={getRandomCard}>New Card</NewCardButton>

        {hasLost
          ? singleCard?.name && (
              <Card
                tick={tick}
                setTick={setTick}
                getRandomCard={getRandomCard}
                card={singleCard}
                setSingleCard={setSingleCard}
                hasLost={hasLost}
                setHasLost={setHasLost}
              />
            )
          : singleCard?.name && (
              <Card
                getRandomCard={getRandomCard}
                card={singleCard}
                setSingleCard={setSingleCard}
              />
            )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Amount = styled.div`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50px;
  margin-left: 5px;
  background: ${({ color }) =>
    color !== NaN && color === 1 ? "green" : "red"};
`;

const StatsQuantityBar = styled.div`
  text-align: center;
  padding-top: 5px;
  color: rgb(232, 232, 232);
  font-size: 15px;
  overflow: hidden;
  height: 25px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  background: ${({ color }) => {
    return color;
  }};
  box-shadow: 0 0 20px 3px gray;
  transition: 0.3s ease-in-out;
  width: ${({ length }) => {
    return Math.sign(length) === 1 ? `${length}px` : "0px";
  }};
`;

const Wrapper = styled.div`
  position: relative;
  background: rgb(227, 216, 200);
  width: auto;
  height: 100vh;
`;

const StatsWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 50px;
  display: flex;
  flex-direction: column;
`;

const StatsItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  font-weight: bold;
  font-size: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(227, 216, 100, 0.3);
  border-radius: 2px;
  padding: 30px;
  border: 1px solid gray;
  position: absolute;
  transition: 0.3s ease-in-out;
  max-width: 700px;
  top: 30%;
`;

const NewCardButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background: rgb(209, 208, 207);
  border-radius: 2px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  &:hover {
    background: white;
  }
  &:active {
    transform: scale(0.95);
  }
`;

export default RandomCard;

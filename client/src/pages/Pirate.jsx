import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../components/UserContext";
import CrewMate from "../components/CrewMate";
import OwnedMapCard from "../components/OwnedMapCard";
import GoldAmountModal from "../modals/GoldAmountModal";
import RescuedCrewMateModal from "../modals/RescuedCrewMateModal";
import seaView from "../assets/seaView.jpg";

import pirateImg from "../assets/023-pirate-21.png";
import energyImg from "../assets/042-lighting.png";
import goldImg from "../assets/033-treasure.png";
import healthImg from "../assets/044-heart.png";
import moralImg from "../assets/046-smiley.png";
import shipImg from "../assets/039-pirate-ship-2.png";
import FallOpen from "../animations/FallOpen";
import CreatePirateModal from "../modals/CreatePirateModal";
import treasureMapImg from "../assets/treasureMap.png";
import { NotStyledButton } from "../buttons/NotStyledButton";
import { GameContext } from "../components/Contexts/GameContext";

const Pirate = () => {
  const history = useHistory();
  const [crewStats, setCrewStats] = useState({});
  const [totalStats, setTotalStats] = useState({});

  const { user, alivePirate, setAlivePirate, setUpdate, update } =
    useContext(UserContext);

  const {
    gameState,
    actions: { receiveGameMap, receiveGameInfo, resetGame },
    dispatches: { gameDispatch, statDispatch },
  } = useContext(GameContext);

  useEffect(() => {
    if (gameState.crewMate) {
      const modal = document.getElementById("RescuedCrewModal");
      if (modal) {
        modal.style.visibility = "visible";
        modal.style.opacity = "1";
      }
    }
  }, [gameState.crewMate]);

  useEffect(() => {
    return () => {
      setUpdate(!update);
    };
  }, []);

  useEffect(() => {
    const delay = 1000;
    let moralHeal = 0;
    let energyHeal = 0;
    let healthHeal = 0;
    if (alivePirate) {
      if (totalStats.energy < alivePirate.totalEnergy) {
        energyHeal = 1;
      }
      if (totalStats.moral < alivePirate.totalMoral) {
        moralHeal = 1;
      }
      if (totalStats.health < alivePirate.boat?.totalHealth) {
        healthHeal = 1;
      }

      if (moralHeal > 0 || energyHeal > 0 || healthHeal > 0) {
        setTimeout(() => {
          let newStats = {
            ...totalStats,
            energy: totalStats.energy + energyHeal,
            moral: totalStats.moral + moralHeal,
            health: totalStats.health + healthHeal,
          };
          setTotalStats(newStats);

          fetch(`/pirate/stats/${user._id}/pirateId/${alivePirate.pirateId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newStats }),
          });
        }, delay);
      }
    }
  }, [totalStats]);

  useEffect(() => {
    if (alivePirate?.boat) {
      const crewEnergy = alivePirate.boat.crew.reduce((total, crewMate) => {
        return total + crewMate.energy;
      }, 0);
      const crewMoral = alivePirate.boat.crew.reduce((total, crewMate) => {
        return total + crewMate.moral;
      }, 0);

      const moral =
        alivePirate.moral > alivePirate.totalMoral
          ? alivePirate.totalMoral
          : alivePirate.moral;
      const energy =
        alivePirate.energy > alivePirate.totalEnergy
          ? alivePirate.totalEnergy
          : alivePirate.energy;
      const health =
        alivePirate.boat.health > alivePirate.boat.totalHealth
          ? alivePirate.boat.totalHealth
          : alivePirate.boat.health;
      const gold = alivePirate.gold;

      setTotalStats({ moral, energy, health, gold });
      setCrewStats({ moral: crewMoral, energy: crewEnergy });
    }
  }, [user, alivePirate]);

  const addCrewMate = (crewMate) => {
    console.log(crewMate);
    fetch(`/pirate/crewMate/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "adding", crewMate }),
    }).then(() => {
      window.location.reload();
      // commented out because it breaks the healing part.
      // setUpdate(!update);
      // const modal = document.getElementById("RescuedCrewModal");
      // if (modal) {
      //   modal.style.visibility = "hidden";
      //   modal.style.opacity = "0";
      // }
    });
  };

  const handleStartGame = (gold) => {
    receiveGameInfo({ data: { ...totalStats, gold }, statDispatch });
    let newStats = {
      ...totalStats,
      gold: alivePirate.gold - gold,
      age: alivePirate.age,
    };
    fetch(`/pirate/stats/${user._id}/pirateId/${alivePirate.pirateId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newStats }),
    }).then((res) =>
      res.json().then(({ data }) => {
        setAlivePirate(data);
      })
    );

    history.push(`/game`);
  };

  const handleSetGoldAmount = (clickedMap) => {
    if (gameState.gameStarted) {
      resetGame({ gameDispatch, statDispatch });
    }

    receiveGameMap({ data: { map: clickedMap }, gameDispatch });
    const modal = document.getElementById("goldAmountModal");
    if (modal) {
      modal.style.visibility = "visible";
      modal.style.opacity = "1";
    }
  };

  const startCreatePirate = () => {
    const modal = document.getElementById("createPirateModal");
    if (modal) {
      modal.style.visibility = "visible";
      modal.style.opacity = "1";
      const nameEle = document.getElementById("nameElement");
      nameEle && nameEle.focus();
    }
  };
  return (
    <>
      {alivePirate ? (
        <GoldAmountModal
          handleStartGame={handleStartGame}
          alivePirate={alivePirate}
        />
      ) : (
        <CreatePirateModal
          _id={user._id}
          update={update}
          setUpdate={setUpdate}
        />
      )}
      {gameState.crewMate && (
        <RescuedCrewMateModal
          boatCrew={alivePirate.boat?.crew}
          crewMaxSize={alivePirate.boat?.crewSize}
          cursedMate={gameState.crewMate}
          onClick={addCrewMate}
          update={update}
          setUpdate={setUpdate}
          user={user}
        />
      )}
      <Wrapper bgImage={seaView}>
        <Fade>
          {alivePirate ? (
            alivePirate.boat ? (
              <PirateWrapper>
                <PageInfo>Pirate's Info</PageInfo>
                <FallOpen delay="0ms">
                  <RopeWrapper>
                    <Rope />
                    <Rope />
                  </RopeWrapper>
                  <BoxLayout>
                    <Info>
                      <InfoItem>
                        Has survived {alivePirate.age} days at sea
                      </InfoItem>
                      <InfoItem>
                        <IconImg src={energyImg} />
                        Energy: {totalStats.energy} / {alivePirate.totalEnergy}
                        <span>
                          -- {crewStats.energy} energy from crew mates
                        </span>
                      </InfoItem>
                      <InfoItem>
                        <IconImg src={moralImg} />
                        Moral: {totalStats.moral} / {alivePirate.totalMoral}
                        <span> -- {crewStats.moral} moral from crew mates</span>
                      </InfoItem>
                      <InfoItem>
                        <IconImg src={healthImg} />
                        Health: {totalStats.health} /{" "}
                        {alivePirate.boat.totalHealth}
                      </InfoItem>
                    </Info>
                  </BoxLayout>
                </FallOpen>

                <FallOpen delay="150ms">
                  <RopeWrapper>
                    <Rope />
                    <Rope />
                    <Rope />
                  </RopeWrapper>
                  <PirateInfo>
                    <div style={{ marginBottom: "15px" }}>
                      <IconImg src={pirateImg} />
                      <Name>{alivePirate.name}</Name>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <IconImg src={goldImg} />
                      <Name>{alivePirate.gold} gold in your treasury</Name>
                    </div>
                    <BoatWrapper>
                      <IconImg src={shipImg} />
                      <Name>{alivePirate.boat.boatName}</Name>
                    </BoatWrapper>
                  </PirateInfo>
                </FallOpen>
                <FallOpen delay="400ms">
                  <RopeWrapper>
                    <Rope />
                    <Rope />
                  </RopeWrapper>
                  <TreasureMapWrapper>
                    {alivePirate.treasureMaps.length > 0
                      ? alivePirate.treasureMaps.map((map, index) => {
                          return (
                            <OwnedMapCard
                              key={index}
                              map={map}
                              handleSetGoldAmount={handleSetGoldAmount}
                            />
                          );
                        })
                      : "Purchase some maps to see them appear here"}
                  </TreasureMapWrapper>
                </FallOpen>
                {alivePirate.boat.crew.length > 0 && (
                  <FallOpen delay="650ms">
                    <RopeWrapper>
                      <Rope />
                      <Rope />
                    </RopeWrapper>
                    <CrewWrapper>
                      <Title
                        max={
                          alivePirate.boat?.crewSize <=
                          alivePirate.boat?.crew.length
                        }
                      >
                        Crew
                        <span>
                          {" "}
                          {alivePirate.boat?.crew.length} /{" "}
                          {alivePirate.boat?.crewSize}
                        </span>
                      </Title>
                      <Crews>
                        {alivePirate.boat.crew.length > 0 &&
                          alivePirate.boat.crew.map((crewMate, index) => {
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
                    </CrewWrapper>
                  </FallOpen>
                )}
              </PirateWrapper>
            ) : (
              <PirateWrapper>
                <LoadingWrapper>Loading...</LoadingWrapper>
              </PirateWrapper>
            )
          ) : (
            <>
              <PageInfo>Pirate's Info</PageInfo>
              <FallOpen>
                <RopeWrapper>
                  <Rope />
                  <Rope />
                </RopeWrapper>
                <AddPirateWrapper>
                  <ButtonWrapper bgImg={treasureMapImg}>
                    Start a new Adventure
                    <Button onClick={startCreatePirate}>Create Pirate</Button>
                  </ButtonWrapper>
                </AddPirateWrapper>
              </FallOpen>
            </>
          )}
        </Fade>
      </Wrapper>
    </>
  );
};

const Title = styled.div`
  cursor: default;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 20px;

  span {
    font-size: 12px;
    color: ${({ max }) => (max ? "gray" : "white")};
  }
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: white;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: black;
  background: ${({ bgImg }) => `url(${bgImg})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;

const Button = styled(NotStyledButton)`
  background: none;
  padding: 10px;
  font-size: inherit;
  font-weight: bold;
  transition: 200ms ease;
  &:hover {
    transform: rotate(-2deg) scale(1.1);
  }
  &:active {
    transform: rotate(2deg) scale(0.9);
  }
`;

const BoxLayout = styled.div`
  text-shadow: 2px 2px 9px black;
  background: rgb(87, 41, 2);
  border: 4px solid rgb(138, 117, 100);
  border-radius: 5px;
  width: 80%;
  margin-left: 10%;
  padding: 3%;
  color: white;
`;

const CrewWrapper = styled(BoxLayout)`
  padding: 15px;
`;

const Crews = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

const AddPirateWrapper = styled(BoxLayout)`
  display: flex;
  justify-content: center;
`;

const TreasureMapWrapper = styled(BoxLayout)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: 200ms ease;
`;

const PageInfo = styled(BoxLayout)`
  padding: 5%;

  text-align: center;
  font-size: 2em;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const PirateInfo = styled(BoxLayout)`
  display: flex;
  flex-direction: column;
`;

const IconImg = styled.img`
  width: 30px;
  vertical-align: top;
  margin-top: -6px;
  margin-right: 5px;
`;

const InfoItem = styled.li`
  margin-top: 6px;
  padding: 4px;
  span {
    font-size: 12px;
    color: gray;
  }
`;
const Info = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MapsWrapper = styled.div`
  display: flex;
  border: 2px solid gray;
  padding: 10px;
`;

const RopeWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Rope = styled.div`
  background: url("https://public.agriconomie.com/imgbin_rope-euclidean-drawing-png.png");
  background-size: cover;
  height: 100px;
  width: 10px;
`;

const BoatWrapper = styled.div``;
const Wrapper = styled.div`
  background: ${({ bgImage }) => `url(${bgImage})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
`;

const Fade = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
`;
const PirateWrapper = styled.div`
  max-width: 1100px;
  width: 90%;
  height: 100%;
  overflow: auto;
  padding: 2%;
  background: rgb(255, 255, 255, 0.4);
  border-left: 5px solid rgb(87, 41, 2);
  border-right: 5px solid rgb(87, 41, 2);
`;

const Name = styled.span`
  margin: 2px;
`;

export default Pirate;

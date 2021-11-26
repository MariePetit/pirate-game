import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../components/UserContext";
import { StatsContext } from "../components/StatsContext";
import CrewMate from "../components/CrewMate";
import OwnedMapCard from "../components/OwnedMapCard";
import GoldAmountModal from "../modals/GoldAmountModal";

const Pirate = () => {
  const history = useHistory();
  const [crewStats, setCrewStats] = useState({});
  const [totalStats, setTotalStats] = useState({});
  const [isHealing, setIsHealing] = useState(false);

  const { user, alivePirate, setAlivePirate } = useContext(UserContext);
  const { state, setState, setChosenMap, chosenMap } = useContext(StatsContext);

  useEffect(() => {
    const delay = 2000;
    let moralHeal = 0;
    let energyHeal = 0;
    let healthHeal = 0;
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
  }, [totalStats]);

  useEffect(() => {
    if (alivePirate.boat) {
      const crewEnergy = alivePirate.boat.crew.reduce((total, crewMate) => {
        return total + crewMate.energy;
      }, 0);
      const crewMoral = alivePirate.boat.crew.reduce((total, crewMate) => {
        return total + crewMate.moral;
      }, 0);

      const moral = crewMoral + alivePirate.moral;
      const energy = crewEnergy + alivePirate.energy;
      const health = alivePirate.boat.health;
      const gold = alivePirate.gold;

      setTotalStats({ moral, energy, health, gold });
      setCrewStats({ moral: crewMoral, energy: crewEnergy });
    }
  }, [user, alivePirate]);

  const handleStartGame = (gold) => {
    setState({ ...totalStats, gold });

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
    setChosenMap(clickedMap);
    const modal = document.getElementById("goldAmountModal");
    if (modal) {
      modal.style.visibility = "visible";
      modal.style.opacity = "1";
    }
  };

  return (
    <>
      <GoldAmountModal
        handleStartGame={handleStartGame}
        alivePirate={alivePirate}
      />
      <Wrapper>
        {alivePirate.boat ? (
          <PirateWrapper>
            <Name>{alivePirate.name}</Name>
            <Info>
              <InfoItem> Has survived {alivePirate.age} days at sea</InfoItem>
              <InfoItem>Gold: {alivePirate.gold}</InfoItem>
              <InfoItem>
                Energy: {totalStats.energy} / {alivePirate.totalEnergy}
                <span> -- {crewStats.energy} energy from crew mates</span>{" "}
              </InfoItem>
              <InfoItem>
                Moral: {totalStats.moral} / {alivePirate.totalMoral}
                <span> -- {crewStats.moral} moral from crew mates</span>{" "}
              </InfoItem>
              <InfoItem>
                Health: {totalStats.health} / {alivePirate.boat.totalHealth}
              </InfoItem>
            </Info>
            <BoatWrapper>
              <Name>{alivePirate.boat.boatName}</Name>
              <CrewWrapper>
                {alivePirate.boat.crew.length > 0 &&
                  alivePirate.boat.crew.map((crewMate, index) => {
                    return <CrewMate key={index} crewMate={crewMate} />;
                  })}
              </CrewWrapper>
            </BoatWrapper>
            <MapsWrapper>
              {alivePirate.treasureMaps.length > 0 &&
                alivePirate.treasureMaps.map((map, index) => {
                  return (
                    <OwnedMapCard
                      key={index}
                      map={map}
                      handleSetGoldAmount={handleSetGoldAmount}
                    />
                  );
                })}
            </MapsWrapper>
          </PirateWrapper>
        ) : (
          <div>Loading...</div>
        )}
      </Wrapper>
    </>
  );
};

const InfoItem = styled.li`
  transition: 200ms ease-in-out;
  span {
    font-size: 12px;
    color: gray;
  }
`;
const Info = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const MapsWrapper = styled.div`
  display: flex;
  border: 2px solid gray;
  padding: 10px;
`;

const BoatWrapper = styled.div``;
const CrewWrapper = styled.div``;
const Wrapper = styled.div``;

const PirateWrapper = styled.div``;

const Name = styled.div``;

export default Pirate;

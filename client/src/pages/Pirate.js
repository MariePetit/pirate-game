import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../components/UserContext";
import CrewMate from "../components/CrewMate";

const Pirate = () => {
  const [crewStats, setCrewStats] = useState({});
  const [totalStats, setTotalStats] = useState({});
  const { user } = useContext(UserContext);
  let pirate = user?.pirates?.filter((currentPirate) => !currentPirate.isDead);
  pirate = pirate ? pirate[0] : undefined;
  console.log(pirate);

  useEffect(() => {
    if (user._id) {
      const pirate = user.pirates.filter((pirate) => !pirate.isDead);
      console.log(pirate[0]);
      const crewEnergy = pirate[0].boat.crew.reduce((total, crewMate) => {
        return total + crewMate.energy;
      }, 0);
      const crewMoral = pirate[0].boat.crew.reduce((total, crewMate) => {
        return total + crewMate.moral;
      }, 0);

      const moral = crewMoral + pirate[0].moral;
      const energy = crewEnergy + pirate[0].energy;
      const health = pirate[0].boat.health;
      const gold = pirate[0].gold;

      setTotalStats({ moral, energy, health, gold });
      setCrewStats({ moral: crewMoral, energy: crewEnergy });
    }
  }, [user]);

  return (
    <Wrapper>
      {pirate ? (
        <PirateWrapper>
          <Name>{pirate.name}</Name>
          <Info>
            <InfoItem> Has survived {pirate.age} days at sea</InfoItem>
            <InfoItem>Gold:{totalStats.gold}</InfoItem>
            <InfoItem>
              Energy:{totalStats.energy} /
              <span>{crewStats.energy} energy from crew mates</span>{" "}
            </InfoItem>
            <InfoItem>
              Moral:{totalStats.moral} /
              <span>{crewStats.moral} moral from crew mates</span>{" "}
            </InfoItem>
            <InfoItem>Health:{pirate.boat.health}</InfoItem>
          </Info>
          <BoatWrapper>
            <Name>{pirate.boat.boatName}</Name>
            <CrewWrapper>
              {pirate.boat.crew.length > 0 &&
                pirate.boat.crew.map((crewMate, index) => {
                  return <CrewMate key={index} crewMate={crewMate} />;
                })}
            </CrewWrapper>
          </BoatWrapper>
        </PirateWrapper>
      ) : (
        <div>Loading...</div>
      )}
    </Wrapper>
  );
};

const Info = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const InfoItem = styled.li`
  span {
    font-size: 12px;
    color: gray;
  }
`;

const BoatWrapper = styled.div``;
const CrewWrapper = styled.div``;
const Wrapper = styled.div``;

const PirateWrapper = styled.div``;

const Name = styled.div``;

export default Pirate;

import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../components/UserContext";
import CrewMate from "../components/CrewMate";
import OwnedMapCard from "../components/OwnedMapCard";
import GoldAmountModal from "../modals/GoldAmountModal";

const Pirate = () => {
  const [crewStats, setCrewStats] = useState({});
  const [totalStats, setTotalStats] = useState({});
  const { user, alivePirate } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

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
  }, [user]);

  const handleSetGoldAmount = ({ chosenMap }) => {};

  return (
    <>
      <GoldAmountModal showModal={showModal} setShowModal={setShowModal} />
      <Wrapper>
        {alivePirate.boat ? (
          <PirateWrapper>
            <Name>{alivePirate.name}</Name>
            <Info>
              <InfoItem> Has survived {alivePirate.age} days at sea</InfoItem>
              <InfoItem>Gold:{totalStats.gold}</InfoItem>
              <InfoItem>
                Energy:{totalStats.energy} /
                <span>{crewStats.energy} energy from crew mates</span>{" "}
              </InfoItem>
              <InfoItem>
                Moral:{totalStats.moral} /
                <span>{crewStats.moral} moral from crew mates</span>{" "}
              </InfoItem>
              <InfoItem>Health:{alivePirate.boat.health}</InfoItem>
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
                alivePirate.treasureMaps.map((map) => {
                  return (
                    <OwnedMapCard
                      key={map.name}
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

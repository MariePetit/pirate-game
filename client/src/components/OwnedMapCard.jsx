import React from "react";
import styled from "styled-components";
import treasureMapImg from "../assets/treasureMap.png";

const OwnedMapCard = ({ map, handleSetGoldAmount }) => {
  return (
    <MapWrapper bgImg={treasureMapImg}>
      <Name>{map.name}</Name>
      <MapStatList>
        <MapStat>sells for {map.sold}</MapStat>
        <MapStat>This is a {map.tripLength} day long trip</MapStat>
      </MapStatList>
      <MapUseButton
        onClick={() => {
          handleSetGoldAmount(map);
        }}
      >
        Start
      </MapUseButton>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  margin: 5px;
  color: black;
  display: flex;
  flex-direction: column;
  background: ${({ bgImg }) => `url(${bgImg})`};
  background-size: cover;
  justify-content: center;
  width: 200px;
  height: 150px;
  border-radius: 3px;
  transition: 200ms ease-in-out;
  &:hover {
    transform: rotate(2deg);
  }
`;

const MapUseButton = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 50%;
  margin-left: 25%;
  padding: 10px 20px;
  color: black;
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
  transition: 200ms ease-in-out;
  &:hover {
    transform: scale(1.3);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const MapStatList = styled.ul`
  padding: 0;
  padding-left: 5%;
  margin: 0;
  list-style-type: none;
`;
const MapStat = styled.li``;

const Name = styled.div`
  margin-left: 5%;
`;

export default OwnedMapCard;

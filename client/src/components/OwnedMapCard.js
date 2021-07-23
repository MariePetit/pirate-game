import React from "react";
import styled from "styled-components";

const OwnedMapCard = ({ map, handleSetGoldAmount }) => {
  return (
    <MapWrapper>
      <Name>{map.name}</Name>
      <MapStatList>
        <MapStat>sells for {map.sold}</MapStat>
        <MapStat>This is a {map.length} day long trip</MapStat>
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
  color: white;
  display: flex;
  flex-direction: column;
  background: rgb(158, 133, 96);
  justify-content: center;
  width: 200px;
  height: 150px;
  border-radius: 3px;
  border: 2px solid rgb(99, 81, 53);
  transition: 200ms ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 5px 1px grey;
  }
`;

const MapUseButton = styled.button`
  outline: none;
  background: rgb(99, 81, 53);
  border: none;
  cursor: pointer;
  width: 90%;
  margin-left: 5%;
  padding: 10px 20px;
  color: white;
  margin-top: 10px;
  transition: 200ms ease-in-out;
  &:hover {
    box-shadow: 0 0 2px 1px white;
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

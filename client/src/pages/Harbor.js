import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { UserContext } from "../components/UserContext";
import MapCard from "../components/ForSaleMapCard";

const Harbor = () => {
  const [mapsOnSale, setMapsOnSale] = useState([]);
  const [purchasedMap, setPurchasedMap] = useState(null);

  const { alivePirate, setAlivePirate } = useContext(UserContext);

  useEffect(() => {
    if (purchasedMap) {
      setTimeout(() => {
        setPurchasedMap(null);
      }, 5000);
    }
  }, [purchasedMap]);

  const ClosePurchasePopUp = () => {
    setPurchasedMap(null);
  };

  useEffect(() => {
    let maps = [];

    for (let i = 1; i < 6; i++) {
      let map = createTreasureMap(i);
      maps.push(map);
    }
    setMapsOnSale(maps);
  }, []);

  const createTreasureMap = (difficulty) => {
    let trasureMap = {
      name: `level ${difficulty} treasure map`,
      cost: Math.round(25 * difficulty * 1.25),
      sold: Math.round((25 * difficulty) / 2),
      loot: 100 * (difficulty * 2),
      length: Math.round(3 * difficulty * 1.5),
    };
    return trasureMap;
  };

  const handlePurchase = ({ map }) => {
    setAlivePirate({
      ...alivePirate,
      gold: alivePirate.gold - map.cost,
      treasureMaps: [...alivePirate.treasureMaps, map],
    });
    setPurchasedMap(map);
  };

  return (
    <>
      {purchasedMap && (
        <MapPurchaseConfirmation onClick={ClosePurchasePopUp}>
          Purchase Successful
        </MapPurchaseConfirmation>
      )}
      <Wrapper>
        {mapsOnSale.length > 0 &&
          mapsOnSale.map((map) => {
            return (
              <MapCard
                key={map.name}
                map={map}
                userGold={alivePirate.gold}
                handlePurchase={handlePurchase}
              />
            );
          })}
      </Wrapper>
    </>
  );
};

const MapPurchaseConfirmation = styled.button`
  outline: none;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%);
  width: 300px;
  height: 200px;
  border: 2px solid green;
  background: rgb(155, 222, 144);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
  background: rgb(94, 56, 25);
`;

export default Harbor;

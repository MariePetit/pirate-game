import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

import ForSaleMapCard from "../ForSaleMapCard";
import { UserContext } from "../Contexts/UserContext";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { IoMdReturnRight } from "react-icons/io";
import { purchaseLines, startingLines } from "./mapSellerTextLines";
import TypingCharacters from "../../animations/TypingCharacters";

import goldImg from "../../assets/033-treasure.png";
import merchantImg from "../../assets/mapMerchant.png";
import treasureMapImg from "../../assets/treasureMap.png";

const MapSeller = ({ setTabShown }) => {
  const [mapsOnSale, setMapsOnSale] = useState([]);
  const [saying, setSaying] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { alivePirate, user, update, setUpdate } = useContext(UserContext);

  useEffect(() => {
    let maps = [];

    for (let i = 1; i < 6; i++) {
      let map = createTreasureMap(i);
      maps.push(map);
    }
    setMapsOnSale(maps);
  }, []);

  useEffect(() => {
    setSaying(startingLines[Math.floor(Math.random() * startingLines.length)]);
  }, []);

  useEffect(() => {
    isLoading &&
      setSaying(
        purchaseLines[Math.floor(Math.random() * purchaseLines.length)]
      );
  }, [isLoading]);

  const createTreasureMap = (difficulty) => {
    let trasureMap = {
      name: `level ${difficulty} treasure map`,
      cost: Math.round(25 * difficulty * 1.25),
      sold: Math.round((25 * difficulty) / 2),
      loot: 100 * (difficulty * 2),
      tripLength: Math.round(3 * difficulty * 1.5),
    };
    return trasureMap;
  };

  const handlePurchase = ({ map }) => {
    setIsLoading(true);

    fetch(`/pirate/add/treasuremap/${user._id}/${alivePirate.pirateId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ map, newGold: alivePirate?.gold - map.cost }),
    }).then(() => {
      setIsLoading(false);
      setUpdate(!update);
    });
  };

  return (
    <Wrapper>
      <MapsWrapper>
        {isLoading && (
          <Loading>
            <CircularProgress />
          </Loading>
        )}
        {mapsOnSale.length > 0 &&
          mapsOnSale.map((map) => {
            return (
              <ForSaleMapCard
                isLoading={isLoading}
                bgImg={treasureMapImg}
                key={map.name}
                map={map}
                userGold={alivePirate?.gold}
                handlePurchase={handlePurchase}
              />
            );
          })}
      </MapsWrapper>
      <MerchantWrapper>
        <MerchantMessage>
          <TypingCharacters>{saying}</TypingCharacters>
          <SpeakTip />
        </MerchantMessage>
        <Merchant src={merchantImg} />
        <PlayerInfo>
          <Gold>
            {" "}
            <GoldImg src={goldImg} /> {alivePirate.gold}{" "}
          </Gold>
          <Tippy content="back to Harbor">
            <Return onClick={() => setTabShown("none")}>
              <IoMdReturnRight />
            </Return>
          </Tippy>
        </PlayerInfo>
      </MerchantWrapper>
    </Wrapper>
  );
};

const PlayerInfo = styled.div`
  width: 100%;
  background: #bfb393;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
  border: 2px solid #6e5749;
`;

const GoldImg = styled.img`
  height: 25px;
  margin-top: -3px;
  vertical-align: top;
`;

const Gold = styled.div`
  margin-left: 8px;
  margin-top: 6px;
`;

const Return = styled.button`
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;
  font-size: 25px;
  font-weight: bold;
  padding-top: 8px;
  margin-right: 20px;
  transition: 200ms ease;
  &:hover {
    transform: translate(5px);
  }
`;

const MerchantMessage = styled.div`
  background: #bfb393;
  align-self: center;
  padding: 15px 5px;
  position: relative;
  border-radius: 5px;
  max-width: 250px;
  font-weight: bold;
`;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SpeakTip = styled.div`
  position: absolute;
  width: 30px;
  height: 20px;
  left: 5%;
  bottom: -9px;
  background: #bfb393;
  transform: rotate(15deg);
  border-radius: 50%100px;
`;

const MerchantWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 50%;
  margin-left: 10px;
`;

const Merchant = styled.img`
  width: 200px;
  transition: 0.2s ease;
`;

const MapsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export default MapSeller;

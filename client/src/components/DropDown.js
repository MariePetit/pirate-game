import React, { useContext } from "react";
import styled from "styled-components";

import DropDownItem from "./DropDownItem";

import {
  GiPirateCaptain,
  GiSmallFishingSailboat,
  GiBlackBook,
  GiPirateFlag,
  GiAnchor,
} from "react-icons/gi";
import { RiAccountBoxFill } from "react-icons/ri";
import { BsFillGearFill, BsInfoSquareFill } from "react-icons/bs";
import { UserContext } from "../components/UserContext";

const DropDown = () => {
  const size = 20;

  const { user } = useContext(UserContext);

  const openDropDown = () => {
    const DropDown = document.getElementById("dropDownId");

    DropDown.style.height = "337px";
  };

  const closeDropDown = () => {
    const DropDown = document.getElementById("dropDownId");

    DropDown.style.height = "40px";
  };
  return (
    <>
      <Wrapper
        id="dropDownId"
        onMouseEnter={openDropDown}
        onMouseLeave={closeDropDown}
      >
        <Logo>
          <GiPirateFlag style={{ height: 30, width: 35 }} />
        </Logo>
        <List>
          <DropDownItem
            title="Home"
            icon={<GiAnchor style={{ width: size, height: size }} />}
            link=""
          />
          <DropDownItem
            disabled={!user}
            title="Pirate"
            link="pirate"
            icon={<GiPirateCaptain style={{ width: size, height: size }} />}
          />
          <DropDownItem
            disabled={!user}
            title="Account"
            link="profile"
            icon={<RiAccountBoxFill style={{ width: size, height: size }} />}
          />
          <DropDownItem
            disabled={!user}
            title="Harbor"
            link="harbor"
            icon={
              <GiSmallFishingSailboat style={{ width: size, height: size }} />
            }
          />
          <DropDownItem
            disabled={!user}
            title="Settings"
            link="settings"
            icon={<BsFillGearFill style={{ width: size, height: size }} />}
          />
          <DropDownItem
            title="Forum"
            link="forum"
            icon={<GiBlackBook style={{ width: size, height: size }} />}
          />
          <DropDownItem
            title="About"
            link="about"
            icon={<BsInfoSquareFill style={{ width: size, height: size }} />}
          />
        </List>
      </Wrapper>
    </>
  );
};

const Logo = styled.div`
  position: absolute;
  padding: 5px;
`;

const Wrapper = styled.button`
  padding-left: 0;
  z-index: 10;
  outline: none;
  border: none;
  cursor: pointer;
  top: 10px;
  right: 0px;
  position: absolute;
  background-color: beige;
  height: 40px;
  overflow: hidden;
  width: 30px;
  transition: 200ms ease-in-out;
  &:hover {
    width: 150px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 35px;
`;
export default DropDown;

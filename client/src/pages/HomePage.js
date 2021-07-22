import React, { useContext } from "react";
import styled from "styled-components";

import ListItem from "../components/ListItem";
import {
  GiPirateCaptain,
  GiSmallFishingSailboat,
  GiBlackBook,
} from "react-icons/gi";
import { RiAccountBoxFill } from "react-icons/ri";
import { BsFillGearFill, BsInfoSquareFill } from "react-icons/bs";
import { UserContext } from "../components/UserContext";

const HomePage = () => {
  const size = 20;

  const { user } = useContext(UserContext);
  return (
    <Wrapper>
      <List>
        <ListItem title="Home" link="" />
        <ListItem
          disabled={!user}
          title="Pirate"
          link="pirate"
          icon={<GiPirateCaptain style={{ width: size, height: size }} />}
        />
        <ListItem
          disabled={!user}
          title="Account"
          link="profile"
          icon={<RiAccountBoxFill style={{ width: size, height: size }} />}
        />
        <ListItem
          disabled={!user}
          title="Harbor"
          link="harbor"
          icon={
            <GiSmallFishingSailboat style={{ width: size, height: size }} />
          }
        />
        <ListItem
          disabled={!user}
          title="Settings"
          link="settings"
          icon={<BsFillGearFill style={{ width: size, height: size }} />}
        />
        <ListItem
          title="Forum"
          link="forum"
          icon={<GiBlackBook style={{ width: size, height: size }} />}
        />
        <ListItem
          title="About"
          link="about"
          icon={<BsInfoSquareFill style={{ width: size, height: size }} />}
        />
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export default HomePage;

import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import ListItem from "../components/ListItem";
import {
  GiPirateCaptain,
  GiSmallFishingSailboat,
  GiBlackBook,
  GiPirateGrave,
} from "react-icons/gi";
import { RiAccountBoxFill } from "react-icons/ri";
import { BsFillGearFill, BsInfoSquareFill } from "react-icons/bs";
import { UserContext } from "../components/UserContext";

const HomePage = () => {
  const size = 20;
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!localStorage.getItem("userLoggedIn")) {
      history.push("/intro");
    }
  }, [user]);

  return (
    <Wrapper>
      <List>
        {/* <ListItem title="Home" link="" /> */}
        <ListItem
          disabled={!user.userName}
          title="Pirate"
          link="pirate"
          icon={<GiPirateCaptain style={{ width: size, height: size }} />}
        />
        <ListItem
          disabled={!user.userName}
          title="Account"
          link="profile"
          icon={<RiAccountBoxFill style={{ width: size, height: size }} />}
        />
        <ListItem
          disabled={!user.userName}
          title="Harbor"
          link="harbor"
          icon={
            <GiSmallFishingSailboat style={{ width: size, height: size }} />
          }
        />
        {user?.pirates?.filter((pirate) => pirate.isDead).length > 0 && (
          <ListItem
            disabled={!user.userName}
            title="Graveyard"
            link="graveyard"
            icon={<GiPirateGrave style={{ width: size, height: size }} />}
          />
        )}
        {/* <ListItem
          disabled={!user.userName}
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
        /> */}
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

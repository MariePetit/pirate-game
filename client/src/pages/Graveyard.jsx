import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../components/Contexts/UserContext";

const Graveyard = () => {
  const [deadPirates, setDeadPirates] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    user.pirates &&
      setDeadPirates(user.pirates.filter((pirate) => pirate.isDead));
  }, [user]);

  return (
    <Wrapper>
      <Info>you have {deadPirates.length} pirates that have died at sea.</Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Info = styled.div``;

export default Graveyard;

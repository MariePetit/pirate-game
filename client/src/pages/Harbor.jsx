import React, { useContext, useState } from "react";
import styled from "styled-components";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { UserContext } from "../components/UserContext";
import MapSeller from "../components/Harbor/MapSeller";
import SlideInFromRight from "../animations/SlideInFromRight";

const Harbor = () => {
  const [tabShown, setTabShown] = useState("none");

  const { alivePirate, setAlivePirate, user, update, setUpdate } =
    useContext(UserContext);

  if (!alivePirate) {
    return <Wrapper>create a pirate first.</Wrapper>;
  }
  return (
    <>
      <Wrapper>
        {tabShown === "none" && (
          <>
            <Tippy content="visit merchant">
              <MerchantButton
                onClick={() => {
                  setTabShown("merchant");
                }}
              >
                Merchant
              </MerchantButton>
            </Tippy>
          </>
        )}
        <FilterWrapper>
          <SlideInFromRight state={tabShown === "merchant"}>
            <ContentWrapper>
              <MapSeller setTabShown={setTabShown} />
            </ContentWrapper>
          </SlideInFromRight>
        </FilterWrapper>
      </Wrapper>
    </>
  );
};

const MerchantButton = styled.button`
  position: absolute;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 200ms ease;
  &:hover {
    opacity: 0.8;
    transform: translate(-52%, -59%);
  }
`;
const Wrapper = styled.div`
  position: relative;
  background: url("http://michaelmay.us/12blog/03/0301-portroyal.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  overflow: hidden;
`;

const FilterWrapper = styled.div`
  height: 100%;
  background: rgb(0, 0, 0, 0.6);
`;

const ContentWrapper = styled.div`
  background: rgb(255, 255, 255, 0.3);
  height: 100%;
  width: 90%;
  margin-left: 5%;
`;

export default Harbor;

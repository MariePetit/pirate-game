import React, { useContext } from "react";
import styled from "styled-components";
import { TransitionContext } from "./Contexts/TransitionContext";

import { Link, useHistory } from "react-router-dom";

const DropDownItem = ({ disabled, icon, title, link }) => {
  const history = useHistory();

  return (
    <Item>
      <StyledLink
        onClick={() => {
          history.push(`/${disabled ? "" : link}`);
        }}
        disabled={disabled}
        to={`/${disabled ? "" : link}`}
      >
        {icon ? (
          <>
            <span style={{ marginLeft: "10px" }}>{icon}</span>
            {title}
          </>
        ) : (
          title
        )}
      </StyledLink>
    </Item>
  );
};

const StyledLink = styled.button`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  color: black;
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  font-weight: bold;
  font-size: 20px;
  outline: none;
  border: none;
  padding: 10px 0px;
  width: 150px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background: beige;
  transition: 200ms ease-in-out;
  border-radius: 2px;
  &:hover {
    transform: ${({ disabled }) => (disabled ? "scale(1)" : "scale(1.03)")};
    background: ${({ disabled }) =>
      disabled ? "beige" : "rgb(196, 173, 130)"};
  }
`;

const Item = styled.li``;

export default DropDownItem;

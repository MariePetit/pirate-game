import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListItem = ({ title, icon, link, disabled }) => {
  return (
    <Item>
      <StyledLink disabled={disabled} to={`/${disabled ? "" : link}`}>
        {icon ? (
          <>
            {icon}
            {title}
            <span style={{ transform: "scaleX(-1)" }}>{icon}</span>
          </>
        ) : (
          title
        )}
      </StyledLink>
    </Item>
  );
};

const StyledLink = styled(Link)`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  color: black;
  text-decoration: none;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  padding: 20px 0px;
  max-width: 400px;
  min-width: 200px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background: beige;
  transition: 200ms ease-in-out;
  border-radius: 2px;
  &:hover {
    transform: ${({ disabled }) => (disabled ? "scale(1)" : "scale(1.1)")};
    box-shadow: ${({ disabled }) => (disabled ? "none" : "0 0 15px 1px gray")};
  }
`;

const Item = styled.li``;

export default ListItem;

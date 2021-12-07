import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const DropDownItem = ({ disabled, icon, title, link }) => {
  return (
    <Item>
      <StyledLink disabled={disabled} to={`/${disabled ? "" : link}`}>
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

const StyledLink = styled(Link)`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  color: black;
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  font-weight: bold;
  font-size: 20px;
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

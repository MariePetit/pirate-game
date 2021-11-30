import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { NotStyledButton } from "../buttons/NotStyledButton";
import { UserContext } from "../components/UserContext";

const IntroPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const history = useHistory();

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("userLoggedIn")) {
      history.push("/");
    }
  }, []);

  const handleLogin = (ev) => {
    ev.target.innerText = "loading...";
    setDisabledButton(true);
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    fetch(`/user/userName/${userName}/password/${password}`).then((res) =>
      res
        .json()
        .then(({ data }) => {
          if (data) {
            setUser(data);
            localStorage.setItem("userLoggedIn", true);
            localStorage.setItem("loggedInUserId", data._id);
            history.push("/");
          } else {
            setError(true);
          }
        })
        .then(() => {
          ev.target.innerText = "Log In";
          setDisabledButton(false);
        })
    );
  };

  const handleEnableButton = () => {
    if (error) {
      setError(false);
    }
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    if (userName?.length > 2 && password.length > 2) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  return (
    <Wrapper>
      <GameTitle>Welcome to Pirate Looter</GameTitle>
      <ChoiceWrapper>Are ye a new Pirate </ChoiceWrapper>
      <Button
        onClick={() => {
          history.push("/signin");
        }}
      >
        Sign Up
      </Button>
      <Border />
      <ChoiceWrapper>or a returning Legend!</ChoiceWrapper>
      <LoginWrapper>
        <LoginInput
          onChange={handleEnableButton}
          id="userName"
          placeholder="user name"
          type="text"
        />
        <LoginInput
          onChange={handleEnableButton}
          id="password"
          placeholder="password"
          type="password"
        />
        <Button disabled={disabledButton} onClick={handleLogin}>
          Log In
        </Button>
        <ErrorMessage error={error}>Wrong user name or password</ErrorMessage>
      </LoginWrapper>
    </Wrapper>
  );
};

const LoginInput = styled.input`
  margin: 2px;
`;

const ErrorMessage = styled.div`
  font-weight: bold;
  text-align: center;
  transition: 0.1s ease-in-out;
  opacity: ${({ error }) => (error ? "1" : "0")};
  height: ${({ error }) => (error ? "20px" : "0px")};
  background: rgb(255, 191, 186);
  border: 1px solid rgb(247, 42, 27);
`;

const LoginWrapper = styled.div``;
const Border = styled.div`
  height: 2px;
  width: 30%;
  background-color: black;
  margin: 5px;
`;

const Button = styled(NotStyledButton)`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  border: 1px dashed black;
  margin: 5px;
  transition: 0.2s ease-in-out;
  &:focus {
    border: 1px solid gray;
  }
  &:hover {
    background: ${({ disabled }) => (disabled ? "" : "rgb(189, 189, 189)")};
  }
`;

const ChoiceWrapper = styled.div``;

const GameTitle = styled.h1``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default IntroPage;

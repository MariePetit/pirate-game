import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { UserContext } from "../components/Contexts/UserContext";
import { formInfoNeeded } from "../components/formInfoNeeded";
import FormHelper from "../components/FormHelper";
import {
  checkPassword,
  checkUserName,
  checkRequired,
  checkIfValidEmail,
} from "../components/formValidationFunctions";

const Signup = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [errorArray, setErrorArray] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    setDisabled(true);
    fetch(`/users`).then((res) => {
      res.json().then(({ data }) => {
        setAllUsers(data);
        setDisabled(false);
      });
    });
  }, []);

  const handleForm = (ev) => {
    ev.preventDefault();
    let fullForm = {};
    const form = document.forms.userCreation.elements;

    for (let i = 0; i < form.length; i++) {
      let key = form[i].name;
      let value = form[i].value;
      if (value) {
        fullForm[key] = value;
      } else {
        fullForm[key] = null;
      }
    }
    const errors = [
      ...checkRequired(fullForm, formInfoNeeded),
      ...checkPassword(fullForm.password, fullForm.confirmPassword),
      ...checkUserName(allUsers, fullForm.userName),
      ...checkIfValidEmail(fullForm.email),
    ];

    if (errors.length === 0) {
      fetch(`/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fullForm }),
      })
        .then((res) =>
          res.json().then((data) => {
            localStorage.setItem("userLoggedIn", true);
            localStorage.setItem("loggedInUserId", data.data._id);

            setUser(data.data);
          })
        )
        .then(() => history.push("/"));
    }
    setErrorArray(errors);
  };

  return (
    <Wrapper>
      SignIn
      <Form id="userCreation">
        {formInfoNeeded.map((info) => {
          return (
            <FormHelper
              formSubErrors={errorArray}
              users={allUsers}
              label={info.label}
              input={info.input}
            />
          );
        })}
        <SubmitButton disabled={disabled} onClick={handleForm}>
          Submit
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  border: 2px solid black;
  margin-top: 50px;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
`;
export default Signup;

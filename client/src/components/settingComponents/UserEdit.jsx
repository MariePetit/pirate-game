import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

import { NotStyledButton } from "../../buttons/NotStyledButton";
import { checkPassword, checkIfValidEmail } from "../formValidationFunctions";

const UserEdit = ({ infoValue, infoKey, handleEditFunction }) => {
  const [keyName, setKeyName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newInfoValue, setNewInfoValue] = useState("");
  const [makingChanges, setMakingChanges] = useState(false);
  const [changeErrors, setChangeErrors] = useState([]);

  useEffect(() => {
    switch (infoKey) {
      case "userName":
        setKeyName("User Name");
        break;
      case "email":
        setKeyName("Email");
        break;
      case "avatarSrc":
        setKeyName("avatar");
        break;
      case "password":
        setKeyName("Password");
        break;
      case "joined":
        setKeyName("Joined");
        break;
      case "firstName":
        setKeyName("First Name");
        break;
      case "lastName":
        setKeyName("Last Name");
        break;
    }
  }, []);

  const handleOpenEditor = () => {
    if (!isEditing) {
      setNewInfoValue(infoValue);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (ev) => {
    setNewInfoValue(ev.target.value);
  };

  const handleCloseEdit = () => {
    setChangeErrors([]);
    setIsEditing(false);
  };

  const hiddenPasswordFunc = () => {
    let hiddenPass = "";
    if (infoValue) {
      for (let i = 0; i < infoValue.length; i++) {
        hiddenPass += "*";
      }
    }
    return hiddenPass;
  };

  const handleCheckInfo = () => {
    let errors = [];
    if (infoKey === "password") {
      let passwordErrors = checkPassword(newInfoValue);
      let newErrorArray = passwordErrors.filter(
        (passError) => passError.type === "password"
      );
      if (newErrorArray.length > 0) {
        errors = newErrorArray;
      }
    }
    if (infoKey === "email") {
      let emailErrors = checkIfValidEmail(newInfoValue);
      if (emailErrors.length > 0) {
        errors = emailErrors;
      }
    }

    console.log(errors);
    if (errors.length === 0) {
      setChangeErrors([]);
      setMakingChanges(true);
      handleEditFunction(
        infoValue,
        newInfoValue,
        infoKey,
        handleCloseEdit,
        setMakingChanges
      );
    } else {
      setChangeErrors(errors);
    }
  };

  return (
    <Wrapper>
      {keyName} :
      {isEditing ? (
        <>
          <EditInput
            errors={changeErrors.length > 0 ? true : false}
            onChange={handleChange}
            value={newInfoValue}
          />
          <CloseButton onClick={handleCloseEdit}>X</CloseButton>
          <SubmitButton
            disabled={!newInfoValue.length}
            onClick={handleCheckInfo}
          >
            Submit
          </SubmitButton>
          <div>{makingChanges && "Loading..."}</div>
        </>
      ) : (
        <>
          {infoKey !== "password" ? infoValue : hiddenPasswordFunc()}{" "}
          <EditButton onClick={handleOpenEditor}>Edit</EditButton>
        </>
      )}
    </Wrapper>
  );
};

const SubmitButton = styled(NotStyledButton)``;
const CloseButton = styled(NotStyledButton)``;

const EditInput = styled.input`
  border: ${({ errors }) => {
    return errors ? "1px solid red" : "1px solid black";
  }};
  outline: none;
`;

const Wrapper = styled.div``;

const EditButton = styled(NotStyledButton)``;

export default UserEdit;

import React, { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../components/UserContext";
import UserEdit from "../components/settingComponents/UserEdit";

const Profile = () => {
  //all the profile changes are below with 1 helper JS file (UserEdit.js)
  const {
    user: {
      userName,
      email,
      avatarSrc,
      password,
      joined,
      firstName,
      lastName,
      _id,
    },
    setUser,
  } = useContext(UserContext);
  const arrayOfUserInfo = [
    { email },
    { password },
    { firstName },
    { lastName },
  ];

  const handleEditFunction = (
    oldValue,
    newValue,
    infoKey,
    handleCloseEdit,
    setMakingChanges
  ) => {
    if (newValue !== oldValue) {
      let value = {};
      value[infoKey] = newValue;

      fetch(`/user/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      }).then(() => {
        fetch(`/user/${_id}`).then((res) => {
          res
            .json()
            .then(({ data }) => {
              setUser(data);
              setMakingChanges(false);
            })
            .then(() => {
              handleCloseEdit();
            });
        });
      });
    } else {
      handleCloseEdit();
    }
  };
  return (
    <Wrapper>
      <Title>Profile</Title>
      {arrayOfUserInfo.map((info, index) => {
        return (
          <UserEdit
            index={index}
            key={index}
            infoValue={Object.values(info)[0]}
            infoKey={Object.keys(info)[0]}
            handleEditFunction={handleEditFunction}
          ></UserEdit>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.div``;

export default Profile;

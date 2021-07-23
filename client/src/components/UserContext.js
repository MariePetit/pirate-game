import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [alivePirate, setAlivePirate] = useState({});

  useEffect(() => {
    if (user.pirates) {
      const pirateInArray = user.pirates.filter(
        (pirate) => pirate.isDead === false
      );

      setAlivePirate(pirateInArray[0]);
    }
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem("userLoggedIn")) {
      const _id = localStorage.getItem("loggedInUserId");

      fetch(`/user/${_id}`).then((res) =>
        res.json().then(({ data }) => {
          setUser(data);
        })
      );
    }
  }, []);

  console.log(alivePirate);

  return (
    <UserContext.Provider
      value={{ user, setUser, alivePirate, setAlivePirate }}
    >
      {children}
    </UserContext.Provider>
  );
};

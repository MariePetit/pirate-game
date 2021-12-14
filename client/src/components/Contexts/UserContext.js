import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);
// random comment!!
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [alivePirate, setAlivePirate] = useState({});
  const [update, setUpdate] = useState(false);
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
  }, [update]);
  return (
    <UserContext.Provider
      value={{ user, setUser, alivePirate, setAlivePirate, update, setUpdate }}
    >
      {children}
    </UserContext.Provider>
  );
};

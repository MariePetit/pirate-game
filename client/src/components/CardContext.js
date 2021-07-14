import React, { createContext, useEffect, useState } from "react";

export const CardContext = createContext(null);

export const CardProvider = ({ children }) => {
  const [eventCards, setEventCards] = useState([]);
  const [endCards, setEndCards] = useState([]);
  useEffect(() => {
    fetch("/cards").then((res) => {
      res.json().then(({ data }) => {
        let createdCards = data.eventCards.filter((eventCard) => {
          return eventCard.name !== "cardName";
        });

        setEventCards(createdCards);
        setEndCards(data.endCards);
      });
    });
  }, []);

  return (
    <CardContext.Provider value={{ eventCards, endCards }}>
      {children}
    </CardContext.Provider>
  );
};

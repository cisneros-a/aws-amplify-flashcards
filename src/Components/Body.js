import React, { useState, useEffect } from "react";
import CardContainer from "./CardContainer";
import { DataStore } from "@aws-amplify/datastore";
import { Cards } from "../models";

export default function Body({ selectedStack, selectStack }) {
  const [cards, setCards] = useState([]);

  const addCardToStack = async () => {
    const card = {
      stacksID: selectedStack.id,
      question: window.prompt("question"),
      answer: window.prompt("answer"),
    };
    try {
      const newCard = await DataStore.save(new Cards(card));
      console.log(newCard);
      setCards([...cards, newCard]);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const func = async () => {
      const cards = await DataStore.query(Cards, (card) =>
        card.stacksID("eq", selectedStack.id)
      );
      console.log("fetched cards", cards);
      setCards(cards);
    };
    func();
  }, []);

  return (
    <div className="body-container">
      <button onClick={() => selectStack(null)}> back </button>
      <h2>{selectedStack.title}</h2>

      {cards.length === 0 ? (
        <div> You currently have no cards!</div>
      ) : (
        <CardContainer cards={cards} addCardToStack={addCardToStack} />
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Cards } from "../models";
import { Card } from "antd";

export default function CardDisplay({ stack, selectStack }) {
  const [cards, setCards] = useState([]);
  //   const [query, setQuery] = useState(stack.id);
  const addCardToStack = async () => {
    const card = {
      stacksID: stack.id,
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
        card.stacksID("eq", stack.id)
      );
      console.log("fetched cards");
      setCards(cards);
    };
    func();
  }, []);

  return (
    <div className="card-container">
      <button onClick={() => selectStack(null)}> back </button>
      <h2>{stack.title}</h2>
      {cards.length === 0 ? (
        <div> You currently have no cards!</div>
      ) : (
        cards.map((card) => (
          <Card
            className="card"
            key={card.id}
            title={card.question}
            style={{ width: 500, borderBottom: 10 }}
          >
            <p>{card.question}</p>
          </Card>
        ))
      )}
      <button onClick={() => addCardToStack()}>Add a Card</button>
    </div>
  );
}

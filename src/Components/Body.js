import React, { useState, useEffect } from "react";
import CardsContainer from "./CardsContainer";
import ReviewCardContainer from "./ReviewCardContainer";
import { DataStore } from "@aws-amplify/datastore";
import { Cards } from "../models";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";

export default function Body({ selectedStack, selectStack }) {
  const [cards, setCards] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);

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
  }, [selectedStack.id]);

  return (
    <div className="body-container">
      <h2>{selectedStack.title}</h2>
      {cards.length === 0 ? (
        <div>
          You currently have no cards yet!
          <Button size="large" type="primary" onClick={() => addCardToStack()}>
            <PlusSquareOutlined /> Add
          </Button>
        </div>
      ) : (
        <div>
          {reviewMode ? (
            <ReviewCardContainer cards={cards} setReviewMode={setReviewMode} />
          ) : (
            <CardsContainer
              cards={cards}
              setReviewMode={setReviewMode}
              addCardToStack={addCardToStack}
            />
          )}
        </div>
      )}
    </div>
  );
}

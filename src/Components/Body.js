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

  const reviewCards = async () => {
    const res = await fetch(
      "https://dsgz55uj8d.execute-api.us-west-2.amazonaws.com/randomize",
      "this is a test string"
    );
    const data = await res.json();
    console.log(data);
    setReviewMode(true);
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
              setReviewMode={reviewCards}
              addCardToStack={addCardToStack}
            />
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import LargeCard from "./LargeCard";
import { Button } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

function useToggle(initialValue = false) {
  console.log("toggle");
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
}

export default function ReviewCardContainer({ setReviewMode, cards }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isOn, toggleIsOn] = useToggle();

  const nextCard = () => {
    if (currentCard + 1 === cards.length) {
      setCurrentCard(0);
    } else {
      setCurrentCard(currentCard + 1);
    }
  };

  const prevCard = () => {
    console.log(currentCard);
    if (currentCard - 1 < 0) {
      setCurrentCard(0);
    } else {
      setCurrentCard(currentCard - 1);
    }
  };

  return (
    <div className="review-card-container">
      <button onClick={() => setReviewMode(false)}> Back </button>
      <LargeCard
        toggle={toggleIsOn}
        description={
          isOn ? cards[currentCard].answer : cards[currentCard].question
        }
      ></LargeCard>
      <div className="cycle-card-buttons">
        <Button
          onClick={() => prevCard()}
          type="primary"
          danger
          disabled={currentCard === 0}
        >
          <DoubleLeftOutlined />
          Prev
        </Button>
        <Button onClick={() => nextCard()} type="primary" danger>
          Next
          <DoubleRightOutlined />
        </Button>
      </div>
    </div>
  );
}

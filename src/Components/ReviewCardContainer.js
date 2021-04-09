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
  const [currentCard, setCurrentCard] = useState(cards[0]);
  const [isOn, toggleIsOn] = useToggle();

  return (
    <div className="review-card-container" onClick={toggleIsOn}>
      <button onClick={() => setReviewMode(false)}> Back </button>
      <LargeCard
        // toggle={() => toggleIsOn}
        description={isOn ? currentCard.answer : currentCard.question}
      ></LargeCard>
      <div className="cycle-card-buttons">
        <Button type="primary" danger>
          <DoubleLeftOutlined />
          Prev
        </Button>
        <Button type="primary" danger>
          Next
          <DoubleRightOutlined />
        </Button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Card from "./Card";

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
    <div onClick={toggleIsOn}>
      <button onClick={() => setReviewMode(false)}> Back </button>
      <Card
        // toggle={() => toggleIsOn}
        description={isOn ? currentCard.question : currentCard.answer}
      ></Card>
    </div>
  );
}

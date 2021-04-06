import React from "react";
import CardComponent from "./Card";
import { Button } from "antd";

export default function Body({ cards, addCardToStack }) {
  //   const [query, setQuery] = useState(stack.id);

  return (
    <div className="card-container">
      <div className="card-container-card-type">
        <p>Question</p>
        <p>Answer</p>
      </div>

      {cards.map((card) => (
        <div key={card.id} className="card-section">
          <CardComponent description={card.question} />
          <CardComponent description={card.answer} />
        </div>
      ))}

      <Button type="secondary" onClick={() => addCardToStack()}>
        ADD +
      </Button>
    </div>
  );
}

import React from "react";
import CardComponent from "./Card";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";

export default function Body({ cards, setReviewMode, addCardToStack }) {
  return (
    <div className="card-container">
      <button onClick={() => setReviewMode(true)}> Review </button>
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
      <Button size="large" type="primary" onClick={() => addCardToStack()}>
        <PlusSquareOutlined /> Add
      </Button>
    </div>
  );
}

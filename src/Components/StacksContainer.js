import React from "react";

export default function StacksContainer({ stacks, selectStack }) {
  return (
    <div className="stacks-container">
      <h2>Your stacks</h2>
      {stacks.map((stack) => (
        <div
          onClick={() => selectStack(stack)}
          className="stack"
          key={stack.id}
        >
          {stack.title}
        </div>
      ))}
    </div>
  );
}

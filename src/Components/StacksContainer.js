import React from "react";
import { Divider } from "antd";

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
          <Divider />
        </div>
      ))}
    </div>
  );
}

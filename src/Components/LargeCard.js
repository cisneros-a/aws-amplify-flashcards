import React from "react";

export default function LargeCard({ description, toggle }) {
  return (
    <div onClick={() => toggle()}>
      <div className="large-card">
        <p>{description}</p>
      </div>
    </div>
  );
}

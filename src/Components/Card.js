import React from "react";

export default function Card({ description }) {
  return (
    <div>
      <div className="card">
        <p>{description}</p>
      </div>
    </div>
  );
}

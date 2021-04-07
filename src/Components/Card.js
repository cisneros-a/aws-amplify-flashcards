import React from "react";

export default function Card({ description, toggle }) {
  return (
    <div>
      <div className="card">
        <p>{description}</p>
      </div>
    </div>
  );
}

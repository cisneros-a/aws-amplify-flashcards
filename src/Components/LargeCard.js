import React from "react";

export default function LargeCard({ description }) {
  return (
    <div>
      <div className="large-card">
        <p>{description}</p>
      </div>
    </div>
  );
}

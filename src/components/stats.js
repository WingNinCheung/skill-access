import React from "react";
import "../styles/stats.css";

const Stats = ({ data }) => {
  // do not render if data is not available
  if (Object.keys(data).length === 0) {
    return null;
  }

  const candidate = data.candidate[0];

  return (
    <div className="stats-container">
      <div className="stats-item">
        <span className="stats-label">ID:</span>
        <span className="stats-value">{candidate.id}</span>
      </div>
      <div className="stats-item">
        <span className="stats-label">Communication Score:</span>
        <span className="stats-value">{candidate.communication_score}</span>
      </div>
      <div className="stats-item">
        <span className="stats-label">Coding Score:</span>
        <span className="stats-value">{candidate.coding_score}</span>
      </div>
      <div className="stats-item">
        <span className="stats-label">Title:</span>
        <span className="stats-value">{candidate.title}</span>
      </div>
      <div className="stats-item">
        <span className="stats-label">Company ID:</span>
        <span className="stats-value">{candidate.company.id}</span>
      </div>
      <div className="stats-item">
        <span className="stats-label">Company Fractal Index:</span>
        <span className="stats-value">{candidate.company.fractal_index}</span>
      </div>
      <div className="percentile-text">
        The percentile for your communication score:{" "}
        <span id="percentile1">
          {Math.round(data.communication_percentile)}th percentile
        </span>
      </div>
      <div className="percentile-text">
        The percentile for your coding score:{" "}
        <span id="percentile2">
          {Math.round(data.coding_percentile)}th percentile
        </span>
      </div>
    </div>
  );
};

export default Stats;

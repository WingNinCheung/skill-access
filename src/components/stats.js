import { useEffect, useState } from "react";

const Stats = ({ data }) => {
  // do not render if data are not avilable
  if (Object.keys(data).length === 0) {
    return null;
  }

  const candidate = data.candidate[0];

  return (
    <div>
      <div>Your Candidate data:</div>
      <div>
        <div>ID: {candidate.id}</div>
        <div>Communication Score: {candidate.communication_score}</div>
        <div>Coding Score: {candidate.coding_score}</div>
        <div>Title: {candidate.title}</div>
        <div>Company ID: {candidate.company.id}</div>
        <div>Company Fractal Index: {candidate.company.fractal_index}</div>
      </div>
      <div>
        *The percentile for your communication score:{" "}
        {Math.round(data.communication_percentile)}th percentile
      </div>
      <div>
        *The percentile for your coding score:{" "}
        {Math.round(data.coding_percentile)}th percentile
      </div>
    </div>
  );
};

export default Stats;

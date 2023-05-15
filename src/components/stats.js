import { useEffect, useState } from "react";
const Stats = ({ data }) => {
  // do not render if data are not avilable
  if (data.length === 0) {
    return null;
  }
  console.log(data.candidate[0].id);
  return (
    <div>
      <div>Your Candidate data:</div>
      <div>
        <div>ID: {data.candidate[0].id}</div>
        <div></div>
      </div>
    </div>
  );
};

export default Stats;

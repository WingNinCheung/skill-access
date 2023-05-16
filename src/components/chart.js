import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const Chart = ({ data }) => {
  const [plotData, setPlotData] = useState(null);

  const processChartData = () => {
    if (data && data.candidate && data.candidate.length > 0) {
      const codingScoresArray = data.coding_scores;
      const communicationScoresArray = data.communication_scores;
      const candidate = data.candidate[0];
      const candidateCodingScore = candidate.coding_score;
      const candidateCommunicationScore = candidate.communication_score;

      const plotData = [
        {
          y: codingScoresArray,
          type: "box",
          name: "Coding Scores",
          boxpoints: "all",
        },
        {
          x: ["Candidate"],
          y: [candidateCodingScore],
          type: "scatter",
          name: "Candidate Coding Score",
          mode: "markers",
          marker: {
            color: "red",
            symbol: "circle",
            size: 10,
          },
        },
        {
          y: communicationScoresArray,
          type: "box",
          name: "Communication Scores",
          boxpoints: "all",
        },
        {
          x: ["Communication"],
          y: [candidateCommunicationScore],
          type: "scatter",
          name: "Candidate Communication Score",
          mode: "markers",
          marker: {
            color: "purple",
            symbol: "circle",
            size: 10,
          },
        },
      ];

      setPlotData(plotData);
    }
  };

  useEffect(() => {
    processChartData();
  }, [data]);

  if (!plotData) {
    return null;
  }

  return (
    <div>
      <Plot
        data={plotData}
        layout={{
          title:
            "Coding and Communication Scores with Same Title and at Similar Companies.",
          legend: {
            x: 1,
            y: 1,
          },
          xaxis: {
            showticklabels: false, // Remove tick labels on the x-axis
          },
        }}
      />
    </div>
  );
};

export default Chart;

import React from "react";
import { Bar as BarChart } from "react-chartjs-2";

export const Chart = ({ datasets }) => {
  return (
    <BarChart
      data={datasets}
      width={600}
      height={400}
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: true,
                color: "rgba(255,255,255,0.1)",
                borderDash: [10, 10]
              },
              ticks: {
                stepSize: 2
              },
              scaleLabel: {
                display: true,
                labelString: "Minutes"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }}
    />
  );
};

export default Chart;

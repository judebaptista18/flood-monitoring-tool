import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ReadingsChart = ({ readings }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy existing chart
    }
    if (readings.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        responsive: true,
        type: "line",
        data: {
          labels: readings.map((reading) =>
            new Date(reading.dateTime).formatDateTime()
          ),
          datasets: [
            {
              label: "Water Level (m)",
              data: readings.map((reading) => reading.value),
              borderColor: "rgba(75, 192, 192, 1)",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: "Value",
              },
            },
          },
          plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16
                    }
                }
            }
        }
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [readings]);

  return (
    <div
      className="chart-container"
      id="line-graph"
    >
      <canvas ref={chartRef} />
    </div>
  );
};

export default React.memo(ReadingsChart);

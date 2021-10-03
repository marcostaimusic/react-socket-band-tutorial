import React, { useContext, useEffect } from "react";
import Chart from "chart.js/auto";
import { SocketContext } from "../context/SocketContext";

export const BandChart = () => {
  const { socket } = useContext(SocketContext);

  let myChart;

  useEffect(() => {
    socket.on("bandList", (bands) => {
      if (myChart) {
        myChart.destroy();
      }
      createChart(bands);
    });
  }, [socket]);

  const createChart = (bands = []) => {
    const labels = bands.map((band) => band.name);
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Bands",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: bands.map((band) => band.votes),
        },
      ],
    };

    const config = {
      type: "bar",
      data,
      options: {
        animation: false,
        indexAxis: "y",
      },
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
      },
    };

    var grapharea = document.getElementById("myChart").getContext("2d");

    myChart = new Chart(grapharea, config);
  };

  return <canvas id="myChart" height="100px"></canvas>;
};

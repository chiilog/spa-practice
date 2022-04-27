import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  title: null,
  xAxis: {
    title: {
      text: "年度",
    },
    categories: [
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
    ],
  },
  yAxis: {
    title: {
      text: "人口",
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: "#808080",
      },
    ],
  },
  series: [
    {
      name: "北海道",
      data: [
        23.5, 32.2, 45.6, 20.3, 15.3, 56.4, 49.9, 53.5, 55.5, 33.2, 46.3, 43.2,
      ],
    },
    {
      name: "京都府",
      data: [
        15.3, 18.2, 25.7, 23.1, 26.9, 27.4, 30.5, 38.6, 40.2, 48.3, 35.2, 25.4,
      ],
    },
    {
      name: "新潟県",
      data: [
        18.5, 22.5, 29.3, 37.1, 39.3, 45.8, 44.3, 48.2, 43.6, 40.3, 37.7, 33.0,
      ],
    },
    {
      name: "福岡県",
      data: [
        7.2, 6.3, 8.9, 10.2, 12.5, 16.2, 18.2, 17.3, 16.5, 12.8, 10.3, 13.9,
      ],
    },
    {
      name: "兵庫県",
      data: [
        36.6, 37.2, 39.1, 30.2, 30.9, 28.3, 25.3, 24.8, 23.3, 20.7, 18.3, 19.7,
      ],
    },
  ],
};

export const PopulationGraph: React.FC = () => (
  <div>
    <HighchartsReact highcharts={Highcharts} options={options} />
  </div>
);

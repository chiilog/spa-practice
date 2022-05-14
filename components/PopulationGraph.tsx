import React, { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

/**
 * データ提供年（横軸）の変数を作成する
 *  - RESAS側で1980-2045年（5年毎）の提供。
 *  - データ取得されるまで入らないのでベタで作成する
 */
const categories: number[] = [];
for (let i = 1980; i <= 2045; i = i + 5) {
  categories.push(i);
}

/**
 * チェックされた都道府県の総人口数のグラフを表示する
 *
 * @param checkedPrefectures
 * @constructor
 */
export const PopulationGraph: FC = () => {
  const options = {
    title: null,
    xAxis: {
      title: {
        text: "年度",
      },
      categories: categories,
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
    series: [{}],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

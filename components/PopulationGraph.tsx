import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

import { useData } from "../hooks/useData";
import { prefDataProps } from "../type/pref";

interface PopulationGraphProps {
  checkedPrefectures: prefDataProps[];
}

interface populationProps {
  name?: string;
  data?: { year: number; value: number }[];
}

/**
 * チェックされた都道府県の総人口数のグラフを作成する
 * -[x] 渡されたcheckedPrefecturesの値をもとにRESASの人口構成APIを使用して都道府県別の配列を作成する
 *   -[x] Highchartsのoptionで都道府県名が必要なので、都道府県名も忘れずオブジェクトに入れておく
 * - 取得した都道府県別の人口構成から必要なデータのみに絞った配列を作成する
 *   -[x] {name: 都道府県名, data: "RESASの総人口の配列の中身"} の配列を作成する
 *      - HighchartsReact のoption -> series （都道府県別人口）に入れる
 *   - 年度（横軸）の配列を作成する
 *      - HighchartsReact のoption -> categories （年度）に入れる
 *
 * @param checkedPrefectures
 * @constructor
 */
export const PopulationGraph: React.FC<PopulationGraphProps> = ({
  checkedPrefectures,
}) => {
  const [population, setPopulation] = useState<populationProps[]>([]);

  useEffect(() => {
    checkedPrefectures?.map(({ prefCode, prefName }) => {
      // FIXME: url -> `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${checkedPrefecture}`;
      const url = "../dammy/perYear.json";

      axios
        .get(url, {
          headers: { "X-API-KEY": `${process.env.NEXT_PUBLIC_RESAS_API_KEY}` },
        })
        .then((res) => {
          if (res.data.statusCode === "403" || res.data.statusCode === "404") {
            return;
          }

          setPopulation([
            ...population,
            {
              name: prefName,
              data: res.data.result.data[0].data,
            },
          ]);
        });
    });
  }, [checkedPrefectures]);

  /**
   * 年度
   */
  const categories: string[] = [];
  // population[0]?.data.forEach(({ value, year }) => {
  //   categories.push(String(year));
  // });

  /**
   * 都道府県別人口
   */
  const series: { name: string; data: number[] }[] = [
    {
      name: "北海道",
      data: [
        23.5, 32.2, 45.6, 20.3, 15.3, 56.4, 49.9, 53.5, 55.5, 33.2, 46.3, 43.2,
      ],
    },
  ];

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
    series: series,
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

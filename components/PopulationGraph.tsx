import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

import { prefDataProps } from "../type/pref";

interface PopulationGraphProps {
  checkedPrefectures: prefDataProps[];
}

interface populationProps {
  name?: string;
  data?: number[];
}

/**
 * データ提供年
 * - RESAS側で1980-2045年（5年毎）の提供。
 * - データ取得されるまで入らないのでベタで作成する
 */
const categories: number[] = [];
for (let i = 1980; i <= 2045; i = i + 5) {
  categories.push(i);
}

/**
 * チェックされた都道府県の総人口数のグラフを作成する
 * -[x] 渡されたcheckedPrefecturesの値をもとにRESASの人口構成APIを使用して都道府県別の配列を作成する
 *   -[x] Highchartsのoptionで都道府県名が必要なので、都道府県名も忘れずオブジェクトに入れておく
 * - 取得した都道府県別の人口構成から必要なデータのみに絞った配列を作成する
 *   -[x] {name: 都道府県名, data: "RESASの総人口の配列の中身"} の配列を作成する
 *      - HighchartsReact のoption -> series （都道府県別人口）に入れる
 *   - [x]年度（横軸）の配列を作成する
 *      - [x]HighchartsReact のoption -> categories （年度）に入れる
 * -[] チェックを消したときにグラフを消す
 *   -[] population の配列の中にチェックを消した都道府県が存在するかチェックする
 *   -[] 存在しない場合、filterで該当する都道府県を含まない配列を作成する
 *
 * @param checkedPrefectures
 * @constructor
 */
export const PopulationGraph: React.FC<PopulationGraphProps> = ({
  checkedPrefectures,
}) => {
  const [population, setPopulation] = useState<populationProps[]>([]);

  useEffect(() => {
    checkedPrefectures?.map(({ prefName, checked }) => {
      // TODO: url -> `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${checkedPrefecture}`;
      const url = "../dammy/perYear.json";

      axios
        .get(url, {
          headers: { "X-API-KEY": `${process.env.NEXT_PUBLIC_RESAS_API_KEY}` },
        })
        .then((res) => {
          if (res.data.statusCode === "403" || res.data.statusCode === "404") {
            return;
          }

          const result: { year: number; value: number }[] =
            res.data.result.data[0].data;
          const data: number[] = [];

          result.map(({ value }) => {
            data.push(value);
          });

          // FIXME: 正確にとれてない。バグってる。複数回はしってる？
          if (checked) {
            console.log("まだないよ");
            setPopulation([
              ...population,
              {
                name: prefName,
                data: data,
              },
            ]);
          } else {
            setPopulation(population.filter(({ name }) => name !== prefName));
          }
        });
    });
  }, [setPopulation, checkedPrefectures]);

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
    series: population,
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

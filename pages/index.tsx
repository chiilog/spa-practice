import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { prefDataProps } from "../type/pref";
import { useData } from "../hooks/useData";
import { PrefecturesList } from "../components/PrefecturesList";
import { PopulationGraph } from "../components/PopulationGraph";

/**
 * 都道府県別の総人口推移グラフを表示するSPA(Single Page Application)の構築
 *
 * @constructor
 */
const Home: NextPage = () => {
  // RESAS-APIの都道府県一覧APIを使用して都道府県を取得する
  // TODO: api -> `https://opendata.resas-portal.go.jp/api/v1/prefectures`;
  const { data: prefecturesData, isError: prefecturesIsError } = useData(
    "../dammy/prefectures.json"
  );

  /**
   * チェックされた都道府県一覧を格納する変数の作成
   */
  const [prefData, setPrefData] = useState<prefDataProps[]>([]);

  /**
   * チェックされた都道府県別の人口数を格納する変数の作成
   */
  const [populationData, setPopulationData] = useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  useEffect(() => {
    /**
     * populationが0件のときの表示
     */
    if (populationData.length === 0) {
      setPopulationData([{ name: "都道府県", data: [] }]);
    }

    /**
     * チェックされた都道府県の人口構成を取得する
     *  - API URL - api/v1/population/composition/perYear?prefCode=${prefCode}
     *  - populationDataに該当する都道府県のオブジェクトを追加する
     *   - 型はHighcharts JSの仕様に合わせて { name: string, data: number[] }
     */

    /**
     * チェックを外した都道府県の人口構成を削除する
     *  - populationDataから該当する都道府県のオブジェクトを削除する
     */
  }, [populationData]);

  return (
    <>
      <Head>
        <title>都道府県別の総人口推移グラフ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <h1 className="text-xl md:text-2xl text-center bg-red-200 p-4 md:p-8 font-semibold">
          都道府県別の総人口推移グラフ
        </h1>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-lg font-semibold mb-4">都道府県</h2>
          {!prefecturesIsError && (
            <PrefecturesList
              prefectures={prefecturesData}
              prefData={prefData}
              setPrefData={setPrefData}
            />
          )}
        </div>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-lg font-semibold mb-4">人口数</h2>
          <PopulationGraph series={populationData} />
        </div>
      </>
    </>
  );
};

export default Home;

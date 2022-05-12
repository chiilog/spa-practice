import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { prefDataProps } from "../type/pref";
import { useData } from "../hooks/useData";
import { PrefecturesList } from "../components/PrefecturesList";
import { PopulationGraph } from "../components/PopulationGraph";

/**
 * チェックされた都道府県の総人口グラフを表示する
 * -[x] input 付きの都道府県リストの表示
 * - 人口数グラフの表示（HighchartsReactを利用）
 *
 * @constructor
 */
const Home: NextPage = () => {
  // TODO: api -> `https://opendata.resas-portal.go.jp/api/v1/prefectures`;
  const { data: prefecturesData, isError: prefecturesIsError } = useData(
    "../dammy/prefectures.json"
  );

  const [prefData, setPrefData] = useState<prefDataProps[]>([]);

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
          <PopulationGraph checkedPrefectures={prefData} />
        </div>
      </>
    </>
  );
};

export default Home;

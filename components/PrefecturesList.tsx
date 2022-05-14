import React from "react";

import { PrefectureDataProps } from "../type/pref";

interface PrefecturesListProps {
  prefectures: PrefectureDataProps[];
  PrefectureData: PrefectureDataProps[];
  setPrefectureData: (Parameter: PrefectureDataProps[]) => void;
}

/**
 * [x] input + 都道府県名のリストを表示して、チェック状態を取得する
 * -[x] prefectures で渡ってきた引数から都道府県一覧を表示する
 * -[x] チェックされた都道府県の prefCode と prefName を取得する
 *   -[x] prefNameを表示するcheckboxを表示する
 *   -[x] checkboxを選択すると、選択したprefNameとprefCodeを取得する
 * -[x] 取得したprefCodeとprefNameを渡せるようにする
 *   -[x] 取得したprefNameとprefCodeをstateに保存する
 *   -[x] チェックしたprefNameとprefCodeを配列で保存する
 *
 * @param prefectures
 * @param PrefectureData
 * @param setPrefectureData
 * @constructor
 */
export const PrefecturesList: React.FC<PrefecturesListProps> = ({
  prefectures,
  PrefectureData,
  setPrefectureData,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {prefectures?.map(({ prefCode, prefName, checked }) => (
        <div key={prefName}>
          <label>
            <input
              type="checkbox"
              name="prefectures"
              value={prefName}
              onChange={(event) => {
                /**
                 * チェックした都道府県がすでにprefData内に存在するかどうかのチェック
                 */
                // TODO: 要リファクタリング
                if (
                  PrefectureData.find(
                    ({ prefName }) => prefName === event.target.value
                  )
                ) {
                  const delPrefData = PrefectureData.map((elm) => {
                    if (elm.prefName === event.target.value) {
                      return { ...elm, checked: event.target.checked };
                    } else {
                      return elm;
                    }
                  });
                  setPrefectureData(delPrefData);
                } else {
                  setPrefectureData([
                    ...PrefectureData,
                    { prefCode, prefName, checked: event.target.checked },
                  ]);
                }
              }}
            />
            <span className="pl-2">{prefName}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

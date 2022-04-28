import React from "react";

import { prefDataProps } from "../type/pref";

interface PrefecturesListProps {
  prefectures: prefDataProps[];
  prefData: prefDataProps[];
  setPrefData: (Parameter: prefDataProps[]) => void;
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
 * @param prefData
 * @param setPrefData
 * @constructor
 */
export const PrefecturesList: React.FC<PrefecturesListProps> = ({
  prefectures,
  prefData,
  setPrefData,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {prefectures?.map(({ prefCode, prefName }) => (
        <div key={prefName}>
          <label>
            <input
              type="checkbox"
              name="prefectures"
              value={prefName}
              onChange={(event) => {
                // TODO: リファクタリングできそう
                event.target.checked
                  ? setPrefData([...prefData, { prefCode, prefName }])
                  : setPrefData(
                      prefData.filter(
                        (elm) => elm.prefName !== event.target.value
                      )
                    );
              }}
            />
            <span className="pl-2">{prefName}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

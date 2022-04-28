import React from "react";

import { prefDataProps } from "../type/pref";

interface PrefecturesListProps {
  prefectures: prefDataProps[];
  setPrefData: (Parameter: { prefCode?: number; prefName?: string }) => void;
}

/**
 * input + 都道府県名のリストを表示して、チェック状態を取得する
 * -[x] prefectures で渡ってきた引数から都道府県一覧を表示する
 * -[x] チェックされた都道府県の prefCode と prefName を取得する
 *   -[x] prefNameを表示するcheckboxを表示する
 *   -[x] checkboxを選択すると、選択したprefNameとprefCodeを取得する
 * - 取得したprefCodeとprefNameを渡せるようにする
 *   -[x] 取得したprefNameとprefCodeをstateに保存する
 *   - チェックしたprefNameとprefCodeを配列で保存する
 *   - stateにデータがある場合、RESASのAPIを呼び出す
 *   - APIのBodyにはprefNameとprefCodeを含める
 *
 * @param prefectures
 * @param setPrefData
 * @constructor
 */
export const PrefecturesList: React.FC<PrefecturesListProps> = ({
  prefectures,
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
                event.target.checked
                  ? setPrefData({ prefCode, prefName })
                  : setPrefData({});
              }}
            />
            <span className="pl-2">{prefName}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

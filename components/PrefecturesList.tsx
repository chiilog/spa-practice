import React from "react";

import { PrefectureDataProps } from "../type/pref";

interface PrefecturesListProps {
  prefectures: PrefectureDataProps[];
  onChangeEvent: (
    prefCode: number | undefined,
    prefName: string,
    checked: boolean
  ) => void;
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
 * @param onChangeEvent
 * @constructor
 */
export const PrefecturesList: React.FC<PrefecturesListProps> = ({
  prefectures,
  onChangeEvent,
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
              onChange={(event) =>
                onChangeEvent(
                  prefCode,
                  event.target.value,
                  event.target.checked
                )
              }
            />
            <span className="pl-2">{prefName}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

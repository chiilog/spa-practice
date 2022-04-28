import React from "react";

interface PrefecturesListProps {
  prefectures: {
    prefCode: number;
    prefName: string;
  }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * input + 都道府県名のリストを表示して、チェック状態を取得する
 * - prefectures で渡ってきた引数から都道府県一覧を表示する
 * - チェックされた都道府県の prefCode を渡せるようにする
 *
 * @param prefectures
 * @param onChange
 * @constructor
 */
export const PrefecturesList: React.FC<PrefecturesListProps> = ({
  prefectures,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {prefectures?.map(({ prefCode, prefName }) => (
        <div key={prefName}>
          <label>
            <input
              type="checkbox"
              name="prefectures"
              value={prefCode}
              onChange={onChange}
            />
            <span className="pl-2">{prefName}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

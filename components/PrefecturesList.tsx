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
 * input + 都道府県名のリストを表示する
 *
 * @param prefectures
 * @param onChangeEvent
 * @constructor
 */
export const PrefecturesList: React.FC<PrefecturesListProps> = ({
  prefectures,
  onChangeEvent,
}) => (
  <div className="grid grid-cols-4 gap-4">
    {prefectures?.map(({ prefCode, prefName }) => (
      <div key={prefName}>
        <label>
          <input
            type="checkbox"
            name="prefectures"
            value={prefName}
            onChange={(event) =>
              onChangeEvent(prefCode, event.target.value, event.target.checked)
            }
          />
          <span className="pl-2">{prefName}</span>
        </label>
      </div>
    ))}
  </div>
);

import React, { useState } from "react";

interface PrefecturesListProps {
  prefectures:
    | {
        prefCode: number;
        prefName: string;
      }[]
    | null;
}

export const PrefecturesList: React.FC<PrefecturesListProps> = ({
  prefectures,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {prefectures &&
        prefectures.map(({ prefName }) => (
          <div key={prefName}>
            <label>
              <input type="checkbox" name="prefectures" value={prefName} />
              <span className="pl-2">{prefName}</span>
            </label>
          </div>
        ))}
    </div>
  );
};

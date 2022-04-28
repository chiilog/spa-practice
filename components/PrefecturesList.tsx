import React, { useState } from "react";

interface PrefecturesListProps {
  prefectures: {
    prefCode: number;
    prefName: string;
  }[];
}

export const PrefecturesList: React.FC<PrefecturesListProps> = ({
  prefectures,
}) => (
  <div className="grid grid-cols-4 gap-4">
    {prefectures?.map(({ prefName }) => (
      <div key={prefName}>
        <label>
          <input type="checkbox" name="prefectures" value={prefName} />
          <span className="pl-2">{prefName}</span>
        </label>
      </div>
    ))}
  </div>
);

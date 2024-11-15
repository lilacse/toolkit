"use client";

import { useState } from "react";

export default function UuidGenerator() {
  const [isGenerated, setGenerated] = useState(false);
  const [uuidCount, setUuidCount] = useState(1);
  const [isShowDashes, setShowDashes] = useState(true);
  const [uuids, setUuids] = useState<(string | JSX.Element)[]>([]);

  function generateUuids() {
    const result = [];

    if (uuidCount <= 0) return;

    for (let i = 0; i < uuidCount; i++) {
      let uuid = crypto.randomUUID();
      if (!isShowDashes) uuid = uuid.replaceAll("-", "");
      result.push(uuid);
      result.push(<br />);
    }

    setUuids(result);
    setGenerated(true);
  }

  return (
    <div>
      <h2 className="font-bold text-xl text-center pb-8">UUID Generator</h2>
      <div>
        <div className="w-[90%] md:w-3/4 m-auto">
          <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 pb-8">
            <label htmlFor="count-input" className="w-full md:w-1/2">
              Number of UUIDs to generate:
            </label>
            <input
              id="count-input"
              type="number"
              value={uuidCount}
              min={1}
              step={1}
              className="flex-1 outline-none border-b-2 border-slate-200 focus:border-slate-400"
              onChange={(e) => setUuidCount(Number(e.currentTarget.value))}
            ></input>
          </div>
          <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 pb-8">
            <label htmlFor="show-dashes-input" className="w-1/2 flex-1">
              Show dashes:
            </label>
            <input
              id="show-dashes-input"
              type="checkbox"
              checked={isShowDashes}
              className="text-right md:text-left"
              onChange={(e) => setShowDashes(e.currentTarget.checked)}
            ></input>
          </div>
          <div className="text-center pb-8">
            <button
              type="button"
              className="w-full md:w-3/4 h-12 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-semibold shadow-sm rounded-md"
              onClick={() => generateUuids()}
            >
              Generate
            </button>
          </div>
          <div className={isGenerated ? "" : "hidden"}>
            <div className="text-gray-500 w-full md:w-3/4 pb-2 text-sm m-auto">
              *Triple click to highlight a row on most browsers.
            </div>
            <div
              id="result"
              className="resize-none outline-none w-full md:w-3/4 border-2 border-slate-400 focus:border-slate-600 rounded-md p-4 text-left m-auto"
            >
              {uuids}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

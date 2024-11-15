"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

class ToolkitModule {
  name: string;
  description: string;
  path: string;

  constructor(name: string, description: string, path: string) {
    this.name = name;
    this.description = description;
    this.path = path;
  }
}

export default function Switcher() {
  const modules = [
    new ToolkitModule("Delimiter", "Process string delimiters", "delimiter"),
    new ToolkitModule("JSON Formatter", "Pretty print JSON", "json-formatter"),
    new ToolkitModule("UUID Generator", "Generate UUIDs", "uuid-generator"),
  ];

  function searchModules(keyword: string): ToolkitModule[] {
    const result: ToolkitModule[] = [];
    for (const m of modules) {
      if (m.name.toLocaleLowerCase().startsWith(keyword.toLocaleLowerCase())) {
        result.push(m);
      }
    }
    return result;
  }

  function getSearchResults(keyword: string): JSX.Element[] {
    const results = searchModules(keyword);
    return results.map((r) => (
      <a
        key={r.path}
        href={r.path}
        className="w-full h-16 flex flex-col p-2 hover:bg-slate-50"
      >
        <div>
          <span className="font-semibold">{r.name}</span>
          <br></br>
          <span className="font-thin">{r.description}</span>
        </div>
      </a>
    ));
  }

  const [searchResults, setSearchResults] = useState(getSearchResults(""));
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <div
      className={
        "absolute w-full h-full top-0 " + (isSearchActive ? "z-10" : "-z-10")
      }
      onClick={() => setIsSearchActive(false)}
    >
      <div className="w-full justify-center items-center flex flex-col h-fit py-12 px-4 md:px-12 gap-4 z-20">
        <div className="peer w-[90%] md:w-3/4 h-16 flex bg-slate-100 border-slate-500 shadow-md items-center p-4 rounded-md has-[:focus]:border-2">
          <input
            className="w-full h-10 bg-slate-100 m-2 outline-none"
            placeholder="Search..."
            onChange={(e) => {
              setSearchResults(getSearchResults(e.target.value));
              setIsSearchActive(true);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsSearchActive(true);
            }}
            autoFocus={usePathname() === "/" ? true : false}
          />
        </div>
        {isSearchActive ? (
          <div className="w-[90%] md:w-3/4 max-h-60 flex flex-col bg-slate-100 border-slate-400 shadow-md items-center justify-start p-4 rounded-md overflow-x-hidden overflow-y-scroll">
            {searchResults}
          </div>
        ) : null}
      </div>
    </div>
  );
}

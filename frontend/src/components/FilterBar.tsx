import React, {useState} from "react";

export type FilterBarProps = {
  onApply: (filterString: string) => void,
}

export function FilterBar({onApply}: FilterBarProps) {
  let [filterString, setFilterString] = useState("");

  let handleChange = (event) => {
    // onApply(filterString); // this is a bad idea, if you want to do this: use lodash.debounce!
    setFilterString(event.target.value);
  };

  let handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onApply(filterString);
    }
  };

  return (
    <div>
      <label className={"label label-text doggrFlexCenter"} htmlFor="filter">Filter Matches:</label> &nbsp;
      <input
        className={"input input-bordered input-xs "}
        id="filter"
             type="text"
             value={filterString}
             onChange={handleChange}
             onKeyDown={handleKeyDown}
      /> &nbsp;
      <button className={"btn btn-xs"} onClick={() => onApply(filterString)}>Apply</button>
    </div>
  );
}

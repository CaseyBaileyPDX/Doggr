import {Profile as ProfileType} from "../types/StateTypes";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import {FilterBar} from "./FilterBar";

export type MsgBoxState = {
  sender_id: number,
  receiver_id: number,
}

export type MatchHistoryProfileProps = ProfileType & { onUnmatchButtonClick: (id: number) => void }

export function MatchHistoryProfile(props) {
  let {
    id,
    thumbUri,
    name,
    onUnmatchButtonClick
  } = props;

  const navigate = useNavigate();

  let onMessageButtonClick = (id) => {
    const state: MsgBoxState = {
      sender_id: 1,
      receiver_id: 1
    };
    navigate("/messages", {state: state});
  };

  useEffect(() => {
    console.log(`Match History Profile ${name} rerendered`);
  });

  return <div>
    <img className="rounded-box object-center" src={thumbUri} alt=""/><br />
    {name}
    &nbsp;
    <button className="doggrbtn" onClick={() => onUnmatchButtonClick(id)}>Unmatch</button>
    <button className="doggrbtn" onClick={() => onMessageButtonClick(id)}>Message</button>
  </div>;
}

export type MatchHistoryProps = {
  likeHistory: Array<ProfileType>,
  onUnmatchButtonClick: (id: number) => void,
}

export function MatchHistory({
  likeHistory,
  onUnmatchButtonClick
}: MatchHistoryProps) {
  let [filterString, setFilterString] = useState("");

  let profilesToDisplay = useMemo(
    () => likeHistory.filter(s => s.name.includes(filterString)),
    [likeHistory, filterString]
  );

  useEffect(() => {
    console.log("Match History rerendered");
  });

  let filterBar = <FilterBar onApply={setFilterString}/>;

  return (
    <div className={"doggrcenter"}>
      <div className={"doggrcenter text-2xl underline"}>Past matches</div>
      {filterBar}
      <br/>
      {profilesToDisplay.map(
        profile =>
          <MatchHistoryProfile
            onUnmatchButtonClick={onUnmatchButtonClick}
            key={profile.id}
            {...profile} />
      )}
    </div>
  );
}

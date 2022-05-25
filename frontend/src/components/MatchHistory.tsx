import {Profile as ProfileType} from "../types/StateTypes";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import {FilterBar} from "./FilterBar";
import {getPayloadFromToken, useAuth} from "../services/AuthService";
import {Message} from "../services/MessageService";
import {Match} from "../services/MatchService";

export type MsgBoxState = {
  sender_id: number,
  receiver_id: number,
}

export type MatchHistoryProfileProps = ProfileType & { onUnmatchButtonClick: (id: number) => void }

export function MatchHistoryProfile(props) {
  const context = useAuth();
  let {
    id,
    profileUrl,
    name,
    userId,
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

  return <div className="mt-5 flex flex-row">
    <div className="rounded-box doggr-match-history-img">
      <img src={profileUrl} alt=""/>
    </div>
    <div className="w-64 flex flex-wrap justify-center">
      <span className="w-64 ml-2 text-center">{name}</span>
      <div className="grow-0">
        <button className="doggrbtn" onClick={() => onUnmatchButtonClick(id)}>Unmatch</button>
        <button className="doggrbtn" onClick={() => onMessageButtonClick(id)}>Message</button>
      </div>
    </div>
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
  let [profilesToDisplay, setProfilesToDisplay] = useState([]);

  // let profilesToDisplay = useMemo(
  //   () => likeHistory.filter(s => s.name.includes(filterString)),
  //   [likeHistory, filterString]
  // );

  //let profilesToDisplay =

  useEffect(() => {
    console.log("Match History rerendered");
    setProfilesToDisplay()
  });

  let filterBar = <FilterBar onApply={setFilterString}/>;

  return (
    <div className="doggrcenter">
      <div className="doggrcenter doggr-section-text">Past matches</div>
      {filterBar}
      <br/>
      {profilesToDisplay.map(
        profile =>
          <MatchHistoryProfile
            onUnmatchButtonClick={onUnmatchButtonClick}
            key={profile.name}
            {...profile} />
      )}
    </div>
  );
}

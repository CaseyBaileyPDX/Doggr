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

//export type MatchHistoryProfileProps = ProfileType & { setShouldRefresh: (value: boolean) => void }

export function MatchHistoryProfile(props) {
  const context = useAuth();
  let {
    id,
    profileUrl,
    name,
    userId,
    setShouldRefresh
  } = props;

  const navigate = useNavigate();

  let onMessageButtonClick = (id) => {
    const state: MsgBoxState = {
      sender_id: 1,
      receiver_id: 1
    };
    navigate("/messages", {state: state});
  };

  let onUnmatch = async(receiver_id) => {
    let sender_id = getPayloadFromToken(context?.token).id;
    try {
      let unmatchRes = await Match.unmatch(sender_id, receiver_id);
    } catch (err) {
      console.log("Error unmatching: ", err);
    }

    console.log("Setting should refresh to true");
    setShouldRefresh(true);
  }

  return <div className="mt-5 flex flex-row">
    <div className="rounded-box doggr-match-history-img">
      <img src={profileUrl} alt=""/>
    </div>
    <div className="w-64 flex flex-wrap justify-center">
      <span className="w-64 ml-2 text-center">{name}</span>
      <div className="grow-0">
        <button className="doggrbtn" onClick={() => onUnmatch(id)}>Unmatch</button>
        <button className="doggrbtn" onClick={() => onMessageButtonClick(id)}>Message</button>
      </div>
    </div>
  </div>;
}

async function GetMatches(token) {
  let payload = getPayloadFromToken(token);
  let userId = payload.id;
  return Match.getMatchesForUser(payload.id);
}


export function MatchHistory() {

  let context = useAuth();

  let [profilesToDisplay, setProfilesToDisplay] = useState<any[]>([]);
  let [shouldRefresh, setShouldRefresh] = useState(true);

  useEffect(() => {
    console.log("Match History rerendered");
    const fetchData = async() => {
      try {
        let matches = await GetMatches(context?.token);
        console.log("Fetched matches to display: ", matches);
        setProfilesToDisplay(matches);

      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
    setShouldRefresh(false);
  }, [shouldRefresh]);

  return (
    <div className="doggrcenter">
      <div className="doggrcenter doggr-section-text">Past matches</div>
      <br/>
      {profilesToDisplay.map(
        profile =>
          <MatchHistoryProfile
            key={profile.id}
            setShouldRefresh ={setShouldRefresh}
            {...profile} />
      )}
    </div>
  );
}

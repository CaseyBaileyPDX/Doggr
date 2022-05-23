import React, {useEffect} from "react";
import {getPayloadFromToken, useAuth} from "../services/AuthService";
import {Match} from "../services/MatchService";

export type ProfileProps = {
  id: number,
  name: string,
  userId: string,
  profileUrl: string,
  onLikeButtonClick: () => void,
  onPassButtonClick: () => void,
}

export function Profile(props: ProfileProps) {
  let context = useAuth();
  let {
    profileUrl,
    name,
    onLikeButtonClick,
    onPassButtonClick
  } = props;

  const sendMatch = async () => {
    onLikeButtonClick();
    console.log("Sending match");
    let payload = getPayloadFromToken(context?.token);
    let senderId = payload.id;
    console.log(senderId);
    const result = await Match.send( senderId, "b");

  }

  useEffect(() => {
    console.log("Profile rerendered");
  });

  return (
    <div className="doggrBox rounded-box">
      <h2 className="grid doggrcenter text-2xl text-blue-600">{name}</h2>
      <img src={profileUrl} className="rounded-lg doggr-profile-img" alt="Profile of pet"/>
      {context?.token != null ?
        (
          <div className="form-control-sm max-w-2xs doggrFlexCenter">
            <button className="doggrCircleBtn" onClick={onPassButtonClick}>Pass</button>
            <button className="doggrCircleBtn" onClick={sendMatch}>Like</button>
          </div>
        ) : null
      }
    </div>
  );
}

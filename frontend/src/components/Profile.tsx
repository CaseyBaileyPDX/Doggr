import React, {useEffect} from "react";
import {useAuth} from "../services/AuthService";

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
            <button className="doggrCircleBtn" onClick={onLikeButtonClick}>Like</button>
          </div>
        ) : null
      }
    </div>
  );
}

import React, {useEffect} from "react";

export type ProfileProps = {
  id: number,
  imgUri: string,
  name: string,
  onLikeButtonClick: () => void,
  onPassButtonClick: () => void,
}

export function Profile(props: ProfileProps) {
  let {
    imgUri,
    name,
    onLikeButtonClick,
    onPassButtonClick
  } = props;

  useEffect(() => {
    console.log("Profile rerendered");
  });

  return (
    <div className={"doggrBox rounded-box"}>
      <h2 className={"grid doggrcenter text-2xl text-blue-600"}>{name}</h2>
      <img src={imgUri} className={"rounded-lg"} alt="Profile of pet"/>
      <div className={"form-control-sm max-w-2xs doggrFlexCenter"}>
        <button className={"doggrCircleBtn"} onClick={onPassButtonClick}>Pass</button>
        <button className={"doggrCircleBtn"} onClick={onLikeButtonClick}>Like</button>
      </div>
    </div>
  );
}

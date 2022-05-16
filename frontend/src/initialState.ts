import random from "lodash.random";
import { State, Profile } from "./types/StateTypes";


const initialState: State = {
  currentProfile: getRandomProfile(),
  likeHistory: [getRandomProfile(), getRandomProfile()], // change these to use database random
  passHistory: [],
};

export default initialState;

export function getRandomProfile(): Profile {
  const idNum = random(0, 100000000000, false);

  return {
    imgUri: `http://localhost:8000//doggr/profile1.jpg`,
    thumbUri: `https://loremflickr.com/75/75/animal?lock=${idNum}`,
    name: `Doggr${idNum}`,
    id: idNum,
  };
}

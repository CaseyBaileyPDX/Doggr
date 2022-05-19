import { State } from "./types/StateTypes";
import {getRandomProfile} from "./services/ProfileService";

async function getInitialState(): Promise<State> {
  return {
    currentProfile: await getRandomProfile(),
    likeHistory: [], // change these to use database random
    passHistory: [],
  }
}

export default getInitialState;
//
// export function getRandomProfile(): Profile {
//   const idNum = random(0, 100000000000, false);
//
//   return {
//     imgUri: `http://localhost:8000/doggr/profile1.jpg`,
//     thumbUri: `https://loremflickr.com/75/75/animal?lock=${idNum}`,
//     name: `Doggr${idNum}`,
//     id: idNum,
//   };
// }

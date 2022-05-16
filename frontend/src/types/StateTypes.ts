export type State = {
  currentProfile: Profile,
  likeHistory: Array<Profile>,
  passHistory: Array<Profile>,
};

export type Profile = {
  id: number,
  name: string,
  userId: string,
  profileUrl: string,
}

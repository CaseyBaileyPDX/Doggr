import {Match} from "../database/models/Match";
import {User} from "../database/models/User";
import {Profile} from "../database/models/Profile";

export const CreateMatch = async (req, res) => {

  const {
    sender_id,
    receiver_id
  } = req.body;

  Match.create({
    sender_id,
    receiver_id
  })
    .then(() => {
      console.log("Created Match");
      res.status(200)
        .json({message: "Created Match successfully"});
    })
    .catch((err) => {
      console.log('failed to create Match');
      console.log(err);
      res.status(500)
        .json({message: err});
    });
};

export const Unmatch = async (req, res) => {
  const { match_id } = req.body;
  return Match.destroy({
    where: { id: match_id }
  });
}

export async function GetMatchesForUser(req, res) {
  let sender_id = req.body.sender_id;
  let matches: any[] = await Match.findAll({
    where: {
      sender_id
    },
    include: [User, Profile]
  });

  //console.log(matches);
  //matches.forEach(match => console.log("ONE MATCH HERE", match));

  let profiles = [];

  matches.forEach((match: any) => {
    let id = match.id;
    let userId = match.receiver_id;
    let user = match.user;
    let profileUrl = match.profile.profileUrl;
    let name = match.profile.name;
    let receiver_email = match.user.email;

    profiles.push({
      id,
      profileUrl,
      name,
      userId
    });
    // console.log("One match data receiver id is: ", data);
    // console.log("One match user is: ", user);
    // console.log("One match receiver email is: ", receiver_email);
    // console.log("One match PROFILE is ", profile);
  });
  //const matchUser = await matches.getUser();
  //matches.forEach(match => console.log("USER HERE", match.user));
  // console.log("FIRST MATCH HERE ", matches[0]);
  // console.log("FIRST USER HERE", matches[0].user);
  // console.log("SECOND MATCH HERE ", matches[1]);
  // console.log("SECOND USER HERE", matches[1].user);
  console.log(profiles);
  res.status(200).json(profiles);

}

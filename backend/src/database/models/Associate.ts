import {User} from "./User";
import {Profile} from "./Profile";
import {Match} from "./Match";

// https://stackoverflow.com/questions/53882278/sequelize-association-called-with-something-thats-not-a-subclass-of-sequelize-m

User.hasMany(Profile, { foreignKey: "userId"});
Profile.belongsTo(User, { foreignKey: "userId"});

User.hasMany(Match, { foreignKey: "sender_id"});
Match.belongsTo(User, {
  foreignKey: "sender_id"
});


Profile.hasMany(Match, { foreignKey: "receiver_id"});
Match.belongsTo(Profile, {
  foreignKey: "receiver_id"
});



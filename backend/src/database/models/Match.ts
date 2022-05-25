import {DataTypes, Model} from "sequelize";
import {db} from "../DBService";
import {User} from "./User";
import {Profile} from "./Profile";

interface MatchModelAttrs extends Model {
  sender_id: number,
  receiver_id: number,
}

export const Match = db.define<MatchModelAttrs>('matches', {
  sender_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "email",
    },
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Profile,
      key: "id",
    },
  },
});


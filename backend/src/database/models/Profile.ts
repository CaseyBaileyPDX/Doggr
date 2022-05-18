import {DataTypes, Model} from "sequelize";
import {db} from "../DBService";
import {User} from "./User";


interface ProfileModelAttrs extends Model {
  name: string,
  userId: number,
  profileUrl: string,
}

export const Profile = db.define<ProfileModelAttrs>('profiles', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.STRING,

    // This creates foreign key constraint
    references: {
      model: User,
      key: "email",
    },
  },
  //this links to minio name
  profileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


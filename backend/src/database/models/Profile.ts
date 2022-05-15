import {DataTypes, Model} from "sequelize";
import {db} from "../DBService";
import {User} from "./User";


interface ProfileModelAttrs extends Model {
  name: string,
  userId: number,
  profileUrl: string,
}

export const Profile = db.define<ProfileModelAttrs>('Profiles', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,

    // This creates foreign key constraint
    references: {
      model: User,
      key: "id",
    },
  },
  //this links to minio name
  profileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


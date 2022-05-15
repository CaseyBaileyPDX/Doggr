import {DataTypes, Model} from "sequelize";
import bcrypt from "bcrypt";
import {db} from "../DBService";

interface UserModelAttrs extends Model {
  email: string,
  password: string,
}

export const User = db.define<UserModelAttrs>('users', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (user: UserModelAttrs) => {

      console.log("Hashing user pw: ", user.password);
      user.password = await bcrypt.hash(user.password, 10);
      console.log("Hashed pw: ", user.password);
    },
  },
});

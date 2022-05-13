import bcrypt from "bcrypt";
import {
  Sequelize, DataTypes, Model, Deferrable,
} from "sequelize";


const pguser = process.env.PGUSER;
const pghost = process.env.PGHOST;
const pgpass = process.env.PGPASSWORD;
const pgdatabase = process.env.PGDATABASE;
const pgport = process.env.PGPORT;

const connstring = `postgres://${pguser}:${pgpass}@${pghost}:${pgport}/${pgdatabase}`;

export const db = new Sequelize(connstring);

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

interface MessageModelAttrs extends Model {
  message_text: string,
  sender_id: number,
  receiver_id: number,
  message_sent: string,
}

export const Message = db.define<MessageModelAttrs>('profiles', {
  message_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});


import "dotenv/config";
import { Sequelize, DataTypes } from "sequelize";
import { db, User } from "./models";
import { minioClient } from "../services/minioService";

const seedMinio = async () => {
  minioClient.makeBucket("doggr", "localhost", (err) => {
    if (err) console.log("Couldn't make bucket");
    else console.log("Made bucket");
  } );
};

const userSeedData = [
  { email: "test@gmail.com", password: "123456" },
  { email: "test2@email.com", password: "password" },
];


const seed = async () => {
  console.log("Beginning seed");

  await seedMinio();

  // force true will drop the table if it already exists
  // such that every time we run seed, we start completely fresh
  await User.sync({ force: true });

  console.log('Tables have synced!');

  await User.bulkCreate(userSeedData, { validate: true })
    .then(() => {
      console.log('Users created');
    }).catch((err) => {
      console.log('failed to create seed users');
      console.log(err);
    });

  await User.create({ email: "athirdemail@aol.com", password: "123456" })
    .then(() => {
      console.log("Created single user");
    })
    .catch((err) => {
      console.log('failed to create seed users');
      console.log(err);
    })
    .finally(() => {
      db.close();
    });

};

seed();

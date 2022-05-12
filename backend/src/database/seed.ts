import "dotenv/config";
import { Sequelize, DataTypes, QueryTypes } from "sequelize";
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


const SeedUsers = async () => {
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
    });
};

async function SeedMessages() {
  console.log("Seeding messages");

  let query = `create table IF NOT EXISTS messages
  (
      id           serial
          constraint messages_pk
              primary key,
      sender_id    int  not null,
      receiver_id  int  not null,
      message_text text not null,
      message_sent date not null
  );

  create unique index messages_id_uindex
      on messages (id);

  `;

  const messages_table = await db.query(query, { type: QueryTypes.RAW });
  console.log(messages_table);

  await db.query(
    `INSERT INTO messages(sender_id, receiver_id, message_text, message_sent)
          VALUES(?, ?, ?, ?)`,
    {
      replacements: [1, 1, 'Hello', new Date().toISOString()],
      type: QueryTypes.INSERT,
    },
  );
}

async function Seed() {
  await SeedMessages();
  await SeedUsers();
  db.close();
}

Seed();
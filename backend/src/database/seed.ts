import "dotenv/config";
import { Sequelize, DataTypes, QueryTypes } from "sequelize";
import { db, User } from "./models";


const userSeedData = [
  { email: "test@gmail.com", password: "123456" },
  { email: "test2@email.com", password: "password" },
];


const seed = async () => {
  console.log("Beginning seed");

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

//seed();

async function SeedMessages() {
  console.log("Seeding messages");

  const users = await db.query("SELECT * FROM users", { type: QueryTypes.SELECT });
  console.log(users);

  //   let query = `create table IF NOT EXISTS messages
  // (
  //     id           serial
  //         constraint messages_pk
  //             primary key,
  //     sender_id    int  not null,
  //     receiver_id  int  not null,
  //     message_text text not null,
  //     message_sent date not null
  // );

  // create unique index messages_id_uindex
  //     on messages (id);

  // `;

  // const messages = await db.query(query, { type: QueryTypes.RAW });
  // console.log(messages);

  //INSERT INTO TABLE_NAME(column1, column2, column3, ...columnN)
  //VALUES(value1, value2, value3, ...valueN);


  await db.query(
    `INSERT INTO messages(sender_id, receiver_id, message_text)
          VALUES(?, ?, ?)`,
    {
      replacements: [1, 1, 'Hello'],
      type: QueryTypes.INSERT,
    },
  );
}

async function TestSeed() {
  await SeedMessages();
}

TestSeed();
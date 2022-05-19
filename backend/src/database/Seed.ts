import "dotenv/config";
import {QueryTypes} from "sequelize";
import {User} from "./models/User";
import {minioClient} from "../services/MinioService";
import {Message} from "./models/Message";
import {Profile} from "./models/Profile";
import {db} from "./DBService";

const SeedUsers = async () => {
  console.log("Beginning seed");

  const userSeedData = [
    {
      email: "test@gmail.com",
      password: "123456",
    },
    {
      email: "test2@email.com",
      password: "password",
    },
    {
      email: "a",
      password: "a",
    },
    {
      email: "b",
      password: "b",
    },
  ];

  // force true will drop the table if it already exists
  // such that every time we run seed, we start completely fresh
  await User.sync({force: true});

  console.log('Tables have synced!');

  await User.bulkCreate(userSeedData, {validate: true})
    .then(() => {
      console.log('Users created');
    })
    .catch((err) => {
      console.log('failed to create seed users');
      console.log(err);
    });

  await User.create({
    email: "athirdemail@aol.com",
    password: "123456",
  })
    .then(() => {
      console.log("Created single user");
    })
    .catch((err) => {
      console.log('failed to create seed users');
      console.log(err);
    });
};

const SeedMessages = async () => {
  console.log("Beginning seed messages");

  const messageSeedData = [
    {
      message_text: "hi from first seed message",
      sender_id: "a",
      receiver_id: "b",
    },
    {
      message_text: "hi from second seed message",
      sender_id: "b",
      receiver_id: "a",
    },
    {
      message_text: "hi from third seed message",
      sender_id: "a",
      receiver_id: "b",
    },
  ];

  await Message.sync({force: true});

  console.log('Messages table created');

  await Message.bulkCreate(messageSeedData, {validate: true})
    .then(() => {
      console.log('Messages seeded');
    })
    .catch((err) => {
      console.log('failed to create seed messages');
      console.log(err);
    });
};


async function SeedProfiles() {
  console.log("Seeding profiles");

  await Profile.sync({force: true});

  const profileSeedData = [
    {
      name: "Catte",
      userId: "a",
      profileUrl: "http://localhost:8000/doggr/profile1.jpg",
    },
    {
      name: "Doggo",
      userId: "b",
      profileUrl: "http://localhost:8000/doggr/profile2.jpg",
    },
  ];

  await Profile.bulkCreate(profileSeedData, {validate: true})
    .then(() => {
      console.log('Profiles created');
    })
    .catch((err) => {
      console.log('failed to create seed Profiles');
      console.log(err);
    });
}

const SeedMinio = async () => {
  console.log("in seed minio");

  const makeBucket = async () => {
    minioClient.makeBucket("doggr", "localhost", async (err) => {
      if (err) {
        console.log("Couldn't make bucket", err);
        return;
      }
      console.log("Made bucket");
    });
  };

  const bucketExists = await minioClient.bucketExists("doggr");

  if (!bucketExists) {

    console.log("BUCKET NOT MADE SOMETHING IS WRONG");
    return;
  }

  // Delete all the old stuff
  let itemNames: string[] = [];

  let stream = minioClient
    .extensions
    .listObjectsV2WithMetadata('doggr', '', true, '');

  // This event triggers
  stream.on('data', function (obj) {
    itemNames.push(obj.name);
  });
  stream.on('error', function (err) {
    console.log(err);
  });
  stream.on('end', async function () {
    // Careful here, having to mix oldschool callbacks with await can get tricky
    await minioClient.removeObjects("doggr", itemNames);

    const name = "doggr";
    const policy = `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "s3:GetObject",
      "Effect": "Allow",
      "Principal": {"AWS": "*"},
      "Resource": ["arn:aws:s3:::${name}/*"],
      "Sid": "Public"
    }
  ]
}`;

    minioClient.setBucketPolicy('doggr', policy, async function (err) {
      if (err) {
        console.log("COULDNT MAKE BUCKET", err);
      } else {
        console.log("Bucket policy set");
        await minioClient.fPutObject("doggr", "profile1.jpg", "assets/seed/profile1.jpg");
        await minioClient.fPutObject("doggr", "profile2.jpg", "assets/seed/profile2.jpg");
      }
    });
  });
};

async function Seed() {
  console.log("Beginning seed");

  await SeedUsers();
  await SeedMessages();
  await SeedProfiles();
  await SeedMinio();
}

Seed()
  .then(res => db.close());

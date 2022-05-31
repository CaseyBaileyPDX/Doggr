import "dotenv/config";
import "./models/Associate";
import { QueryTypes } from "sequelize";
import { User } from "./models/User";
import { minioClient } from "../services/MinioService";
import { Message } from "./models/Message";
import { Profile } from "./models/Profile";
import { Match } from "./models/Match";
import { db } from "./DBService";

const pghost = process.env.PGHOST || "postgres";
const minioHost = process.env.MINIO_HOST || "nginx";
const minioPort = parseInt(process.env.MINIO_PORT, 10) || 9000;
const externalIp = process.env.EXTERNAL_IP || "127.0.0.1";
const nginxPort = parseInt(process.env.NGINX_PORT, 10) || 8000;

console.log("Host:port is: ", minioHost, minioPort);

const SeedUsers = async () => {
  console.log("Beginning seed Users");

  // Data that our 'Users' table will contain initially
  const userSeedData = [
    {
      email: "a",
      password: "a",
    },
    {
      email: "b",
      password: "b",
    },
    {
      email: "c",
      password: "c",
    },
  ];

  // force true will drop the table if it already exists
  // such that every time we run seed, we start completely fresh
  await User.sync({ force: true });

  console.log('Tables have synced!');

  await User.bulkCreate(userSeedData, { validate: true })
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

  await Message.sync({ force: true });

  console.log('Messages table created');

  await Message.bulkCreate(messageSeedData, { validate: true })
    .then(() => {
      console.log('Messages seeded');
    })
    .catch((err) => {
      console.log('failed to create seed messages');
      console.log(err);
    });
};


async function SeedProfiles() {
  console.log("Seeding profiles with port: ", minioPort);

  await Profile.sync({ force: true });


  const profileSeedData = [
    {
      id: 1,
      name: "CatteZ",
      userId: "c",
      profileUrl: `http://${externalIp}:${nginxPort}/doggr/profile1.jpg`,
    },
    {
      id: 2,
      name: "Doggo",
      userId: "b",
      profileUrl: `http://${externalIp}:${nginxPort}/doggr/profile2.jpg`,
    },
    {
      id: 3,
      name: "Abu",
      userId: "c",
      profileUrl: `http://${externalIp}:${nginxPort}/doggr/Abu.jpg`,
    },
    {
      id: 4,
      name: "HideYoCattes",
      userId: "b",
      profileUrl: `http://${externalIp}:${nginxPort}/doggr/HideYoCattes.jpg`,
    },
    {
      id: 5,
      name: "Honey",
      userId: "c",
      profileUrl: `http://${externalIp}:${nginxPort}/doggr/honey.jpg`,
    },
    {
      id: 6,
      name: "Kazoo",
      userId: "b",
      profileUrl: `http://${externalIp}:${nginxPort}/doggr/kazoo.jpg`,
    },
    {
      id: 7,
      name: "Liz",
      userId: "c",
      profileUrl: `http://${externalIp}:${nginxPort}/doggr/liz.png`,
    }
  ];

  await Profile.bulkCreate(profileSeedData, { validate: true })
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
    minioClient.makeBucket("doggr", minioHost, async (err) => {
      if (err) {
        console.log("Couldn't make bucket", err);
        return;
      }
      console.log("Made bucket");
    });
  };

  console.log("Checking bucket exists");
  const bucketExists = await minioClient.bucketExists("doggr");
  console.log("Finished checking bucket exists");

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
        console.log("Added seed profile pictures to minio")
      }
    });
  });
};

async function SeedMatches() {
  await Match.sync({ force: true });



  const matchSeedData = [
    {
      sender_id: "a",
      receiver_id: 1,
    },
    {
      sender_id: "a",
      receiver_id: 2,
    },
  ];

  await Match.bulkCreate(matchSeedData, { validate: true })
    .then(() => {
      console.log('Matches created');
    })
    .catch((err) => {
      console.log('failed to create seed Match');
      console.log(err);
    });
}

async function Seed() {
  console.log("Beginning seed");

  await SeedUsers();
  await SeedMessages();
  await SeedProfiles();
  await SeedMatches();
  await SeedMinio();
}

Seed()
  .then(res => db.close());

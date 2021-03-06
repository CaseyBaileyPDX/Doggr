
import { QueryTypes } from "sequelize";
import { Profile } from "../database/models/Profile";
import { minioClient } from "./MinioService";
import { db } from "../database/DBService";

const minioHost = process.env.MINIO_HOST;
const minioPort = process.env.MINIO_PORT;
const externalIp = process.env.EXTERNAL_IP;
const nginxPort = process.env.NGINX_PORT;

export const GetRandomProfile = async () => {
  let profile = await db.query(" SELECT * FROM profiles ORDER BY RANDOM() LIMIT 1;", { type: QueryTypes.SELECT });
  console.log(profile);
  return profile[0];
};

export const CreateProfile = async (req, res) => {
  console.log("In create profile with req", req);
  console.log("About to upload file");
  await minioClient.putObject("doggr", req.file.originalname, req.file.buffer, (error, etag) => {
    if (error) {
      console.log(error);
      res.send(500).json({ message: "Could not upload file" });
    } else {
      console.log("Succesfully uploaded file");

    }
  });
  console.log("Done uploading file");

  const name = req.body.name;
  // This is dangerous because we're letting file names collide, but o well
  // TODO: Hash this
  try {
    const profileUrl = `http://${externalIp}:${nginxPort}/doggr/${req.file.originalname}`;
    console.log(`in createuser with ${name}:${profileUrl}`);
    Profile.create({
      name,
      profileUrl,
    })
      .then(() => {
        console.log("Created Profile");
        res.status(200).json({ message: "Created profile successfully" });
      })
      .catch((err) => {
        console.log('failed to create profile');
        console.log(err);
        res.status(500)
          .json({ message: err });
      });
  } catch (err) {
    console.log("In create profile with err: ", err);
  }

};


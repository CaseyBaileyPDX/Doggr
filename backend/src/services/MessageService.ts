import {Message} from "../database/models/message";
import {minioClient} from "./MinioService";


export const CreateMessage = async (req, res) => {
  console.log("In create profile with req", req);
  console.log("About to upload file");

  const {
    message_text,
    sender_id,
    receiver_id
  } = req.body;

  Message.create({
    message_text,
    sender_id,
    receiver_id
  })
    .then(() => {
      console.log("Created Message");
      res.status(200)
        .json({message: "Created Message successfully"});
    })
    .catch((err) => {
      console.log('failed to create Message');
      console.log(err);
      res.status(500)
        .json({message: err});
    });
};


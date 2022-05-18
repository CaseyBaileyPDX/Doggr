import {Message} from "../database/models/Message";
import {minioClient} from "./MinioService";
import {db} from "../database/DBService";


export const CreateMessage = async (req, res) => {

  const {
    message_text,
    sender_id,
    receiver_id
  } = req.body;

  //const msg = db.model("Message");

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


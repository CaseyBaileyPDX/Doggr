import {  User } from "../database/models/User";
import {db} from "../database/DBService";

export const checkDuplicateEmail = (req, res, next) => {
  console.log("Checking duplicate email");
  console.log(req);
  // Username
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(user => {
    if (user) {
      console.log("Sending failed bc email in use");
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }
    console.log("Email not in use");
    next();
  });
};

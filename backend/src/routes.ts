import cors from "cors";
import { promises as fs } from "fs";
import path from "path";
import express from "express";
import passport from "passport";
import Multer from "multer";
import { checkDuplicateEmail } from "./middlewares/VerifySignUp";
import { ConfigurePassport, generateAccessToken } from "./services/AuthService";
import AuthenticateToken from "./middlewares/AuthenticateToken";
import { UploadFileToMinio } from "./services/MinioService";
import {CreateProfile, GetRandomProfile} from "./services/ProfileService";
import {CreateMessage} from "./services/MessageService";

export default function setupRoutes(app) {

  //Set up our middleware utilities
  app.use(cors());
  app.use(express.json());

  //Set up our Passport strategies for login/signup
  ConfigurePassport(app);

  // We're using a router now, so that we can prefix it with /api/v1 later
  const router = express.Router();

  // Create new profile
  router.post("/createProfile", Multer({storage: Multer.memoryStorage()}).single("file"), CreateProfile);

  // Create user
  router.post("/users",
    checkDuplicateEmail,
    passport.authenticate("signup", { session: false }),
    (req, res) => {
      res.json({ message: "Signup success" });
    },
  );

  // Return random profile from the database
  router.get("/randomProfile", async (req, res) => {
    res.status(200).json(await GetRandomProfile());
  });

  // Login User
  router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          console.log("User from passport is: ", user);

          if (user === false) {
            res.status(403).send("User or password was invalid");
            return;
          }

          // USER IS APPROVED FOR LOGIN, passwords have matched
          const token = generateAccessToken(user.email);
          console.log("Login success, got token: ", token);
          res.status(200).send(token);
        },
      )(req, res, next);
    },
  );

  // Generic test route, only returns 200 if the client token authenticates
  router.post("/authTest", AuthenticateToken, (req, res) => {
    res.status(200).send("Authenticated");
  });

  // Req needs to have message text, sender_id, receiver_id
  router.post("/messages", AuthenticateToken, CreateMessage);

  router.get("/about", async (req, res) => {
    res.status(200).send("about:GET");
  });

  // This will redirect all requests made to /api/vi/... to the router
  app.use("/api/v1", router);

  app.get("/", async (req, res) => {
    return getStaticFile(res, "index.html");
  });

  app.use((req, res, next) => {
    return res.status(404).json({
      message: "This page doesn't exist!",
    });
  });
}


function areWeTestingWithJest() {
  return process.env.JEST_WORKER_ID !== undefined;
}

const filePathPrefix = areWeTestingWithJest()
  // Jest
  ? path.resolve(__dirname, "..", "public")
  // Not Jest
  : path.resolve(__dirname, "..", "..", "public");

async function getStaticFile(res, filePath) {
  return fs.readFile(
    path.resolve(filePathPrefix, filePath), "utf8")
    .catch((err) => {
      return res.status(500).send(`Server Error Occurred! ${err}`);
    }).then((file) => {
      res.status(200).send(file);
    });
}

/* eslint-disable camelcase */
import cors from "cors";
import { promises as fs } from "fs";
import path from "path";
import { QueryTypes } from "sequelize";
import express from "express";
import passport from "passport";
//import fileUpload from "express-fileupload";
import Multer from "multer";
import Minio from "minio";
import { testMongo, testPostgres } from "./lib/helpers";
import { checkDuplicateEmail } from "./middlewares/VerifySignUp";
import { createUser } from "./services/UserService";
import { db } from "./database/DBService";
import { ConfigurePassport, generateAccessToken } from "./services/AuthService";
import AuthenticateToken from "./middlewares/AuthenticateToken";
import { UploadFileToMinio } from "./services/MinioService";
import {CreateProfile, GetRandomProfile} from "./services/ProfileService";
import {CreateMessage} from "./services/MessageService";

const _minio = require("minio");

const minioClient = new _minio.Client({
  endPoint: 'localhost',
  port: 8000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin',
});


export default function setupRoutes(app) {

  app.use(cors());
  app.use(express.json());
  //app.use(fileUpload());

  ConfigurePassport(app);



  // We're using a router now, so that we can prefix it with /api/v1 later
  const router = express.Router();

  router.post("/uploadFile", Multer({storage: Multer.memoryStorage()}).single("file"), UploadFileToMinio);
  router.post("/createProfile", Multer({storage: Multer.memoryStorage()}).single("file"), CreateProfile);

  // Create user
  router.post("/users",
    checkDuplicateEmail,
    passport.authenticate("signup", { session: false }),
    (req, res) => {
      res.json({ message: "Signup success" });
    },
  );



  router.get("/randomProfile", async (req, res) => {

    res.status(200).json(await GetRandomProfile());
  });

  // Login User
  router.post(
    '/login',
    async (req, res, next) => {
      console.log("IN LOGIN ROUTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      //console.log(req);

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

  router.post("/authTest", AuthenticateToken, (req, res) => {
    res.send("CONGRATS WE SURVIVED AUTH");
  });

  const msgreqdump = (req, res, next) => {
    console.log("Dumping msg headers");
    //console.log(req);
    next();
  }

  // Req needs to have message text, sender_id, receiver_id
  router.post("/messages", CreateMessage);

  router.use("/testJson", (req, res) => {
    res.json(req.body);
  });

  router.get("/about", async (req, res) => {
    res.status(200).send("about:GET");
  });

  router.get("/testMongo", async (req, res) => {
    let mongoinfo = await testMongo();
    res.json(mongoinfo);
  });

  // actually getting localhost:9000/api/v1/testPostgres
  router.get("/testPostgres", async (req, res) => {
    res.json(await testPostgres());
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

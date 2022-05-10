/* eslint-disable camelcase */
import cors from "cors";
import { promises as fs } from "fs";
import path from "path";
import { QueryTypes } from "sequelize";
import express from "express";
import { testMongo, testPostgres } from "./lib/helpers";
import { checkDuplicateEmail } from "./middlewares/verifySignUp";
import { createUser } from "./services/userService";
import { db } from "./database/models";



function validateMessage(req, res, next) {
  const { message_text } = req.body;

  if (message_text === "") {
    console.log("Error there was no message text");
    return;
  }
  next();
}

export default function setupRoutes(app) {

  app.use(cors());
  app.use(express.json());

  // We're using a router now, so that we can prefix it with /api/v1 later
  const router = express.Router();

  router.post("/users", checkDuplicateEmail, createUser);

  // Req needs to have message text, sender_id, receiver_id
  router.post("/messages", validateMessage, async (req, res) => {

    const { message_text, sender_id, receiver_id } = req.body;

    await db.query(
      `INSERT INTO messages(sender_id, receiver_id, message_text)
          VALUES(?, ?, ?)`,
      {
        replacements: [sender_id, receiver_id, message_text],
        type: QueryTypes.INSERT,
      },
    );

    res.status(200).send("Added successfully\r");
  });

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
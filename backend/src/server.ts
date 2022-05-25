import "dotenv/config";
import Minio from "minio";
import express from "express";
import "./database/models/Associate";
import setupRoutes from "./routes";

const _minio = require("minio");

// async function minioTest() {
//   const minioClient = new _minio.Client({
//     endPoint: 'localhost',
//     port: 8000,
//     useSSL: false,
//     accessKey: 'minioadmin',
//     secretKey: 'minioadmin',
//   });
//   const metaData = {
//     'Content-Type': 'application/octet-stream',
//     'X-Amz-Meta-Testing': 1234,
//   };

//   const file = "/home/kc/workspace/psu/doggr/nginx.conf";

//   minioClient.fPutObject("doggr", "nginx.conf", file,  metaData, (err) => {
//     if (err) return console.log(err);
//     console.log('File uploaded successfully.');
//   });

// }

async function main() {

  //await minioTest();

  // Don't interfere with Jest/supertest!
  if (process.env.NODE_ENV !== 'test') {
    const app = express();
    setupRoutes(app);

    const server = await app.listen(9000, () => {
      console.log("Server is running");
    });
  }
}

main();

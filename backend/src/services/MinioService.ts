import "dotenv/config";
import Minio from "minio";

const _minio = require("minio");

const minioHost = process.env.MINIO_HOST || "nginx";
const minioPort = parseInt(process.env.MINIO_PORT, 10) || 9000;

export const minioClient = new _minio.Client({
  endPoint: minioHost,
  port: minioPort,
  useSSL: false,
  accessKey: process.env.MINIO_USER,
  secretKey: process.env.MINIO_PASS,
});


export const UploadFileToMinio = async (req, res) => {
  console.log("About to upload file");
  try {
    await minioClient.putObject("doggr", req.file.originalname, req.file.buffer, (error, etag) => {
      if (error) {
        console.log(error);
        res.send(500).json({ message: "Could not upload file" });
      } else {
        console.log("Succesfully uploaded file");
        res.send(200).json({ message: "File uploaded successfully" });
      }
    });
  } catch (err) {
    console.log("In upload file to minio with err: ", err);
  }
  console.log("Done uploading file");
};


import "dotenv/config";
import Minio from "minio";

const _minio = require("minio");

export const minioClient = new _minio.Client({
  endPoint: 'localhost',
  port: 8000,
  useSSL: false,
  accessKey: process.env.MINIO_USER,
  secretKey: process.env.MINIO_PASS,
});

export const UploadFileToMinio = async (req, res) => {
  console.log("About to upload file");
  await minioClient.putObject("doggr", req.file.originalname, req.file.buffer, (error, etag) => {
    if (error) {
      console.log(error);
      res.send(500).json({ message: "Could not upload file" });
    } else {
      console.log("Succesfully uploaded file");
      res.send(200).json({message: "File uploaded successfully"});
    }
  });
  console.log("Done uploading file");
};

import { rejects } from "assert";
import AWS from "aws-sdk";
import { error } from "console";
import { resolve } from "path";

export const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-central-1",
});

export const uploadRecording = (
  filename: string,
  bucketName: string,
  file: File
) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename,
      Bucket: bucketName,
      Body: file,
      ContentType: "audio/mp3",
      ACL: "private",
    };

    s3.upload(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.Location);
      }
    });
  });
};

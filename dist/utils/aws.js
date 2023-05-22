"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = exports.uploadAudio = exports.s3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.s3 = new aws_sdk_1.default.S3({
    apiVersion: "2006-03-01",
    // accessKeyId: process.env.ACCESS_KEY,
    // secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const uploadAudio = (filename, bucketName, file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: bucketName,
            Body: file,
            ContentType: "audio/mp3",
            ACL: "public-read",
        };
        // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
        // Please convert to `await client.upload(params, options).promise()`, and re-run aws-sdk-js-codemod.
        exports.s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.Location);
            }
        });
    });
};
exports.uploadAudio = uploadAudio;
const uploadAvatar = (filename, bucketName, file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: bucketName,
            Body: file,
            ContentType: "image/png",
            ACL: "public-read",
        };
        // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
        // Please convert to `await client.upload(params, options).promise()`, and re-run aws-sdk-js-codemod.
        exports.s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.Location);
            }
        });
    });
};
exports.uploadAvatar = uploadAvatar;
//# sourceMappingURL=aws.js.map
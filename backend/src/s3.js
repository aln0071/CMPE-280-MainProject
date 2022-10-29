require('dotenv').config();
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.S3_NAME;
const region = process.env.S3_REGION;
const accessKeyId = process.env.S3_ACCESS;
const secretAccessKey = process.env.S3_SECRET;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// upload file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    }

    return s3.upload(uploadParams).promise()
}

// download file from s3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    }
    return s3.getObject(downloadParams).createReadStream();
}

module.exports = {
    uploadFile,
    getFileStream,
}
var express = require('express');
const fs = require('fs');
const AWS = require('aws-sdk');
const { json } = require('body-parser');

// Enter copied or downloaded access ID and secret key here
const ID = 'AKIAISM3K4SBCHUOJP7A';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'ecomercepaypal';
const s3 = new AWS.S3({ accessKeyId: ID, secretAccessKey: SECRET });
const params = { Bucket: BUCKET_NAME, CreateBucketConfiguration: { LocationConstraint: "eu-west-3" } };


exports.uploadFile = (req, res) => {

    const params = {
        Bucket: BUCKET_NAME,
        Key: req.file.originalname, // File name you want to save as in S3
        Body: req.file.buffer
    };

    s3.upload(params, function (err, data) {
        if (err) {
            console.log(`................................ ${err}`);
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        res.status(200).json({ message: 'file uploaded sucess', data: data })
    });
};



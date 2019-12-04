const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require("aws-sdk");
const multerS3 = require('multer-s3');

var s3 = new aws.S3({ accessKeyId: 'AKIAQ5T2L6VT4V5FCKMS',
secretAccessKey: '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', })


const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }), 

  storage: multerS3({
    s3: s3,
    bucket: 'uploadsquickjob',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes["storage"],
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/pjpeg',
    ];

    if(allowedMimes.includes(file.mimetype)){
      cb(null, true);

    } else {
      cb(new Error("Invalid file type."));
    }
  }
};
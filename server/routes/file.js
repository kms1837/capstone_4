const express = require('express');
const multer = require('multer');
const file = require('../models/file');
const router = express.Router();

const uploadFilePath = `${__dirname}/../uploads`;

var storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, uploadFilePath);
    },

    filename: (request, file, cb) => {
        console.log(file);
        file.uploadedFile = {
            name: file.originalname.split('.')[0],
            ext: file.mimetype.split('/')[1],
        };

        file.uploadedFile["uploadName"] = `${Date.now()}_${file.originalname}`;

        cb(null, file.uploadedFile["uploadName"]);
    }
});

var upload = multer({ storage: storage }).single('file');

router.get('/', (request, response) => {
    response.render('file_upload_test.ejs');
});

router.post('/', (request, response, next) => {
    upload(request, response, err => {
        let userData = request.body;
        if (err) {
            console.log(err);
            response.status(500).send(err);
        } 
        else {
            file.upload(request);
            response.status(200);
        } 
    });
});

module.exports = router;
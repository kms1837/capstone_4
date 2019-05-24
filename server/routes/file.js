const express = require('express');
const file = require('../models/file');
const router = express.Router();

router.get('/', (request, response) => {
    response.render('file_upload_test.ejs');
});

router.post('/', async(request, response) => {
    let fileID = await file.upload(request, response);
    response.status(200).send("");
});

module.exports = router;
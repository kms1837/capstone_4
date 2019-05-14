const express = require('express');
const departModel = require('../models/department');
const majorUnivModel = require('../models/major_univ');
const subjectModel = require('../models/subject');
const router = express.Router();

router.get('/', (request, response) => {
});

router.get('/department', (request, response) => {
    let userData = request.body;
    departModel(userData.id).then( res => {
        response.json(res);
    });
});

router.post('/department', (request, response) => {
    let data = request.body;
});

router.delete('/department', (request, response) => {
    let data = request.body;
});

router.put('/department', (request, response) => {
    let data = request.body;
});

router.get('/major_univ', (request, response) => {
    let data = request.body;
    majorUnivModel(data.id).then( res => {
        response.json(res);
    });
});

router.post('/major_univ', (request, response) => {
    let data = request.body;
});

router.delete('/major_univ', (request, response) => {
    let data = request.body;
});

router.put('/major_univ', (request, response) => {
    let data = request.body;
});

router.get('/subject', (request, response) => {
    let data = request.body;
    subjectModel(data.id).then( res => {
        response.json(res);
    });
});

router.post('/subject', (request, response) => {
    let data = request.body;
});

router.delete('/subject', (request, response) => {
    let data = request.body;
});

router.put('/subject', (request, response) => {
    let data = request.body;
});

module.exports = router;
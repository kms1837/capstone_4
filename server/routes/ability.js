const express = require('express');
const router = express.Router();

const abilityCategoryModel = require('../models/track');
const scoreModel = require('../models/score');
const categoryEvalModel = require('../models/category_eval');
const stuSpecModel = require('../models/stu_spec');
const fileModel = require('../models/file');

router.get('/', (request, response) => {
    
});

router.get('/category', async(request, response) => {
    let userData = request.body;
    let categoryList = await abilityCategoryModel(userData.id); 
    response.json(categoryList);
});

router.post('/category', (request, response) => {
});

router.delete('/category', (request, response) => {
});

router.put('/category', (request, response) => {
});

router.get('/score', (request, response) => {
    let userData = request.body;
    scoreModel(userData.id).then( res => {
        response.json(res);
    });
});

router.get('/category_eval', async(request, response) => {
    let userData = request.body;
    let categoryEval = await categoryEvalModel(userData.id);

    response.json(categoryEval);
});

router.post('/stu_spec', async(request, response) => {
    let fileID = await fileModel.upload(request, response);
    await stuSpecModel.insert(request, fileID);
    response.status(200).send("");
});

router.get('/stu_spec', (request, response) => {
    let userData = request.body;
    stuSpecModel(userData.id).then( res => {
        response.json(res);
    });
});


module.exports = router;
const express = require('express');
const router = express.Router();

const abilityCategoryModel = require('../models/ability_category');
const scoreModel = require('../models/score');
const categoryEvalModel = require('../models/category_eval');
const stuSpecModel = require('../models/stu_spec');

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

router.get('/stu_spec', (request, response) => {
    let userData = request.body;
    stuSpecModel(userData.id).then( res => {
        response.json(res);
    });
});


module.exports = router;
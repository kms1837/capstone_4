const express = require('express');
const router = express.Router();

const abilityCategoryModel = require('../models/ability_category');
const scoreModel = require('../models/score');
const categoryEvalModel = require('../models/category_eval');
const stuSpecModel = require('../models/stu_spec');

router.get('/', (request, response) => {
    
});

router.get('/category', (request, response) => {
    let userData = request.body;
    abilityCategoryModel(userData.id).then( res => {
        response.json(res);
    });
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

router.get('/category_eval', (request, response) => {
    let userData = request.body;
    categoryEvalModel(userData.id).then( res => {
        response.json(res);
    });
});

router.get('/stu_spec', (request, response) => {
    let userData = request.body;
    stuSpecModel(userData.id).then( res => {
        response.json(res);
    });
});


module.exports = router;
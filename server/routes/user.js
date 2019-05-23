const express = require('express');
const userModel = require('../models/user');
const abilityCateModel = require('../models/ability_category');
const cateEvalModel = require('../models/category_eval');
const finalScoreModel = require('../models/final_score');
const router = express.Router();

router.get('/', (request, response) => {
    let userData = request.body;
    userModel.findToStudentID(userData.studentID).then( res => {
        response.json(res);
    });
});

router.get('/add_spec', (request, response) => {
    response.render('add_spec');
});

router.get('/info', async(request, response) => { 
    let userInfo = await userModel.findToID(request.session.userID);
    let cateInfo = await abilityCateModel.getList(); 
    let cateEval = await cateEvalModel.findToStudentID(request.session.studentID);
    let finalScore = await finalScoreModel.findToStudentID(request.session.studentID);
    console.log(finalScore[0]);
    response.render('main', {user: userInfo[0], cate: cateInfo, cateEval: cateEval, finalScore: finalScore[0]});
    //response.status(500).render('main');
});

router.post('/login', async (request, response) => {
    let userData = request.body;
    let res = await userModel.findToStudentID(userData.studentID);

    if (res && res[0].password === res[0].password) {
        let studentData = res[0];
        console.log(`login ${studentData.name}, ${studentData.studentID}`);
        request.session.userID = studentData.id;
        request.session.studentID = studentData.studentID;
        request.session.email = studentData.email;
        request.session.name = studentData.name;
        response.redirect("/");
    }
    else {
        response.redirect("/login");
    }
});

router.get('/logout', (request, response) => {
    request.session.destroy();
    response.clearCookie('sid');
    response.redirect('/');
});

module.exports = router;
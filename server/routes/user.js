const express = require('express');
const userModel = require('../models/user');
const trackModel = require('../models/track');
const stuSpecModel = require('../models/stu_spec');
const finalScoreModel = require('../models/final_score');
const common = require('./common');
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
    await common.loginCheck(request, response);

    let userInfo = await userModel.findToID(request.session.userID);
    let trackInfo = await trackModel.getList();
    let finalScore = await finalScoreModel.findToStudentID(request.session.studentID);
    let specList = await stuSpecModel.StudentIDtoList(request.session.studentID);
    let stats = [{"name": "코딩", "score": finalScore[0].coding}, {"name": "수학", "score": finalScore[0].math},
    {"name": "팀플", "score": finalScore[0].teample}, {"name": "총학점", "score": finalScore[0].grade},
    {"name": "스펙", "score": finalScore[0].spec}]

    console.log(specList);
    response.render('main', {user: userInfo[0], track: trackInfo, finalScore: finalScore[0], stats: stats, specList: specList});
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
        request.session.auth = studentData.auth;
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

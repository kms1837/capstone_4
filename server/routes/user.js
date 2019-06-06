const express = require('express');
const userModel = require('../models/user');
const trackModel = require('../models/track');
const stuSpecModel = require('../models/stu_spec');
const finalScoreModel = require('../models/final_score');
const graduateModel = require('../models/graduate');
const common = require('./common');
const router = express.Router();

function gradeToBgColor(grade) {
    let bgColor = "";
    switch (grade) {
        case "Challenger":
            bgColor = "gradient-primary";
            break;
        case "Dia":
            bgColor = "gradient-Info";
            break;
        case "Platinum":
            bgColor = "gradient-success";
            break;
        case "Gold":
            bgColor = "gradient-warning";
            break;
        case "Silver":
            bgColor = "secondary";
            break;
        case "Bronze":
            bgColor = "danger";
            break;
    }

    return bgColor;
}

function graduateListWrapper(graduateList) {
  for (let graduate of graduateList) {
    graduate["state"] = finalScoreWrapper(graduate);
  }

  return graduateList;
}

function finalScoreWrapper(finalScore) {
  let wrapper = [{"name": "CODING", "score": finalScore.coding}, {"name": "MATH", "score": finalScore.math},
  {"name": "TEAMPLE", "score": finalScore.teample}, {"name": "GRADE", "score": finalScore.grade},
  {"name": "SPEC", "score": finalScore.spec}];

  return wrapper;
}

router.get('/', (request, response) => {
    let userData = request.body;
    userModel.findToStudentID(userData.studentID).then( res => {
        response.json(res);
    });
});

router.get('/track_chart', async(request, response) => { 
    await common.loginCheck(request, response);
    let userInfo = await userModel.findToID(request.session.userID);
    let trackInfo = await trackModel.getList();
    response.render('track_chart.ejs', {user: userInfo[0], track: trackInfo});
});

router.get('/track_score', async(request, response) => {
    await common.loginCheck(request, response); 
    let userInfo = await userModel.findToID(request.session.userID);
    let trackInfo = await trackModel.getList();
    response.render('track_score.ejs', {user: userInfo[0], track: trackInfo});
});

router.get('/compare', async(request, response) => {
    await common.loginCheck(request, response); 
    let userInfo = await userModel.findToID(request.session.userID);
    let finalScore = await finalScoreModel.findToStudentID(request.session.studentID);
    let graduateList = await graduateModel.listToGrade(finalScore[0]['final_grade']);
    graduateListWrapper(graduateList);

    response.render('compare.ejs', {user: userInfo[0], finalScore: finalScore[0], graduate: graduateList, gradeToBgColor: gradeToBgColor});
});

router.get('/add_spec', (request, response) => {
    response.render('add_spec');
});

router.get('/rader/:studentID', async(request, response) => {
    let finalScore = await finalScoreModel.findToStudentID(request.params.studentID);
    let stats = finalScoreWrapper(finalScore[0]);

    response.status(200).json(stats);
});

router.get('/info/:studentID', async(request, response) => {
    let userInfo = await userModel.findToStudentID(request.params.studentID);
    let finalScore = await finalScoreModel.findToStudentID(request.params.studentID);
    let stats = finalScoreWrapper(finalScore[0]);

    response.render('student_detail', 
        {user: userInfo[0], finalScore: finalScore[0], stats: stats, mode:false,
        gradeToBgColor: gradeToBgColor });
});

router.get('/info', async(request, response) => {
    await common.loginCheck(request, response);

    let userInfo = await userModel.findToID(request.session.userID);
    let trackInfo = await trackModel.getList();
    let finalScore = await finalScoreModel.findToStudentID(request.session.studentID);
    let specList = await stuSpecModel.StudentIDtoList(request.session.studentID);
    let graduateList = await graduateModel.listToGrade(finalScore[0]['final_grade']);
    let stats = finalScoreWrapper(finalScore[0]);
    graduateListWrapper(graduateList);

    response.render('main', 
        {user: userInfo[0], track: trackInfo, finalScore: finalScore[0], 
          stats: stats, specList: specList, graduate: graduateList, 
          mode:true, gradeToBgColor: gradeToBgColor });
});

router.post('/login', async (request, response) => {
    let userData = request.body;
    let res = await userModel.findToStudentID(userData.studentID);
    
    if (res.length > 0 && userData.password === res[0].password) {
        let studentData = res[0];
        request.session.userID = studentData.id;
        request.session.studentID = studentData.studentID;
        request.session.email = studentData.email;
        request.session.name = studentData.name;
        request.session.auth = studentData.auth;
        response.status(200).send(true);
    }
    response.status(500).send(false);
});

router.get('/logout', (request, response) => {
    request.session.destroy();
    response.clearCookie('sid');
    response.redirect('/');
});

router.get('/professor_opinion/:userID', async(request, response) => {
    let data = await finalScoreModel.getProfessorOpinion(request.params.userID);
    if (data.length > 0) {
      response.status(200).json(data[0]);
    } else {
      response.status(500).json(false);
    }
});

router.put('/professor_opinion/:userID', async(request, response) => {
    let userData = request.body;
    await finalScoreModel.setProfessorOpinion(request.params.userID, userData.opinion);
    response.status(200).send(true);
});

module.exports = router;

const express = require('express');
const userModel = require('../models/user');
const trackModel = require('../models/track');
const stuSpecModel = require('../models/stu_spec');
const finalScoreModel = require('../models/final_score');
const common = require('./common');
const router = express.Router();

router.get('/', async(request, response) => {
    await common.loginCheck(request, response);
    let userData = await userModel.findToID(request.session.userID);
    let students = await userModel.getScoreList();
    response.render('admin_main.ejs', {user: userData[0], students: students});
});

router.get('/category', async(request, response) => {
    await common.loginCheck(request, response);
    let userData = await userModel.findToID(request.session.userID);
    response.render('admin_main.ejs', {user: userData[0]});
});

router.get('/weight', async(request, response) => {
    await common.loginCheck(request, response);
    let userData = await userModel.findToID(request.session.userID);
    response.render('admin_main.ejs', {user: userData[0]});
});

router.get('/track', async(request, response) => {
    await common.loginCheck(request, response);
    let userData = await userModel.findToID(request.session.userID);
    let students = await userModel.getScoreList();
    response.render('track.ejs', {user: userData[0], students: students});
});

router.get('/accept_waiting', async(request, response) => {
    await common.loginCheck(request, response);
    let userData = await userModel.findToID(request.session.userID);
    response.render('accept_waiting_list.ejs', {user: userData[0]});
});

router.get('/accept_spec', async(request, response) => {
    await common.loginCheck(request, response);
    let userData = await userModel.findToID(request.session.userID);
    let specReqList = await stuSpecModel.acceptWaitingList();

    response.render('accept_spec.ejs', {user: userData[0], specReqList: specReqList});
});

router.put('/accept_spec/:specID/agree', async(request, response) => {
    await stuSpecModel.agree(request.params.specID);
    response.status(200).send(true);
});

router.put('/accept_spec/:specID/reject', async(request, response) => {
    await stuSpecModel.reject(request.params.specID);
    response.status(200).send(true);
});

router.put('/professor_opinion/:userID', async(request, response) => {
    let userData = request.body;
    await finalScoreModel.setProfessorOpinion(request.params.userID, userData.opinion);
    response.status(200).send(true);
});

router.get('/professor_opinion/:userID', async(request, response) => {
    let data = await finalScoreModel.getProfessorOpinion(request.params.userID);
    if (data.length > 0) {
      response.status(200).json(data[0]);
    } else {
      response.status(500).json(false);
    }
    
});

module.exports = router;

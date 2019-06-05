const express = require('express');
const pythonShell = require('python-shell').PythonShell;
const userModel = require('../models/user');
const trackModel = require('../models/track');
const studentTrackModel = require('../models/student_track');
const stuSpecModel = require('../models/stu_spec');
const finalScoreModel = require('../models/final_score');
const common = require('./common');
const pythonConfig = require('../config/index').pythonConfig;
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
    let trackInfo = await trackModel.getList();
    let students = await userModel.getScoreList();
    response.render('track.ejs', {user: userData[0], track: trackInfo, students: students});
});

router.get('/track/:trackID', async(request, response) => {
    await common.loginCheck(request, response);
    let userData = await userModel.findToID(request.session.userID);
    let trackInfo = await trackModel.getList();
    let students = await studentTrackModel.getTrackIDtoList(request.params.trackID);
    response.render('track.ejs', {user: userData[0], track: trackInfo, students: students});
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
    let specInfo = await stuSpecModel.findToID(request.params.specID);
    let studentID = specInfo[0]["student_id"];

    var options = {
      ...pythonConfig,
      args: [studentID]
    };
    
    pythonShell.run('update_user_data.py', options, (err, results) => {
      if (err) throw err;
      console.log('results: ', results);
    });

    response.status(200).send(true);
});

router.put('/accept_spec/:specID/reject', async(request, response) => {
    await stuSpecModel.reject(request.params.specID);
    response.status(200).send(true);
});

module.exports = router;

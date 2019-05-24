const express = require('express');
const userModel = require('../models/user');
const stuSpecModel = require('../models/stu_spec');
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
    response.render('track.ejs', {user: userData[0]});
});

router.get('/accept_waiting', async(request, response) => {
    await common.loginCheck(request, response);
    let userData = await userModel.findToID(request.session.userID);
    response.render('accept_waiting_list.ejs', {user: userData[0]});
});

router.get('/accept_spec', async(request, response) => {
    await common.loginCheck(request, response);
    let userData = await userModel.findToID(request.session.userID);
    let specReqList = await stuSpecModel.getList();
    console.log(specReqList);
    response.render('accept_spec.ejs', {user: userData[0], specReqList: specReqList});
});

module.exports = router;
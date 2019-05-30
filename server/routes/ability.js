const express = require('express');
const router = express.Router();

const abilityCategoryModel = require('../models/track');
const scoreModel = require('../models/score');
const studentTrackModel = require('../models/student_track');
const stuSpecModel = require('../models/stu_spec');
const fileModel = require('../models/file');

router.get('/', (request, response) => {
    
});

router.get('/category', async(request, response) => {
  let userData = request.body;
  let categoryList = await abilityCategoryModel(userData.id); 
  response.json(categoryList);
});

router.get('/score', (request, response) => {
  let userData = request.body;
  scoreModel(userData.id).then( res => {
      response.json(res);
  });
});

router.get('/current_track_Info/:trackID', async(request, response) => {
  let trackScoreAvg = await studentTrackModel.getStudentTrackInfo(request.session.studentID, request.params.trackID);
  let trackScore = await scoreModel.studentTrackScore(request.session.studentID, request.params.trackID);
  let totalTrackAvg = await studentTrackModel.getTrackAvg(request.params.trackID);
  let trackAvg = trackScoreAvg.length > 0 ? trackScoreAvg[0].track_score : 0;

  response.json({
    'totalAvg': totalTrackAvg[0]['avg(track_score)'],
    'trackAvg': trackAvg,
    'trackScore': trackScore 
  });
});

router.get('/track_score/:trackID', async(request, response) => {
  let trackScore = await scoreModel.studentTrackScore(request.session.studentID, request.params.trackID);
  response.json(trackScore);
}); //해당 트랙의 성적들을 모두 가져옵니다.

router.get('/track_score/:studentID/:trackID', async(request, response) => {
  // 관리자 인증 필요
  let trackScore = await scoreModel.studentTrackScore(request.params.studentID, request.params.trackID);
  response.json(trackScore);
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

router.get('/stu_spec/:specID', async(request, response) => {
  // 관리자 인증 필요
  let specInfo = await stuSpecModel.findToID(request.params.specID);
  response.json(specInfo[0]);
});


module.exports = router;
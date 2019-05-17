const express = require('express');
const userModel = require('../models/user');
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

router.get('/info', (request, response) => {
    let test = userModel.findToID(request.session.userID)
    .then( data => {
        response.render('main', {user: data});
    });
    //response.status(500).render('main');
}); 

router.post('/login', (request, response) => {
    let userData = request.body;
    userModel.findToStudentID(userData.studentID).then( res => {
        if (res.password === userData.password) {
            request.session.userID = res.id;
            request.session.email = res.email;
            request.session.username = res.username;
            response.redirect("/");
        }
        else {
            response.redirect("/login");
        }
    });
});

router.get('/logout', (request, response) => {
    request.session.destroy();
    response.clearCookie('sid');
    response.redirect('/');
});

module.exports = router;
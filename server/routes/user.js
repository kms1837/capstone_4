const express = require('express');
const userModel = require('../models/user');
const router = express.Router();

router.get('/', (request, response) => {
    let userData = request.body;
    userModel.findToStudentID(userData.studentID).then( res => {
        response.json(res);
    });
});

router.get('/info', (request, response) => {
    response.sendFile('views/main.html', {root: __dirname + '/../' });
}); 

router.post('/login', (request, response) => {
    let userData = request.body;
    userModel.findToStudentID(userData.studentID).then( res => {
        if (res.password === userData.password) {
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
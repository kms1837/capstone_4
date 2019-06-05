const user = require('./user');
const school = require('./school');
const ability = require('./ability');
const file = require('./file');
const admin = require('./admin');
const common = require('./common');
const userModel = require('../models/user');

module.exports = function (server) {
    server.use('/user', user);
    server.use('/school', school)
    server.use('/ability', ability);
    server.use('/file', file);
    server.use('/admin', admin);

    server.get('/', (request, response) => {
        if (request.session.name) {
            if (request.session.auth) {
                response.redirect('/admin');
            } else {
                response.redirect('/user/info');
            }
        } else {
            response.redirect('/login');
        }
    });

    server.get('/login', async(request, response) => {
      if (request.session.name) {
        response.redirect('/');
      } else {
        response.render('login', {error: request.query.error});
      }
    });

    server.get('/about', async(request, response) => {
        await common.loginCheck(request, response);
        let userData = await userModel.findToID(request.session.userID);
        response.render('about', {user: userData[0]});
    }); // 소개

    server.get('/contact-us', async(request, response) => {
        await common.loginCheck(request, response);
        let userData = await userModel.findToID(request.session.userID);
        response.render('contact_us', {user: userData[0]});
    }); // 문의
}
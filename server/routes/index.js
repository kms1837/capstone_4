const user = require('./user');
const school = require('./school');
const ability = require('./ability');
const file = require('./file');

module.exports = function (server) {
    server.use('/user', user);
    server.use('/school', school)
    server.use('/ability', ability);
    server.use('/file', file);

    server.get('/', (request, response) => {
        if (request.session.username) {
            response.redirect('/user/info');
        } else {
            response.redirect('/login');
        }
    });

    server.get('/login', (request, response) => {
        response.render('login');
    });
}
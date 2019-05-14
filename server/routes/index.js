const user = require('./user');
const school = require('./school');
const ability = require('./ability');

module.exports = function (server) {
    server.use('/user', user);
    server.use('/school', school)
    server.use('/ability', ability);

    server.get('/', (request, response) => {
        if (request.session.username) {
            response.send(`환영합니다. ${request.session.username} 씨`);
        } else {
            response.redirect('/login');
            //response.send('로그인 해주세요');
        }
    });

    server.get('/login', (request, response) => {
        response.sendFile('public/login.html', {root: __dirname + '/../' });
    });
}
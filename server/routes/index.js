const user = require('./user');

module.exports = function (server) {
    server.use('/user', user);

    server.get('/', (request, response) => {
        if (request.session.username) {
            response.send(`환영합니다. ${request.session.username} 씨`);
        } else {
            response.send('로그인 해주세요');
        }
    });

    server.get('/login', (request, response) => {
        response.sendFile('public/login_test.html', {root: __dirname + '/../' });
    });
}
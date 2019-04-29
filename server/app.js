const http = require('http');
const router = require('./routes/index');
const app = require('./config/express');
const serverConfig = require('./config/index').serverConfig;
const server  = http.createServer(app);

server.listen(serverConfig.port, serverConfig.host, () => {
    let addr = server.address();
    router(app);
    console.log(` ~ runserver ${addr.address}:${addr.port} ~`);
});
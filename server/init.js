const mysql = require('mysql2/promise');
const fs = require('fs');
const configFilePath = './config';

let baseCofigData = `
serverConfig = {
    port: '7777',
    host: '0.0.0.0'
}

dbconfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database',
    port: 3306
};

session = {
    secret: 'MySecretCode',
    resave: false,
    saveUninitialized: true
};

module.exports = {
    'serverConfig': serverConfig,
    'dbConfig' : dbconfig,
    'sessionConfig': session
}
`;

makeBaseConfigFile();
dbInit();

function makeBaseConfigFile() {
    console.log("[설정파일 생성중]");
    try {
        let baseFilePath = `${configFilePath}/index.js`;
        if (!fs.existsSync(baseFilePath)) {
            fs.writeFileSync(baseFilePath, baseCofigData, 'utf8');
            console.log(`=> "${configFilePath}/" make config file`);
        } else {
            console.log(`=> 설정 파일이 존재합니다 생성을 중단합니다.`);
        }
    } catch(err) {
        console.log(err);
    }
}

function dbInit() {
    console.log("[데이터베이스 생성중]");
    const dbconfig = require('./config/index').dbConfig;
    const users = fs.readFileSync('../schema/user.sql').toString();
    const databasePool = mysql.createPool(dbconfig);
    const newDatabase = async() => {
        try {
            const connection = await databasePool.getConnection(async conn => conn);
            try {
                await connection.query(users);
                console.log("=> user 테이블 생성");
                connection.release();
            } catch(err) { 
                console.log(err);
                console.log("=> user 테이블 생성에러");
                connection.release();
                return false;
            }
        } catch(err) {
            console.log('=> db error');
            console.log(err);
            return false;
        }
    }
    newDatabase();
}
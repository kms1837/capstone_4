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

    console.log('\n');
}

function makeUploadDir() {
    console.log("[업로드 폴더 생성중]");
    try {
        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
            console.log(`=> make dir uploads`);
        } else {
            console.log(`=> 폴더가 이미 존재합니다 생성을 중단합니다.`);
        }
    } catch(err) {
        console.log(err);
    }

    console.log('\n');
}

async function dbInit() {
    const dbconfig = require('./config/index').dbConfig;
    const users = fs.readFileSync('../schema/user.sql').toString();
    const databasePool = mysql.createPool(dbconfig);
    console.log("[데이터베이스 생성중]");

    fs.readdir('../schema/', async(err, files) => {
        let promisePool = [];
        files.forEach(file => {
            let tableSchema = fs.readFileSync(`../schema/${file}`).toString();
            let tableName = file.split('.')[0];
            promisePool.push(newTable(tableName, tableSchema, databasePool));
        });

        Promise.all(promisePool).then(() => {
            console.log("=> 모든 테이블 생성 완료");
            process.exit();
        });
    });
}

async function newTable(tableName, tableSchema, databasePool) {
    console.log(`=> ${tableName} 테이블 생성중`);
    try {
        const connection = await databasePool.getConnection(async conn => conn);
        try {
            await connection.query(tableSchema);
            console.log(`=> ${tableName} 테이블 생성완료`);
            connection.release();
        } catch(err) { 
            console.log(`=> ${tableName} 테이블 생성에러`);
            console.log(err);
            connection.release();
            return false;
        }
    } catch(err) {
        console.log('=> db error');
        console.log(err);
        return false;
    }
}

makeBaseConfigFile();
makeUploadDir();
dbInit();
//const mysql = require('promise-mysql');
const mysql = require('mysql2/promise');
const fs = require('fs');
const dbconfig = require('./config/index').dbConfig;
const users = fs.readFileSync('../schema/user.sql').toString();
/*
const file = fs.readFileSync('./schema/file.sql').toString();
const portfolio = fs.readFileSync('./schema/portfolio.sql').toString();
const comment = fs.readFileSync('./schema/comment.sql').toString();
*/

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
    const databasePool = mysql.createPool(dbconfig);
    const newDatabase = async() => {
        try {
            const connection = await databasePool.getConnection(async conn => conn);
            try {
                //await connection.query(`CREATE DATABASE ${dbconfig["database"]}`);
                //console.log("=> 데이터베이스 생성");
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

    //newDatabase.query(`CREATE DATABASE ${dbconfig["database"]}`);
    /*
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '@rkd151319',
        database: 'sw',
        port: 3306
    }).then(
        newDatabase => {
            newDatabase.query(`DROP DATABASE ${dbconfig["database"]}`, (err, result) => {
                console.log(`=> DB DROP ${dbconfig.database}`);
    
                newDatabase.query(`CREATE DATABASE ${dbconfig["database"]}`).then( () => {
                    console.log(`=> DB CREATE ${dbconfig.database}`);
    
                    mysql.createConnection(dbconfig).then( database => {
                        let query1 = database.query(users).then( () => {
                            if(err) console.log('error: ', err);
                            console.log(`=> CREATE TABLE users`);
                        });
            
                        Promise.all([query1]).then(() => { 
                            console.log('~ init done ~');
                            process.exit(0);
                        });
                    });
                });
            });
        }
    );*/
}
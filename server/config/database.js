const dbConfig = require('./index').dbConfig;
const mysql = require('mysql2/promise');
const database = mysql.createPool(dbconfig);

module.exports = database;
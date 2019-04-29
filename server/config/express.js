const path = require('path');
const sessionConfig = require('./index').sessionConfig;
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
//const MySQLStore = require('express-mysql-session')(session); 

var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.engine('html', require('ejs').renderFile);
app.set('views', './view');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
/*
app.use('/view', express.static(__dirname + '/../../view')); // resource path
app.use('/uploads', express.static(__dirname + '/../../uploads')); // upload path*/
app.use(bodyParser.json()); // for parsing application/json
app.use(session(sessionConfig));

module.exports = app;
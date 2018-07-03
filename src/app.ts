import express, { NextFunction } from 'express';
import fs from 'fs';
import passport from './node-passport';
import path from 'path';
var session = require("express-session");
// import compression from "compression";
var createError = require('http-errors');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// app.use(compression());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//#region passport
// passport設定
app.use(session({ secret: "xoziphOcirazEfeThoTrlzot0eWisotiTeGeVavl", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//#endregion

//#region routings
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));
app.use('/days', require('./routes/days'));
app.use('/details', require('./routes/details'));
app.use('/settings', require('./routes/settings'));
app.use('/status', require('./routes/status'));
app.use('/savings', require('./routes/savings'));
//#endregion

app.use(function (next: Function) { next(createError(404)) });

app.use(function (err: any, req: express.Request, res: express.Response, next: Function) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  fs.readFile("./dist/public/error.html", 'utf-8', function (readerr, data) {
    data = data.replace('<%= message %>', err.message).replace('<%= error.stack %>', err.stack).replace('<%= error.status %>', err.status);
    res.send(data);
  })
});

module.exports = app;

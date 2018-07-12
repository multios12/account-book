import express from 'express';
import fs from 'fs';
import path from 'path';

var app = express();
//#region settings
var logDirectory = path.join(process.cwd(), './log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var logFile = logDirectory + '/access.log';
app.use(require('morgan')('combined', {stream: fs.createWriteStream(logFile, { flags: 'a' })}));
app.use(require('compression')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//#endregion

//#region routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));
app.use('/days', require('./routes/days'));
app.use('/details', require('./routes/details'));
app.use('/savings',  require('./routes/savings'));
app.use('/settings', require('./routes/settings'));
app.use('/status', require('./routes/status'));
//#endregion

//#region error handler
app.use(function (next: Function) { next(require('http-errors')(404)) });

app.use(function (err: any, req: express.Request, res: express.Response, next: Function) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  fs.readFile("./dist/public/error.html", 'utf-8', function (readerr, data) {
    data = data.replace('<%= message %>', err.message).replace('<%= error.stack %>', err.stack).replace('<%= error.status %>', err.status);
    res.send(data);
  })
});
//#endregion

module.exports = app;

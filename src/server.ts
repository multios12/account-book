#!/usr/bin/env node
import http from 'http';
import path from 'path';

var app = require('./app');
var debug = require('debug')('bootstraptemplate:server');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(process.cwd(), './data/db.sqlite'));

// SQL作成
db.serialize(() => {
  var sqlCreateDetails = "CREATE TABLE IF NOT EXISTS details ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date` TEXT, `type` INTEGER, `account` INTEGER, `amount` NUMERIC DEFAULT 0 )";
  var sqlCreateSavings = "CREATE TABLE IF NOT EXISTS savings ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date` TEXT, `type` INTEGER, `amount` NUMERIC DEFAULT 0 ) ";
  var sqlCreateUsers   = "CREATE TABLE IF NOT EXISTS users   ( `id`	INTEGER NOT NULL UNIQUE,`email`	TEXT NOT NULL,`name`	TEXT NOT NULL,`password`	TEXT NOT NULL,`role`	TEXT NOT NULL DEFAULT 'group1',PRIMARY KEY(`id`));";
  db.run(sqlCreateDetails);
  db.run(sqlCreateSavings);
  db.run(sqlCreateUsers);
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

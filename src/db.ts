import path from 'path';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(process.cwd(), './data/db.sqlite'));

const sqlCreateDetails = "CREATE TABLE IF NOT EXISTS details ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date` TEXT, `type` INTEGER, `account` INTEGER, `amount` NUMERIC DEFAULT 0 )";
const sqlCreateSavings = "CREATE TABLE IF NOT EXISTS savings ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date` TEXT, `type` INTEGER, `amount` NUMERIC DEFAULT 0 ) "
db.serialize(() => {
  console.log("initialize database")
  db.run(sqlCreateDetails);
  db.run(sqlCreateSavings);
});

export default db;

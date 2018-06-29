import express from 'express';
import path from 'path';

var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(process.cwd(), './data/db.sqlite'));

router.get('/', (req, res, next) => {
    db.serialize(() => {
<<<<<<< HEAD
        var sql = 'SELECT * FROM savings ORDER BY date DESC';
        db.all(sql, (err: any, rows: any) => {
=======
        if (!req.query.date) {
            res.status(501);
            res.send('err');
            return;
        }

        var sql = 'SELECT * FROM savings WHERE date = ? ORDER BY date DESC';
        db.all(sql, [req.query.date], (err: any, rows: any) => {
>>>>>>> ec684a86ca10bb43422cacdb1da4ad62316c5383
            res.send(rows);
        });
    });
});

router.put('/', (req, res, next) => {
    db.serialize(() => {
<<<<<<< HEAD
        const statement = db.prepare('INSERT INTO savings (date, type, amount) VALUES (?, ?, ?)');
        statement.run(req.body.date, req.body.type, req.body.amount);
=======
        const statement = db.prepare('INSERT INTO savings (date, type, account, amount) VALUES (?, ?, ?, ?)');
        statement.run(req.body.date, req.body.type, req.body.account, req.body.amount);
>>>>>>> ec684a86ca10bb43422cacdb1da4ad62316c5383
        statement.finalize();
        res.status(200);
        res.send('ok');
    });
});

router.delete('/', (req, res, next) => {
    db.serialize(() => {
        const statement = db.prepare('DELETE FROM savings WHERE id = ?');
        statement.run(req.query.id);
        statement.finalize();
        res.status(200);
        res.send('ok');
    });
})

module.exports = router;

import express from 'express';
import path from 'path';

var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(process.cwd(), './data/db.sqlite'));

router.get('/', (req, res, next) => {
    db.serialize(() => {
        if (!req.query.date) {
            res.status(501);
            res.send('err');
            return;
        }

        var sql = 'SELECT * FROM savings WHERE date = ? ORDER BY date DESC';
        db.all(sql, [req.query.date], (err: any, rows: any) => {
            res.send(rows);
        });
    });
});

router.put('/', (req, res, next) => {
    db.serialize(() => {
        const statement = db.prepare('INSERT INTO savings (date, type, account, amount) VALUES (?, ?, ?, ?)');
        statement.run(req.body.date, req.body.type, req.body.account, req.body.amount);
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

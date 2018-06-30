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

        var sql = 'SELECT * FROM details WHERE date = ?';
        db.all(sql, [req.query.date], (err: any, rows: any) => res.send(rows));
    });
});

router.put('/', (req, res, next) => {

    db.serialize(() => {
        const statement = db.prepare('INSERT INTO details (date, type, account, amount) VALUES (?, ?, ?, ?)');
        var values = Array.isArray(req.body) ? req.body : [req.body];
        values.forEach(v => statement.run(v.date, v.type, v.account, v.amount));
        statement.finalize();
        res.status(200);
        res.send('ok');
    });
});

router.post('/', (req, res, next) => {
    db.serialize(() => {
        // 詳細テーブル更新
        const statement = db.prepare('UPDATE details SET date = ? , item = ?, amount = ? WHERE id = ?');
        statement.run(req.body.date, req.body.item, req.body.amount, req.body.id);
        statement.finalize();
        res.status(200);
        res.send('ok');
    });
});

router.delete('/', (req, res, next) => {
    db.serialize(() => {
        const statement = db.prepare('DELETE FROM details WHERE id = ?');
        statement.run(req.query.id);
        statement.finalize();
        res.status(200);
        res.send('ok');
    });
})

module.exports = router;

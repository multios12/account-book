import db from '../db';
import express from 'express';

var router = express.Router();

router.get('/', (req, res, next) => {
        if (!req.query.date) {
        res.status(501).send('err');
            return;
        }

        var sql = 'SELECT * FROM details WHERE date = ?';
        db.all(sql, [req.query.date], (err: any, rows: any) => res.send(rows));
    });

router.put('/', (req, res, next) => {
    db.serialize(() => {
        const statement = db.prepare('INSERT INTO details (date, type, account, amount) VALUES (?, ?, ?, ?)');
        var values = Array.isArray(req.body) ? req.body : [req.body];
        values.forEach(v => statement.run(v.date, v.type, v.account, v.amount));
        statement.finalize();
        res.status(200).send('ok');
    });
});

router.post('/', (req, res, next) => {
    const sql = 'UPDATE details SET date = ? , item = ?, amount = ? WHERE id = ?';
    db.run(sql, req.body.date, req.body.item, req.body.amount, req.body.id);
    res.status(200).send('ok');
});

router.delete('/', (req, res, next) => {
    db.run('DELETE FROM details WHERE id = ?', req.query.id);
    res.status(200).send('ok');
})

module.exports = router;

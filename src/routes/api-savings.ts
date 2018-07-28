import db from '../db';
import express from 'express';

var router = express.Router();

router.get('/', (req, res, next) => {
    db.all('SELECT * FROM savings ORDER BY date DESC', (err: any, rows: any) => res.send(rows));
});

router.put('/', (req, res, next) => {
    const sql = 'INSERT INTO savings (date, type, amount) VALUES (?, ?, ?)';
    db.run(sql, req.body.date, req.body.type, req.body.amount);
    res.status(200).send('ok');
});

router.delete('/', async (req, res, next) => {
    db.run('DELETE FROM savings WHERE id = ?', req.query.id);
    res.status(200).send('ok');
})

module.exports = router;

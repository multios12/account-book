import express from 'express';
import path from 'path';
import moment from 'moment';

var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(process.cwd(), './data/db.sqlite'));

router.get('/', (req, res, next) => {
    db.serialize(() => {
        if (!req.query.month) {
            return;
        }

        var startDate = new Date(req.query.month + '-1');
        var endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

        db.serialize(() => {
            var startMoment = moment(startDate).format('YYYY-MM-DD');
            var endMoment = moment(endDate).format('YYYY-MM-DD');
            var sql = 'select type, sum(amount) as amount from details where date >= ? AND date <= ? group by type, account order by date';
            db.all(sql, [startMoment, endMoment], (err: any, rows: any) => {
                res.send(rows);
            });
        });
    });
});

module.exports = router;

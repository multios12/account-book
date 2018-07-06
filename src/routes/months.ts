import db from '../db';
import express from 'express';
import moment from 'moment';
var router = express.Router();

router.get('/', (req, res, next) => {
    if (!req.query.month) return;

    var d = getFirstAndLastDay(req.query.month);
    var sql = 'select type, sum(amount) as amount from details where date >= ? AND date <= ? group by type order by date';
    db.all(sql, [d.start, d.end], (err: any, rows: any) => res.send(rows));
});

function getFirstAndLastDay(month: string) {
    var startDate = new Date(month + '-1');
    var endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
            var startMoment = moment(startDate).format('YYYY-MM-DD');
            var endMoment = moment(endDate).format('YYYY-MM-DD');

    return { start: startMoment, end: endMoment };
}
module.exports = router;

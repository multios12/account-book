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
            var sql = 'select date, type, sum(amount) as amount from details where date >= ? AND date <= ? group by date, type order by date';
            db.all(sql, [startMoment, endMoment], (err: any, rows: any) => {
                var values: any[] = asdate(startDate, endDate, rows);
                res.send(values);
            });
        });
    });
});

function asdate(startDate: Date, endDate: Date, rows: any[]) {
    var values: any[] = [];
    for (var i = 1; i <= endDate.getDate(); i++) {
        var t = moment(new Date(startDate.getFullYear(), startDate.getMonth(), i)).format('YYYY-MM-DD');
        var cash = rows.filter(r => r.date == t && r.type == 10).map(r => r.amount).reduce((p, c) => p + c, 0);
        var bank = rows.filter(r => r.date == t && r.type == 20).map(r => r.amount).reduce((p, c) => p + c, 0);
        var credit = rows.filter(r => r.date == t && r.type == 30).map(r => r.amount).reduce((p, c) => p + c, 0);

        var data = { date: t, cash: cash, bank: bank, credit: credit };
        values.push(data);
    }
    return values;
}

module.exports = router;

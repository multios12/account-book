import db from '../db';
import express from 'express';
import moment from 'moment';
import { getFirstAndLastDay } from '../modules/settingStore';

var router = express.Router();

router.get('/', (req, res, next) => {
    if (!req.query.month) return;

    var dates = getFirstAndLastDay(req.query.month);
            var sql = 'select date, type, sum(amount) as amount from details where date >= ? AND date <= ? group by date, type order by date';
    db.all(sql, [dates.start, dates.end], (err: any, rows: any) => res.send(asdate(dates.startDate, dates.endDate, rows)));
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

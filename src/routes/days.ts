import db from '../db';
import express from 'express';
import moment from 'moment';

var router = express.Router();

router.get('/', (req, res, next) => {
    if (!req.query.month) return;

    const startDate = new Date(req.query.month + '-1');
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    const startMoment = moment(startDate).format('YYYY-MM-DD');
    const endMoment = moment(endDate).format('YYYY-MM-DD');

            var sql = 'select date, type, sum(amount) as amount from details where date >= ? AND date <= ? group by date, type order by date';
    db.all(sql, [startMoment, endMoment], (err: any, rows: any) => res.send(asdate(startDate, endDate, rows)));
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

router.get('/report', (req, res, next) => {
    var incomes : any[] = [];
    var spendings : any[] = [];
    // balance
    var sql = 'SELECT account, sum(amount) AS amount FROM details WHERE date >= ? AND date <= ? GROUP BY account';
    var d = getFirstAndLastDay(req.query.month);
    db.each(sql, [d.start, d.end], (err: any, row: any) => { 
        if (row.account < 500) {
            incomes.push(row);
        } else {
            spendings.push(row);
        }
    }, () => res.send({incomes: incomes, spendings: spendings}));
})

function getFirstAndLastDay(month: string) {
    var startDate = new Date(month + '-1');
    var endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    var startMoment = moment(startDate).format('YYYY-MM-DD');
    var endMoment = moment(endDate).format('YYYY-MM-DD');

    return { start: startMoment, end: endMoment };
}

module.exports = router;

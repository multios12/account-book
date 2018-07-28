import db from '../db';
import express from 'express';
import moment from 'moment';
import { getFirstAndLastDay } from '../modules/settingStore';

var router = express.Router();

router.get('/:year/:month', (req, res, next) => {
    var incomes : any[] = [];
    var spendings : any[] = [];

    // balance
    var sql = 'SELECT account, sum(amount) AS amount FROM details WHERE date >= ? AND date <= ? GROUP BY account';
    var d = getFirstAndLastDay(req.params.year + '-' + req.params.month);
    db.each(sql, [d.start, d.end], (err: any, row: any) => { 
        if (row.account < 500) {
            incomes.push(row);
        } else {
            spendings.push(row);
        }
    }, () => res.send({incomes: incomes, spendings: spendings}));
})

module.exports = router;

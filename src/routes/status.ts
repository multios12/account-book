import db from '../db';
import express from 'express';
import path from 'path';
import moment from 'moment';
import { getFirstAndLastDay } from '../modules/settingStore';

var router = express.Router();

router.get('/', (req, res, next) => {
    if (!req.query.month) return;

    var dates = getFirstAndLastDay(req.query.month);
    var sql = 'select type,account, sum(amount) as amount from details where date >= ? AND date <= ? group by type, account';
    db.all(sql, [dates.start, dates.end], (err: any, rows: any) => {
        var values: any[] = asdate(rows);
        res.send(values);
    });
});

function asdate(rows: any[]) {
    var values: any[] = [];
    var settings = require(path.join(process.cwd(), './data/items.json'));
    for (var i = 0; i < settings.accounts.length; i++) {
        var a = settings.accounts[i];
        for (var j = 0; j < settings.types.length; j++) {
            var t = settings.types[j];
            var amount = rows.filter(r => r.account == a.value && r.type == t.value).map(r => r.amount).reduce((p, c) => p + c, 0);

            var data = { group: a.group, type: t.value, amount: amount };
            values.push(data);
        }
    }

    var values2 = [];
    for (var j = 0; j < settings.types.length; j++) {
        var t = settings.types[j];
        for (var i = 0; i < settings.groups.length; i++) {
            var g = settings.groups[i];
            var amount = values.filter(r=> r.group == g.value && r.type == t.value).map(r => r.amount).reduce((p, c) => p + c, 0);

            var data = { group: g.value, type: t.value, amount: amount };
            values2.push(data);
        }
    }
    return values2;
}

module.exports = router;
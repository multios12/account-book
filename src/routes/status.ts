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
            var sql = 'select type,account, sum(amount) as amount from details where date >= ? AND date <= ? group by type, account';
            db.all(sql, [startMoment, endMoment], (err: any, rows: any) => {
                var values: any[] = asdate(rows);
                res.send(values);
            });
        });
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
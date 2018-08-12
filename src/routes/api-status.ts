import express from "express";
import db from "../db";
import { getFirstAndLastDay } from "../modules/settingStore";
import { settings } from "../modules/settingStore";

const router = express.Router();

router.get("/", (req, res, next) => {
    if (!req.query.month) { return; }

    const dates = getFirstAndLastDay(req.query.month);
    const sql = "select type,account, sum(amount) as amount "
        + "from details where date >= ? AND date <= ? group by type, account";
    db.all(sql, [dates.start, dates.end], (err: any, rows: any) => {
        const values: any[] = asdate(rows);
        res.send(values);
    });
});

function asdate(rows: any[]) {
    const values: any[] = [];
    for (const a of settings.accounts) {
        for (const t of settings.types) {
            const amount = rows.filter((r) => r.account === a.value && r.type === t.value)
                .map((r) => r.amount)
                .reduce((p, c) => p + c, 0);

            const data = { group: a.group, type: t.value, amount };
            values.push(data);
        }
    }

    const values2 = [];
    for (const t of settings.types) {
        for (const g of settings.groups) {
            const amount = values.filter((r) => r.group === g.value && r.type === t.value)
                .map((r) => r.amount)
                .reduce((p, c) => p + c, 0);

            const data = { group: g.value, type: t.value, amount };
            values2.push(data);
        }
    }
    return values2;
}

export default router;

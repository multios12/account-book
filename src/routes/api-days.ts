import express from "express";
import moment from "moment";
import db from "../db";
import { getFirstAndLastDay } from "../modules/settingStore";

const router = express.Router();

router.get("/", (req, res, next) => {
    if (!req.query.month) { return; }

    const dates = getFirstAndLastDay(req.query.month);
    const sql = "select date, type, sum(amount) as amount "
        + "from details where date >= ? AND date <= ? group by date, type order by date";
    db.all(sql, [dates.start, dates.end],
        (err: any, rows: any) => res.send(asdate(dates.startDate, dates.endDate, rows)));
});

function asdate(startDate: Date, endDate: Date, rows: any[]) {
    const values: any[] = [];
    for (let i = 1; i <= endDate.getDate(); i++) {
        const t = moment(new Date(startDate.getFullYear(), startDate.getMonth(), i)).format("YYYY-MM-DD");
        const cash = rows.filter((r) => r.date === t && r.type === 10).map((r) => r.amount).reduce((p, c) => p + c, 0);
        const bank = rows.filter((r) => r.date === t && r.type === 20).map((r) => r.amount).reduce((p, c) => p + c, 0);
        const credit = rows.filter((r) => r.date === t && r.type === 30)
            .map((r) => r.amount)
            .reduce((p, c) => p + c, 0);

        const data = { date: t, cash, bank, credit };
        values.push(data);
    }
    return values;
}

export default router;

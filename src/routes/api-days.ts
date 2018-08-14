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

/**
 * 指定された期間の1日ごとに支出を集計して返す
 *
 * @param startDate 開始日
 * @param endDate 終了日
 * @param rows 集計元詳細データ
 * @return 集計結果データ
 */
function asdate(startDate: Date, endDate: Date, rows: any[]) {
    const values: any[] = [];

    let targetMoment = moment(startDate);
    for (let i = 0; i <= moment(endDate).diff(moment(startDate), "days"); i++) {

        const t = targetMoment.format("YYYY-MM-DD");
        const cash = rows.filter((r) => r.date === t && r.type === 10).map((r) => r.amount).reduce((p, c) => p + c, 0);
        const bank = rows.filter((r) => r.date === t && r.type === 20).map((r) => r.amount).reduce((p, c) => p + c, 0);
        const credit = rows.filter((r) => r.date === t && r.type === 30)
            .map((r) => r.amount)
            .reduce((p, c) => p + c, 0);

        const data = { date: t, cash, bank, credit };
        values.push(data);
        targetMoment = targetMoment.add("days", 1);
    }
    return values;
}

export default router;

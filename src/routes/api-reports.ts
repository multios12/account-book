import express from "express";
import db from "../db";
import { getFirstAndLastDay } from "../modules/settingStore";

const router = express.Router();

router.get("/:year/:month", (req, res, next) => {
    const incomes: any[] = [];
    const spendings: any[] = [];

    // balance
    const sql = "SELECT account, sum(amount) AS amount FROM details WHERE date >= ? AND date <= ? GROUP BY account";
    const d = getFirstAndLastDay(req.params.year + "-" + req.params.month);
    db.each(sql, [d.start, d.end], (err: any, row: any) => {
        if (row.account < 500) {
            incomes.push(row);
        } else {
            spendings.push(row);
        }
    }, () => res.send({ incomes, spendings }));
});

export default router;

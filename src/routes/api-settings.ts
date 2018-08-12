import express from "express";
import moment from "moment";
import { settings, write } from "../modules/settingStore";

const router = express.Router();

router.get("/", (req, res, next) => res.json(settings));

router.post("/outdates", (req, res, next) => {
  const value = req.body;
  const selectedMonth = moment(new Date(value.outdate)).format("YYYY-MM");
  if (!settings.outdates) { settings.outdates = []; }
  for (let index = 0; index < settings.outdates.length; index++) {
    const m = moment(new Date(settings.outdates[index].outdate)).format("YYYY-MM");
    if (m === selectedMonth) {
      settings.outdates[index] = value;

      settings.outdates.sort(compare);
      return;
    }
  }
  settings.outdates.push(value);
  settings.outdates.sort(compare);

  write();
  res.json(settings.outdates);
});

function compare(a: { outdate: string }, b: { outdate: string }) {
  if (a.outdate > b.outdate) {
    return 1;
  } else if (a.outdate < b.outdate) {
    return -1;
  }
  return 0;
}
export default router;

import express from "express";
import moment from "moment";
import { settings, write } from "../modules/settingStore";

const router = express.Router();

router.get("/", (req, res, next) => res.json(settings));

router.delete("/outdates/:index", (req, res, next) => {
  settings.outdates.splice(req.params.index, 1);
  write();
  res.json(settings.outdates);
});

router.post("/outdates", (req, res, next) => {
  if (!settings.outdates) { settings.outdates = []; }

  const value = {outdate: req.body.outdate, month: moment(new Date(req.body.outdate)).format("YYYY-MM")};

  for (let index = 0; index < settings.outdates.length; index++) {
    const m = moment(new Date(settings.outdates[index].outdate)).format("YYYY-MM");
    if (m === value.outdate) {
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

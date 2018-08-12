import express from "express";
import apiDays from "./api-days";
import apiDetails from "./api-details";
import apiLogin from "./api-login";
import apiReports from "./api-reports";
import apiSavings from "./api-savings";
import apiSettings from "./api-settings";
import apiStatus from "./api-status";
const router = express.Router();

/* homepage Routing */
router.get("/", (req, res, next) => res.sendfile("../public/index.html"));

//#region API Routings
router.use("/api/", apiLogin)
    .use("/api/days", apiDays)
    .use("/api/details", apiDetails)
    .use("/api/reports", apiReports)
    .use("/api/savings", apiSavings)
    .use("/api/settings", apiSettings)
    .use("/api/status", apiStatus);
//#endregion

export default router;

import express from "express";
import fs from "fs";
import path from "path";
import { verifyMiddleware } from "./auth";
import routes from "./routes/";
const app = express();

//#region settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//#endregion

//#region routes
app.use(express.static(path.join(__dirname, "public")));
app.use(verifyMiddleware);
app.use("/", routes);
//#endregion

//#region error handler
app.use((next: FunctionConstructor) => { next(require("http-errors")(404)); });

app.use((err: any, req: express.Request, res: express.Response, next: FunctionConstructor) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  fs.readFile("./dist/public/error.html", "utf-8", (readerr, data) => {
    data = data.replace("<%= message %>", err.message)
      .replace("<%= error.stack %>", err.stack)
      .replace("<%= error.status %>", err.status);
    res.send(data);
  });
});
//#endregion

module.exports = app;

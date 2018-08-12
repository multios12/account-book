import fs from "fs";
import moment from "moment";
import path from "path";
export let settings: {
    outdates?: any[], accounts: Array<{ value: number, group: number, text: string }>,
    groups: Array<{ value: number, text: string }>, types: Array<{ value: number, text: string }>,
};
read();

/** 設定をファイルから読み込む */
export function read() {
    const filename = path.join(process.cwd(), "./data/settings.json");
    if (!fs.existsSync(filename)) {
        fs.copyFileSync(path.join(process.cwd(), "./settingsDefault.json"), filename);
    }
    settings = JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
}

/** 設定をファイルに書き込む */
export function write() {
    const filename = path.join(process.cwd(), "./data/settings.json");
    fs.writeFileSync(filename, JSON.stringify(settings));
}

/**
 * 指定された年月文字列の開始日と終了日を返す
 * @param month 年月文字列
 */
export function getFirstAndLastDay(month: string) {
    const startDate = new Date(month + "-1");
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    const startMoment = moment(startDate).format("YYYY-MM-DD");
    const endMoment = moment(endDate).format("YYYY-MM-DD");

    return { start: startMoment, end: endMoment, startDate, endDate };
}

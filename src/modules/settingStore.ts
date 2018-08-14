import assert from "assert";
import fs from "fs";
import moment from "moment";
import path from "path";
import { isUndefined } from "util";

export let settings: {
    /** 締め日リスト */
    outdates: Array<{ month: string, outdate: string }>,
    /** 科目リスト */
    accounts: Array<{ value: number, group: number, text: string }>,
    /** グループリスト */
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
    assert(!isUndefined(month));
    assert(month.length === 7);

    // 開始日の特定
    let startMoment = moment(month + "-01");
    const backMonth = moment(month + "-01").add("months", -1).format("YYYY-MM");
    for (const outdate of settings.outdates) {
        if (outdate.month === backMonth) { startMoment = moment(outdate.outdate).add("days", 1); }
    }

    // 終了日の特定
    let endMoment = moment(month + "-01").add("months", 1).add("days", -1);
    for (const outdate of settings.outdates) {
        if (outdate.month === month) { endMoment = moment(outdate.outdate); }
    }

    console.log(`開始日:${startMoment}, 終了日:${endMoment}`);
    return {
        end: endMoment.format("YYYY-MM-DD"),
        endDate: endMoment.toDate(),
        start: startMoment.format("YYYY-MM-DD"),
        startDate: startMoment.toDate(),
    };
}

import fs from 'fs';
import axios from 'axios';
import moment from 'moment';
import path from 'path';
export var settings: {
    outdates?: any[], accounts: { value: number, group: number, text: string }[],
    groups: { value: number, text: string }[], types: { value: number, text: string }[]
};
read();

export function read() {
    var filename = path.join(process.cwd(), './data/settings.json');
    if(!fs.existsSync(filename)){
        fs.copyFileSync(path.join(process.cwd(), './settingsDefault.json'), filename);
    }
    settings =JSON.parse(fs.readFileSync(filename, {encoding: 'utf-8'}));
}

export function write() {
    var filename = path.join(process.cwd(), './data/settings.json');
    fs.writeFileSync(filename, settings);
}

export function getFirstAndLastDay(month: string) {
    var startDate = new Date(month + '-1');
    var endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    var startMoment = moment(startDate).format('YYYY-MM-DD');
    var endMoment = moment(endDate).format('YYYY-MM-DD');

    return { start: startMoment, end: endMoment, startDate: startDate, endDate: endDate };
}

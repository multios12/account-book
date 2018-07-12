import moment from 'moment';

export function getFirstAndLastDay(month: string) {
    var startDate = new Date(month + '-1');
    var endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    var startMoment = moment(startDate).format('YYYY-MM-DD');
    var endMoment = moment(endDate).format('YYYY-MM-DD');

    return { start: startMoment, end: endMoment, startDate: startDate, endDate: endDate };
}



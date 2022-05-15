export default class sfDate {
    constructor(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
}
export function setDate(date, year, month, day) {
    if (isValidDate(year, month, day)) {
        date.year = year;
        date.month = month;
        date.day = day;
    }
    return date;
}
export function addOneDay(date) {
    if (isValidDate(date.year, date.month, date.day + 1)) {
        date.day++;
    }
    else if (isValidDate(date.year, date.month + 1, 1)) {
        date.month++;
        date.day = 1;
    }
    else if (isValidDate(date.year + 1, date.month, date.day)) {
        date.year++;
        date.month = 1;
        date.day = 1;
    }
    return date;
}
export function dateEquals(date1, date2) {
    return date1.year == date2.year && date1.month == date2.month && date1.day == date2.day;
}
export function isValidDate(y, m, d) {
    if (m > 12) {
        return false;
    }
    if (d > 31) {
        return false;
    }
    if ((d > 30 && (m == 2 || m == 4 || m == 6 || m == 9 || m == 11))) {
        return false;
    }
    if (d > 29 && m == 2) {
        return false;
    }
    return true;
}
export function dateToString(date) {
    let day = '';
    switch (date.month) {
        case 1:
            day = day.concat('January ');
            break;
        case 2:
            day = day.concat('February ');
            break;
        case 3:
            day = day.concat('March ');
            break;
        case 4:
            day = day.concat('April ');
            break;
        case 5:
            day = day.concat('May ');
            break;
        case 6:
            day = day.concat('June ');
            break;
        case 7:
            day = day.concat('July ');
            break;
        case 8:
            day = day.concat('August ');
            break;
        case 9:
            day = day.concat('September ');
            break;
        case 10:
            day = day.concat('October ');
            break;
        case 11:
            day = day.concat('November ');
            break;
        case 12:
            day = day.concat('December ');
            break;
    }
    day = day.concat(date.day.toString());
    switch (date.day) {
        case 1:
        case 21:
        case 31:
            day = day.concat('st');
            break;
        case 2:
        case 22:
            day = day.concat('nd');
            break;
        case 3:
        case 23:
            day = day.concat('rd');
            break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
            day = day.concat('th');
            break;
    }
    day = day.concat(', ', date.year.toString());
    return day;
}

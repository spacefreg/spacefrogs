export default class sfDate {
    year: number;
    month: number;
    day: number;
    constructor(year: number, month: number, day: number);
}
export declare function setDate(date: sfDate, year: number, month: number, day: number): sfDate;
export declare function addOneDay(date: sfDate): sfDate;
export declare function dateEquals(date1: sfDate, date2: sfDate): boolean;
export declare function isValidDate(y: number, m: number, d: number): boolean;
export declare function dateToString(date: sfDate): string;

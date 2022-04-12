import { LEAP_YEAR_MONTH_INDEX, MonthIndexes } from '../constants';
import { MonthDaysMap } from '../constants/monthDays';
import { Converter } from '../Converter';

export default class Core {
  private static converter = Converter;

  public static now(): number {
    return Date.now();
  }

  public static getYear(value: number): number {
    return this.converter.millisecondsToValue(value, 'YEAR');
  }

  public static getMonth(value: number): number {
    const [monthIndex] = this.getMonthAndRestDays(value);
    return monthIndex;
  }

  public static getDay(value: number): number {
    const [_, day] = this.getMonthAndRestDays(value);
    return day;
  }

  public static getHours(value: number): number {
    const restMilliseconds = this.getRestMillisecondsOfDays(value);
    return this.converter.millisecondsToValue(restMilliseconds, 'HOUR');
  }

  public static getMinutes(value: number): number {
    const restMilliseconds = this.getRestMillisecondsOfHours(value);
    return this.converter.millisecondsToValue(restMilliseconds, 'MINUTE');
  }

  public static getSeconds(value: number): number {
    const restMilliseconds = this.getRestMillisecondsOfMinutes(value);
    return this.converter.millisecondsToValue(restMilliseconds, 'SECOND');
  }

  public static getMilliseconds(value: number): number {
    return this.getRestMillisecondsOfSeconds(value);
  }

  public static getDate(value: number): [number, number, number] {
    return [this.getYear(value), this.getMonth(value), this.getDay(value)];
  }

  public static getTime(value: number): [number, number, number, number] {
    const hours = this.getHours(value);
    const minutes = this.getMinutes(value);
    const seconds = this.getSeconds(value);
    const milliseconds = this.getMilliseconds(value);
    return [hours, minutes, seconds, milliseconds];
  }

  public static getDateTime(
    value: number
  ): [number, number, number, number, number, number, number] {
    const date = this.getDate(value);
    const time = this.getTime(value);
    return [...date, ...time];
  }

  private static getMonthDays(index: MonthIndexes, isLeapYear: boolean): number {
    if (isLeapYear && index === LEAP_YEAR_MONTH_INDEX) return MonthDaysMap[index] + 1;
    return MonthDaysMap[index];
  }

  private static getRestMillisecondsOfSeconds(value: number): number {
    const restMillisecondsOfMinutes = this.getRestMillisecondsOfMinutes(value);
    const seconds = this.getSeconds(value);
    return restMillisecondsOfMinutes - this.converter.valueToMilliseconds(seconds, 'SECOND');
  }

  private static getRestMillisecondsOfMinutes(value: number): number {
    const restMillisecondsOfHours = this.getRestMillisecondsOfHours(value);
    const minutes = this.getMinutes(value);
    return restMillisecondsOfHours - this.converter.valueToMilliseconds(minutes, 'MINUTE');
  }

  private static getRestMillisecondsOfHours(value: number): number {
    const restMillisecondsOfDays = this.getRestMillisecondsOfDays(value);
    const hours = this.getHours(value);
    return restMillisecondsOfDays - this.converter.valueToMilliseconds(hours, 'HOUR');
  }

  private static getRestMillisecondsOfDays(value: number): number {
    const restMillisecondsOfYear = this.getRestMillisecondsOfYear(value);
    const days = this.getRestDaysOfYear(value);
    return restMillisecondsOfYear - this.converter.valueToMilliseconds(days, 'DAY');
  }

  private static getRestMillisecondsOfYear(value: number): number {
    const year = this.getYear(value);
    return value - this.converter.valueToMilliseconds(year, 'YEAR');
  }

  private static getRestDaysOfYear(value: number): number {
    const restMillisecondsOfYear = this.getRestMillisecondsOfYear(value);
    return this.converter.millisecondsToValue(restMillisecondsOfYear, 'DAY');
  }

  private static getMonthAndRestDays(value: number): [number, number] {
    const days = this.getRestDaysOfYear(value);
    const leapYearDays = this.getLeapYearDays(value);
    return this.findMonthDaysInMap(days - leapYearDays, this.checkLeapYear(value));
  }

  private static findMonthDaysInMap(
    days: number,
    isLeapYear: boolean,
    index: MonthIndexes = MonthIndexes.JANUARY
  ): [number, number] {
    const monthDays = this.getMonthDays(index, isLeapYear);
    if (days < monthDays) return [index, days];
    return this.findMonthDaysInMap(days - MonthDaysMap[index], isLeapYear, ++index);
  }

  private static checkLeapYear(value: number): boolean {
    const year = this.getYear(value);
    return year % 4 === 0;
  }

  private static getLeapYearDays(value: number): number {
    const year = this.getYear(value);
    return Math.floor((year - 2) / 4);
  }
}

import { ConverterInterface } from 'interfaces';
import { DateTimeUnits } from 'constants';

export class Converter implements ConverterInterface {
  private static converterInstance: Converter;

  private constructor() {}

  public static get instance(): Converter {
    if (!Converter.converterInstance) {
      Converter.converterInstance = new Converter();
    }

    return Converter.converterInstance;
  }

  public valueToMilliseconds(value: number, unit: DateTimeUnits): number {
    const result = value * unit;

    if (unit === DateTimeUnits.YEAR) {
      return result + this.getLeapYearOffset(value);
    }

    return result;
  }

  public millisecondsToValue(milliseconds: number, unit: DateTimeUnits): number {
    if (unit === DateTimeUnits.YEAR) {
      milliseconds += this.getLeapYearOffset(milliseconds);
    }
    return Math.floor(milliseconds / unit);
  }

  public getRestMilliseconds(milliseconds: number, unit: DateTimeUnits): number {
    const result = milliseconds % unit;

    if (unit === DateTimeUnits.YEAR) {
      return result - this.getLeapYearOffset(milliseconds);
    }

    return result;
  }

  private getLeapYearOffset(milliseconds: number): number {
    const year = Math.floor(milliseconds / DateTimeUnits.YEAR);
    let result: number = 0;

    for (let i = 0; i <= year; i++) {
      if (this.checkLeapYear(i)) {
        result++;
      }
    }

    return this.valueToMilliseconds(result, DateTimeUnits.DAY);
  }

  private checkLeapYear(year: number): boolean {
    if (year % 4 === 0) {
      if (year % 400 === 0) return true;
      if (year % 100 === 0) return false;
      return true;
    }
    return false;
  }
}

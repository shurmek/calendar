import { DateTimeUnits } from './constants';

type Unit = keyof Omit<typeof DateTimeUnits, 'MILLISECOND'>;

export class Converter {
  public static valueToMilliseconds(value: number, unit: Unit): number {
    return value * DateTimeUnits[unit];
  }

  public static millisecondsToValue(value: number, unit: Unit): number {
    return Math.floor(value / DateTimeUnits[unit]);
  }
}

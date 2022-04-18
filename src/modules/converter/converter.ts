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
    return value * unit;
  }

  public millisecondsToValue(milliseconds: number, unit: DateTimeUnits): number {
    return Math.floor(milliseconds / unit);
  }

  public getRestMilliseconds(milliseconds: number, unit: DateTimeUnits): number {
    return milliseconds % unit;
  }
}

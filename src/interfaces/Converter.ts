import { DateTimeUnits } from '../constants';

export interface ConverterInterface {
  valueToMilliseconds(value: number, unit: DateTimeUnits): number;
  millisecondsToValue(value: number, unit: DateTimeUnits): number;
  getRestMilliseconds(value: number, unit: DateTimeUnits): number;
}

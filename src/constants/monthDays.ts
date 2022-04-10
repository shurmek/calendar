import { DayNumbers } from './dayNumbers';
import { MonthIndexes } from './monthIndexes';

export const MonthDaysMap: Record<MonthIndexes, DayNumbers> = {
  [MonthIndexes.JANUARY]: DayNumbers.JANUARY,
  [MonthIndexes.FEBRUARY]: DayNumbers.FEBRUARY,
  [MonthIndexes.POLUNARY]: DayNumbers.POLUNARY,
  [MonthIndexes.MARCH]: DayNumbers.MARCH,
  [MonthIndexes.APRIL]: DayNumbers.APRIL,
  [MonthIndexes.MAY]: DayNumbers.MAY,
  [MonthIndexes.JUNE]: DayNumbers.JUNE,
  [MonthIndexes.JULY]: DayNumbers.JULY,
  [MonthIndexes.AUGUST]: DayNumbers.AUGUST,
  [MonthIndexes.SEPTEMBER]: DayNumbers.SEPTEMBER,
  [MonthIndexes.OCTOBER]: DayNumbers.OCTOBER,
  [MonthIndexes.NOVEMBER]: DayNumbers.NOVEMBER,
  [MonthIndexes.DECEMBER]: DayNumbers.DECEMBER,
};

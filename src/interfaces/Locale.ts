interface LocaleMonth {
  readonly name: string;
  readonly nameCaseForm: string;
  readonly shortName: string;
}

interface LocaleDayOfWeek {
  readonly abb: string;
  readonly shortName: string;
  readonly longName: string;
}

interface LocaleFullDateOrder {
  readonly year: 0 | 1 | 2;
  readonly month: 0 | 1 | 2;
  readonly day: 0 | 1 | 2;
}

interface LocaleFullDate {
  readonly order: LocaleFullDateOrder;
  readonly separator: string;
}

interface LocalDayPeriod {
  readonly am: string;
  readonly pm: string;
}

export type NumType = 'DIGIT' | 'NUMERAL';

export interface Locale {
  readonly months: LocaleMonth[];
  readonly daysOfWeek: LocaleDayOfWeek[];
  readonly dayPeriod: LocalDayPeriod;
  readonly ordinalSuffixes: string[];
  readonly fullDate: LocaleFullDate;
}

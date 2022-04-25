export class Validator {
  private static __instance: Validator;

  private constructor() {}

  public static get instance(): Validator {
    if (!Validator.__instance) {
      Validator.__instance = new Validator();
    }

    return Validator.__instance;
  }

  public static checkLeapYear(year: number): boolean {
    if (year % 4 === 0) {
      if (year % 400 === 0) return true;
      if (year % 100 === 0) return false;
      return true;
    }
    return false;
  }
}

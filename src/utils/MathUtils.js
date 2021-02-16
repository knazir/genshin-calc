export default class MathUtils {
  static roundToDecimals(value, decimalPlaces) {
    let multiplier = 1;
    for (let i = 0; i < decimalPlaces; i++) {
      multiplier *= 10;
    }
    return Math.round(value * multiplier) / multiplier;
  }

  static percentIncrease(value, percentage) {
    return value * (1 + (percentage / 100));
  }
}

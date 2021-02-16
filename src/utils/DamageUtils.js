import embonus from "../data/embonus";

export default class DamageUtils {
  static getEnemyDefense(enemyLevel) {
    return this._roundToDecimals(5 * enemyLevel + 500, 0);
  }

  static getEnemyDefenseMultiplier(characterLevel, enemyLevel, defenseReduction) {
    let result;
    if (defenseReduction > 0) {
      result = Math.round((characterLevel + 100) / (characterLevel + enemyLevel + 200));
    } else {
      result = (characterLevel + 100) / ((1 - (defenseReduction / 100)) * (enemyLevel + 100) + characterLevel + 100);
    }
    return this._roundToDecimals(result, 2);
  }

  static getEnemyResistanceMultiplier(elementalRes, elementalResReduction) {
    let result;
    const netElementalRes = elementalRes - elementalResReduction;
    if (netElementalRes < 0) {
      result = 1 - ((netElementalRes / 100) / 2);
    } else if (netElementalRes >= 0 && netElementalRes < 75) {
      result = 1 - (netElementalRes / 100);
    } else {
      result = 1 / ((4 * netElementalRes / 100) + 1);
    }
    return this._roundToDecimals(result, 2);
  }

  static _roundToDecimals(value, decimalPlaces) {
    let multiplier = 1;
    for (let i = 0; i < decimalPlaces; i++) {
      multiplier *= 10;
    }
    return Math.round(value * multiplier) / multiplier;
  }
}

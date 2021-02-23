import MathUtils from "./MathUtils";

import embonus from "../data/embonus";

export default class DamageUtils {
  static getDefaultErBonuses() {
    const bonuses = {};
    Object.keys(embonus.names).forEach(type => bonuses[type] = 0);
    return bonuses;
  }

  static getEnemyDefense(enemyLevel) {
    return MathUtils.roundToDecimals(5 * enemyLevel + 500, 0);
  }

  static getEnemyDefenseMultiplier(characterLevel = 0, enemyLevel = 0, defenseReduction = 0) {
    let result;
    if (defenseReduction > 0) {
      result = Math.round((characterLevel + 100) / (characterLevel + enemyLevel + 200));
    } else {
      result = (characterLevel + 100) / ((1 - (defenseReduction / 100)) * (enemyLevel + 100) + characterLevel + 100);
    }
    return MathUtils.roundToDecimals(result, 2);
  }

  static getEnemyResistanceMultiplier(elementalRes = 0, elementalResReduction = 0) {
    let result;
    const netElementalRes = elementalRes - elementalResReduction;
    if (netElementalRes < 0) {
      result = 1 - ((netElementalRes / 100) / 2);
    } else if (netElementalRes >= 0 && netElementalRes < 75) {
      result = 1 - (netElementalRes / 100);
    } else {
      result = 1 / ((4 * netElementalRes / 100) + 1);
    }
    return MathUtils.roundToDecimals(result, 2);
  }

  static getTotalSkillDamage(skillDamage = 0, bonusDamage = 0, elementalBonus = 0, applyElementalBonus) {
    const percentIncrease = bonusDamage + (applyElementalBonus ? elementalBonus : 0);
    const result = MathUtils.percentIncrease(skillDamage, percentIncrease);
    return MathUtils.roundToDecimals(result, 2);
  }

  static getBaseNonCritDamage(atk, totalSkillDamage, enemyDefenseMultiplier) {
    const nonCrit = MathUtils.percentIncrease(atk, totalSkillDamage) * enemyDefenseMultiplier;
    return MathUtils.roundToDecimals(nonCrit, 0);
  }

  static getBaseCritDamage(atk, totalSkillDamage, enemyDefenseMultiplier, critDamage) {
    const nonCrit = MathUtils.percentIncrease(atk, totalSkillDamage);
    const crit = MathUtils.percentIncrease(nonCrit, critDamage) * enemyDefenseMultiplier;
    return MathUtils.roundToDecimals(crit, 0);
  }

  static getAverageDamage(nonCrit, crit, critRate) {
    const weightedNonCrit =  (nonCrit * ((100 - critRate) / 100)) + (crit * (critRate / 100));
    return MathUtils.roundToDecimals(weightedNonCrit, 0);
  }

  static getDamageTypes(element, weaponType, doesShatter) {
    const typeMap = {
      anemo: ["swirl"],
      cryo: ["melt", "superconduct"],
      dendro: [],
      electro: ["overload", "superconduct", "electroCharge"],
      geo: ["shatter"],
      hydro: ["vaporize", "electroCharge"],
      physical: ["shatter"],
      pyro: ["melt", "vaporize", "overload"]
    };
    let result = typeMap[element] || [];
    if (!result) result = [];
    if ((weaponType === "claymore" || doesShatter) && result.indexOf("shatter") === -1) result.push("shatter");
    return result.sort();
  }

  static getReactionMultiplier(type, activatingElement) {
    if (type === "melt" || type === "vaporize") {
      if (activatingElement === "pyro") return 2;
      else return 1.5;
    } else {
      return 0;
    }
  }

  static getElementalMasteryMultiplier(type, elementalMastery) {
    let multiplier = 1;
    if (type === "vaporize" || type === "melt") {
      multiplier = 2.78;
    } else if (["overload", "superconduct", "electroCharge", "shatter", "swirl"].indexOf(type) !== -1) {
      multiplier = 6.66;
    }
    const result = (multiplier * (elementalMastery / (1400 + elementalMastery))) * 100;
    return MathUtils.roundToDecimals(result, 1);
  }

  static getElementalReactionDamage(type, baseDamage, characterLevel, reactionMult, elementalMasteryMult,
                                    enemyResistanceMultiplier, elementalReactionMult = 0) {
    if (type === "vaporize" || type === "melt") {
      const amplifyingMult = MathUtils.percentIncrease(reactionMult, elementalMasteryMult + elementalReactionMult);
      const scaledBaseDamage = baseDamage * amplifyingMult;
      return MathUtils.roundToDecimals(scaledBaseDamage, 0);
    } else {
      const elementalDamage = this._getTransformativeReactionDamage(type, characterLevel);
      const scaledBaseDamage = MathUtils.percentIncrease(elementalDamage, elementalMasteryMult);
      let scaledElementalDamage = MathUtils.percentIncrease(scaledBaseDamage, elementalReactionMult);
      return MathUtils.roundToDecimals(scaledElementalDamage * enemyResistanceMultiplier, 0);
    }
  }

  static _getTransformativeReactionDamage(type, characterLevel) {
    const baseDamage = embonus.superconduct[characterLevel - 1] || 0;
    const scaledDamage = baseDamage * embonus.multipliers[type] || 0;
    return MathUtils.roundToDecimals(scaledDamage, 0);
  }
}

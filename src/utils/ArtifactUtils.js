import MathUtils from "./MathUtils";

import stats from "../data/stats";

export default class ArtifactUtils {
  static addStats(...artifacts) {
    const totalStats = this._filledStats({});
    artifacts.forEach(artifact => {
      Object.entries(artifact).forEach(([statType, statValue]) => {
        totalStats[statType] = totalStats[statType] == null ? statValue : totalStats[statType] + statValue;
      });
    });
    return this._roundStats(totalStats);
  }

  static getFinalStats(characterStats, weaponStats, baseStats, artifactsStats, miscStats, specialStats) {
    characterStats = this._filledStats(characterStats);
    weaponStats = this._filledStats(weaponStats);
    baseStats = this._filledStats(baseStats);
    artifactsStats = this._filledStats(artifactsStats);
    miscStats = this._filledStats(miscStats);
    const finalStats = {};

    // ATK
    const atkPercent = this._sumStats("atkPercent", baseStats, artifactsStats, miscStats);
    const scaledAtk = MathUtils.percentIncrease(baseStats.atk, atkPercent);
    finalStats.atk = Math.ceil(scaledAtk + artifactsStats.atk + miscStats.atk);

    // DEF
    const defPercent = this._sumStats("defPercent", baseStats, artifactsStats, miscStats);
    const scaledDef = MathUtils.percentIncrease(characterStats.def, defPercent);
    finalStats.def = Math.ceil(scaledDef + weaponStats.def + artifactsStats.def + miscStats.def);

    // HP
    const hpPercent = this._sumStats("hpPercent", baseStats, artifactsStats, miscStats);
    const scaledHp = MathUtils.percentIncrease(characterStats.hp, hpPercent);
    finalStats.hp = Math.ceil(scaledHp + weaponStats.hp + artifactsStats.hp + miscStats.hp);

    // Simple-Summed Stats
    finalStats.critRate = this._sumStats("critRate", baseStats, artifactsStats, miscStats);
    finalStats.critDamage = this._sumStats("critDamage", baseStats, artifactsStats, miscStats);
    finalStats.elementalMastery = this._sumStats("elementalMastery", baseStats, artifactsStats, miscStats);
    finalStats.energyRecharge = this._sumStats("energyRecharge", baseStats, artifactsStats, miscStats);
    finalStats.healingBonus = this._sumStats("healingBonus", baseStats, artifactsStats, miscStats);
    finalStats.elementalBonus = this._sumStats("elementalBonus", baseStats, artifactsStats, miscStats);

    return this._roundStats(finalStats);
  }

  static _sumStats(type, ...stats) {
    let total = 0;
    stats.filter(statCollection => statCollection[type]).forEach(statCollection => total += statCollection[type]);
    return total;
  }

  static _filledStats(statCollection) {
    const filledStats = {};
    Object.keys(stats).forEach(stat => {
      if (statCollection[stat] == null) filledStats[stat] = 0;
      else filledStats[stat] = statCollection[stat];
    });
    return filledStats;
  }

  static _roundStats(statCollection) {
    const roundedStats = {};
    const roundToMap = {
      atk: 0,
      def: 0,
      hp: 0,
      critRate: 1,
      critDamage: 1,
      elementalMastery: 0,
      energyRecharge: 1,
      healingBonus: 1,
      elementalBonus: 1
    };
    Object.entries(statCollection).forEach(([stat, value]) => {
      const decimalPlaces = roundToMap[stat];
      roundedStats[stat] = MathUtils.roundToDecimals(value, decimalPlaces);
    });
    return roundedStats;
  }
}

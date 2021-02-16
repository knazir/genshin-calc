import stats from "../data/stats";

export default class ArtifactUtils {
  static addStats(...artifacts) {
    const totalStats = this._filledStats({});
    artifacts.forEach(artifact => {
      Object.entries(artifact).forEach(([statType, statValue]) => {
        totalStats[statType] = totalStats[statType] == null ? statValue : totalStats[statType] + statValue;
      });
    });
    return totalStats;
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
    const scaledAtk = this._increaseByPercent(baseStats.atk, atkPercent);
    finalStats.atk = Math.ceil(scaledAtk + artifactsStats.atk + miscStats.atk);

    // DEF
    const defPercent = this._sumStats("defPercent", baseStats, artifactsStats, miscStats);
    const scaledDef = this._increaseByPercent(characterStats.def, defPercent);
    finalStats.def = Math.ceil(scaledDef + weaponStats.def + artifactsStats.def + miscStats.def);

    // HP
    const hpPercent = this._sumStats("hpPercent", baseStats, artifactsStats, miscStats);
    const scaledHp = this._increaseByPercent(characterStats.hp, hpPercent);
    finalStats.def = Math.ceil(scaledHp + weaponStats.hp + artifactsStats.hp + miscStats.hp);

    // Simple-Summed Stats
    finalStats.critRate = this._sumStats("critRate", baseStats, artifactsStats, miscStats);
    finalStats.critDamage = this._sumStats("critDamage", baseStats, artifactsStats, miscStats);
    finalStats.elementalMastery = this._sumStats("elementalMastery", baseStats, artifactsStats, miscStats);
    finalStats.energyRecharge = this._sumStats("energyRecharge", baseStats, artifactsStats, miscStats);
    finalStats.healingBonus = this._sumStats("healingBonus", baseStats, artifactsStats, miscStats);
    finalStats.elementalBonus = this._sumStats("elementalBonus", baseStats, artifactsStats, miscStats);

    return finalStats;
  }

  static _sumStat(type, ...statCollections) {
    let total = 0;
    statCollections.forEach(stats => total += stats[type]);
    return total;
  }

  static _getSpecialStatIncrease(type, specialStats) {

  }

  static _sumStats(type, ...stats) {
    let total = 0;
    stats.filter(statCollection => statCollection[type]).forEach(statCollection => total += statCollection[type]);
    return total;
  }

  static _increaseByPercent(value, percentage) {
    return value * (1 + (percentage / 100));
  }

  static _filledStats(statCollection) {
    const filledStats = {};
    Object.keys(stats).filter(stat => statCollection[stat] == null).forEach(stat => filledStats[stat] = 0);
    Object.entries(statCollection).forEach(([stat, value]) => filledStats[stat] = value);
    return filledStats;
  }
}

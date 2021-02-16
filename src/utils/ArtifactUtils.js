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
    const scaledAtk = this._percentIncrease(baseStats.atk, atkPercent);
    finalStats.atk = Math.ceil(scaledAtk + artifactsStats.atk + miscStats.atk);

    // DEF
    const defPercent = this._sumStats("defPercent", baseStats, artifactsStats, miscStats);
    const scaledDef = this._percentIncrease(characterStats.def, defPercent);
    finalStats.def = Math.ceil(scaledDef + weaponStats.def + artifactsStats.def + miscStats.def);

    // HP
    const hpPercent = this._sumStats("hpPercent", baseStats, artifactsStats, miscStats);
    const scaledHp = this._percentIncrease(characterStats.hp, hpPercent);
    finalStats.hp = Math.ceil(scaledHp + weaponStats.hp + artifactsStats.hp + miscStats.hp);

    // Simple-Summed Stats
    finalStats.critRate = this._sumStats("critRate", baseStats, artifactsStats, miscStats);
    finalStats.critDamage = this._sumStats("critDamage", baseStats, artifactsStats, miscStats);
    finalStats.elementalMastery = this._sumStats("elementalMastery", baseStats, artifactsStats, miscStats);
    finalStats.energyRecharge = this._sumStats("energyRecharge", baseStats, artifactsStats, miscStats);
    finalStats.healingBonus = this._sumStats("healingBonus", baseStats, artifactsStats, miscStats);
    finalStats.elementalBonus = this._sumStats("elementalBonus", baseStats, artifactsStats, miscStats);

    return finalStats;
  }

  static _sumStats(type, ...stats) {
    let total = 0;
    stats.filter(statCollection => statCollection[type]).forEach(statCollection => total += statCollection[type]);
    return total;
  }

  static _percentIncrease(value, percentage) {
    return value * (1 + (percentage / 100));
  }

  static _filledStats(statCollection) {
    const filledStats = {};
    Object.keys(stats).forEach(stat => {
      if (statCollection[stat] == null) filledStats[stat] = 0;
      else filledStats[stat] = statCollection[stat];
    });
    return filledStats;
  }
}

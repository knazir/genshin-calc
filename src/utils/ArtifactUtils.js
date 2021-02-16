import stats from "../data/stats";

export default class ArtifactUtils {
  static addStats(...artifacts) {
    const totalStats = {};
    Object.keys(stats).forEach(stat => totalStats[stat] = 0);
    artifacts.forEach(artifact => {
      Object.entries(artifact).forEach(([statType, statValue]) => {
        totalStats[statType] = totalStats[statType] == null ? statValue : totalStats[statType] + statValue;
      });
    });
    return totalStats;
  }
}

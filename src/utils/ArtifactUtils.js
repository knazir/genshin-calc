export default class ArtifactUtils {
  static addStats(...artifacts) {
    const totalStats = {};
    artifacts.forEach(artifact => {
      Object.entries(artifact).forEach(([statType, statValue]) => {
        totalStats[statType] = totalStats[statType] == null ? statValue : totalStats[statType] + statValue;
      });
    });
    return totalStats;
  }
}

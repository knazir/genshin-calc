import weaponTypes from "../weaponTypes";

const context = require.context("./", true, /.json$/);
const processedWeapons = {};
for (const key of context.keys()) {
    const filename = key.replace("./", "");
    const resource = require(`./${filename}`);
    const namespace = filename.replace(".json", "");
    processedWeapons[namespace] = JSON.parse(JSON.stringify(resource));
}

const validWeapons = new Set(Object.keys(weaponTypes));

for (const wepData of Object.values(processedWeapons)) {
    if (!validWeapons.has(wepData.type)) {
        console.error(`Invalid weapon type found for weapon ${wepData.name}, (${wepData.type})`);
    }

    for (const [level, levelBaseStats] of Object.entries(wepData.baseStats)) {
        wepData.baseStats[Number(level)] = levelBaseStats;
        delete wepData[level];
    }
}

export default processedWeapons;


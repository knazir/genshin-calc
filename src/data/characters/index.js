import elements from "../elements";
import weapons from "../weapons";

const context = require.context("./", true, /.json$/);
const processedCharacters = {};
for (const key of context.keys()) {
    const filename = key.replace("./", "");
    const resource = require(`./${filename}`);
    const namespace = filename.replace(".json", "");
    processedCharacters[namespace] = JSON.parse(JSON.stringify(resource));
}

const validElements = new Set(Object.keys(elements));
const validWeapons = new Set(Object.keys(weapons));

for (const charData of Object.values(processedCharacters)) {
    if (!validWeapons.has(charData.weapon)) {
        console.error(`Invalid weapon data found for character ${charData.name}, (${charData.weapon})`);
    }

    if (!validElements.has(charData.element)) {
        console.error(`Invalid element data found for character ${charData.name}, (${charData.element})`);
    }

    for (const [level, levelBaseStats] of Object.entries(charData.baseStats)) {
        charData.baseStats[Number(level)] = levelBaseStats;
        delete charData[level];
    }
}

export default processedCharacters;


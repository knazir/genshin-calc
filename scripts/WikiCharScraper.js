const obj = {};

obj.name = document.querySelector("h1.page-header__title").textContent.trim();
obj.id = obj.name.split(" ")[0].toLowerCase();;
obj.weapon = document.querySelector("td[data-source='weapon']").textContent.trim().toLowerCase();
obj.element = document.querySelector("td[data-source='element']").textContent.trim().toLowerCase();

const specialStatStr = document.querySelector(".ascension-stats tr:first-of-type th:last-of-type b").textContent.trim();
let specialStatId = "";

if (specialStatStr === "CRIT Rate") {
    specialStatId = "critRate";
} else if (specialStatStr === "CRIT DMG") {
    specialStatId = "critDamage";
} else if (specialStatStr === "Energy Recharge") {
    specialStatId = "energyRecharge";
} else if (specialStatStr === "Healing Bonus") {
    specialStatId = "healingBonus";
} else if (specialStatStr === "HP") {
    specialStatId = "hpPercent";
} else if (specialStatStr === "ATK") {
    specialStatId = "atkPercent";
} else if (specialStatStr.indexOf(" DMG Bonus") !== -1) {
    specialStatId = "elementalBonus";
}

obj.baseStats = {};
const rows = Array.from(document.querySelectorAll(".ascension-stats tr.alternating1"));
for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const levelObj = {};

    const cells = Array.from(row.querySelectorAll("td"));
    
    const startCell = cells.length === 4 ? 0 : 1;
    const levelParts = cells[startCell].textContent.trim().split("/");
    const level = Number(levelParts[0]);
    
    levelObj.hp = Number(cells[startCell + 1].textContent.trim());
    levelObj.atk = Number(cells[startCell + 2].textContent.trim());
    levelObj.def = Number(cells[startCell + 3].textContent.trim());

    let specialStatStr = "—";
    if (cells.length === 4) {
        const prevRow = rows[i - 1];
        const prevCells = Array.from(prevRow.querySelectorAll("td"));
        specialStatStr = prevCells[5].textContent.trim();
    } else {
        specialStatStr = cells[4].textContent.trim();
    }
    if (specialStatStr !== "—" && specialStatId) {
        const specialStatValue = Number(specialStatStr.substr(0, specialStatStr.length - 1));
        levelObj[specialStatId] = specialStatValue;
    }

    obj.baseStats[level] = levelObj;
}

const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj, null, 2))}`;
const downloadLink = document.createElement("a");
document.querySelector("body").appendChild(downloadLink);
downloadLink.setAttribute("href", dataStr);
downloadLink.setAttribute("download", `${obj.id}.json`);
downloadLink.click();

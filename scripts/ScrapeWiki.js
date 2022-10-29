const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const scrapeCharacters = async (browser, page) => {
    console.log("Scraping Characters...");
    
    await page.goto("https://genshin-impact.fandom.com/wiki/Category:Playable_Characters", { waitUntil: 'domcontentloaded' })
    const characterLinks = await page.evaluate(_ => {
        return Array.from(document.querySelectorAll(".category-page__members-for-char .category-page__member-link"))
                    .map(el => el.href)
                    .filter(href => href.indexOf("Category:") === -1 && href.indexOf("(") === -1);
    });

    for (const link of characterLinks) {
        const linkParts = link.split("/");
        process.stdout.write(`Scraping ${linkParts[linkParts.length - 1]}... `);

        await page.goto(link, { waitUntil: 'domcontentloaded' });

        const charJson = await page.evaluate(_ => {
            const obj = {};

            obj.name = document.querySelector("h1.page-header__title").textContent.trim();
            obj.id = obj.name.split(" ")
                            .map((token, idx) => {
                                if (idx === 0) return token.toLowerCase();
                                return `${token[0].toUpperCase()}${token.slice(1)}`;
                            })
                            .join("")
                            .replace(/[^a-z0-9]/gi, "");
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
                if (cells.length !== 4 && cells.length !== 5) continue;
                
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

            return obj;
        });

        fs.writeFileSync(path.join(__dirname, "output", "characters", `${charJson.id}.json`), JSON.stringify(charJson, null, 2));
        console.log("Done.");
    }

    console.log("Finished Scraping Characters\n");
};

const scrapeWeapons = async (browser, page) => {
    console.log("Scraping Weapons");

    await page.goto("https://genshin-impact.fandom.com/wiki/Weapon/List", { waitUntil: 'domcontentloaded' })
    const weaponLinks = await page.evaluate(_ => {
        return Array.from(document.querySelectorAll(".article-table td:nth-child(2) > a"))
                    .map(link => link.href)
                    .filter(href => href.indexOf("(") === -1);
    });

    for (const link of weaponLinks) {
        const linkParts = link.split("/");
        process.stdout.write(`Scraping ${linkParts[linkParts.length - 1]}... `);

        await page.goto(link, { waitUntil: 'domcontentloaded' });

        const wepJson = await page.evaluate(_ => {
            const obj = {};

            obj.name = document.querySelector("h1.page-header__title").textContent.trim();
            obj.id = obj.name.split(" ")
                            .map((token, idx) => {
                                if (idx === 0) return token.toLowerCase();
                                return `${token[0].toUpperCase()}${token.slice(1)}`;
                            })
                            .join("")
                            .replace(/[^a-z0-9]/gi, "");
            obj.type = document.querySelector(".pi-data-value.pi-font").textContent.trim().toLowerCase();
            
            const specialStatNode = document.querySelector(".wikitable tr:first-of-type th:last-of-type b");
            if (!specialStatNode) return null;

            const specialStatStr = specialStatNode.textContent.trim();
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
            } else if (specialStatStr === "Elemental Mastery") {
                specialStatId = "elementalMastery";
            } else if (specialStatStr.indexOf(" DMG Bonus") !== -1) {
                specialStatId = "elementalBonus";
            }
            
            obj.baseStats = {};
            const rows = Array.from(document.querySelectorAll(".wikitable tr:not(#mw-collapsible mw-made-collapsible)")).slice(1);
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const levelObj = {};
            
                const cells = Array.from(row.querySelectorAll("td"));
                console.log(cells);
                if (cells.length !== 3 && cells.length !== 4) continue;

                const startCell = cells.length === 3 ? 0 : 1;
                const levelParts = cells[startCell].textContent.trim().split("/");
                const level = Number(levelParts[0]);
                
                levelObj.atk = Number(cells[startCell + 1].textContent.trim());
            
                let specialStatStr = "—";
                if (cells.length === 3) {
                    const prevRow = rows[i - 1];
                    const prevCells = Array.from(prevRow.querySelectorAll("td"));
                    specialStatStr = prevCells[3].textContent.trim();
                } else {
                    specialStatStr = cells[2].textContent.trim();
                }
                if (specialStatStr !== "—" && specialStatId) {
                    const specialStatValue = Number(specialStatStr.substr(0, specialStatStr.length - 1));
                    levelObj[specialStatId] = specialStatValue;
                }
            
                obj.baseStats[level] = levelObj;
            }

            return obj;
        });

        if (wepJson) {
            fs.writeFileSync(path.join(__dirname, "output", "weapons", `${wepJson.id}.json`), JSON.stringify(wepJson, null, 2));
            console.log("Done.");
        } else {
            console.log("Skipped.");
        }
    }

    console.log("Finished Scraping Weapons\n");
};

const scrape = async () => {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    await scrapeCharacters(browser, page);
    await scrapeWeapons(browser, page);

    browser.close()
}
scrape();

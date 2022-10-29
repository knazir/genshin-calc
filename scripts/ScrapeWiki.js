const util = require("util");
const http = require("http");
const HTMLParser = require("node-html-parser");

const charPageOptions = {
    host: "www.genshin-impact.fandom.com",
    port: 80,
    path: "/wiki/Category:Playable_Characters"
};

const charPageContent = "";
const charPageReq = http.request(charPageOptions, (res) => {
    res.setEncoding("utf8");
    res.on("data", (chunk) => charPageContent += chunk);
    res.on("end", () => {
        console.log(charPageContent);
        charPageReq.end();
    });
});

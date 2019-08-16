/* Dependencies */
const fs = require("fs");
const express = require("express");
//const favicon = require("express-favicon");
const app = express();
/* Data */
const wordData = require("./js/data");

/*-- MiddleWare----*/

app.use("/static", express.static(__dirname + "/static"));
//app.use(favicon(__dirname + "/static/logo.png"));
app.use(express.json());

/*-- Get  --*/

app.get("/", (req, res) => {
    console.log(`Server requested with with url ${req.url}`);
    res.sendFile(`${__dirname}/static/index.html`);
});

app.get("/index.html", (req, res) => {
    console.log(`Server requested with with url ${req.url}`);
    res.sendFile(`${__dirname}/static/index.html`);
});

app.get("/style.css", (req, res) => {
    console.log(`Server requested with with url ${req.url}`);
    res.sendFile(`${__dirname}/static/style.css`);
});

app.get("/tintin.jpg", (req, res) => {
    console.log(`Server requested with with url ${req.url}`);
    res.sendFile(`${__dirname}/static/tintin.jpg`);
});

app.get("/logo.png", (req, res) => {
    console.log(`Server requested with with url ${req.url}`);
    res.sendFile(`${__dirname}/static/logo.png`);
});

app.get("/app.js", (req, res) => {
    console.log(`Server requested with with url ${req.url}`);
    res.sendFile(`${__dirname}/static/app.js`);
});

app.get("/word/", (req, res) => {
    res.send(wordData);
});

app.get("/word/:id", (req, res) => {
    const filter = wordData.filter(data =>
        data.searchWord.includes(req.params.id)
    );
    if (filter.length === 0)
        return res.status(404).send("Could not find anything");

    res.send(filter);
});

app.get("/lang/", (req, res) => {
    res.send(wordData);
});

app.get("/lang/:id", (req, res) => {
    const filter = wordData.filter(data =>
        data.language.includes(String(req.params.id))
    );
    if (filter.length === 0)
        return res.status(404).send("Could not find antything on that Letter.");
    res.send(filter);
});

app.get("*", (req, res) => {
    console.log(`Server requested with with url ${req.url}`);
    res.sendFile(`${__dirname}/static/404.html`);
});

/*-- Post --*/

app.post("/word/", (req, res) => {
    const newWord = {
        searchWord: req.body.searchWord,
        language: req.body.language,
        translation: req.body.translation,
        translatedLanguage: req.body.translatedLanguage
    };

    wordData.push(newWord);
    res.send(newWord);
});

/*-- Delete --*/

app.delete("/word/:id", (req, res) => {
    const filter = wordData.filter(data =>
        data.searchWord.includes(req.params.id)
    );
    if (filter.length === 0)
        return res.status(404).send("Word with Given letter Cannot be found.");
    const index = wordData.indexOf(filter);
    wordData.splice(index, 1);
    res.send(filter);
});

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`App listening to port ${port}`));

console.log("peace out");

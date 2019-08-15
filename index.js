/* Dependencies */

const fs = require("fs");
const express = require("express");
const favicon = require("express-favicon");

const app = express();

/* Data */

const wordData = require("./js/data");

app.use("/static", express.static(__dirname + "/static"));
app.use(favicon(__dirname + "/static/logo.png"));
app.use(express.json());

app.get("/", (req, res) => {
    fs.readFile(__dirname + "/index.html", "utf8", (err, text) => {
        if (err) return console.log(`index.html could not be found ${err} `);
        res.send(text);
    });
});

app.get("/word/", (req, res) => {
    res.send(wordData);
});

app.get("/word/:id", (req, res) => {
    const filter = wordData.filter(data =>
        data.searchWord.includes(req.params.id)
    );
    if (!filter) return res.status(404).send("Could not find anything");
    res.send(filter);
});

app.get("/lang/", (req, res) => {
    res.send(wordData);
});

app.get("/lang/:id", (req, res) => {
    const filter = wordData.filter(data =>
        data.language.includes(req.params.id)
    );
    res.send(filter);
});

app.get("*", (req, res) => {
    fs.readFile(__dirname + "/static/404.html", "utf8", (err, text) => {
        if (err) return console.log(`index.html could not be found ${err} `);
        res.send(text);
    });
});

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

app.delete("/word/:id", (req, res) => {
    const filter = wordData.filter(data =>
        data.searchWord.includes(req.params.id)
    );
    if (!filter)
        return res.status(404).send("Word with Given letter Cannot be found.");
    const index = wordData.indexOf(filter);
    wordData.splice(index, 1);
    res.send(filter);
});

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`App listening to port ${port}`));

console.log("peace out");

/* Dependencies */
const fs = require("fs");
const express = require("express");
const app = express();

/* Data */
const wordData = require("./js/data");

app.use(express.json());
app.use("/static", express.static(__dirname + "/static"));

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
    const filter = wordData.filter(data => data.searchWord === req.params.id);
    res.send(filter);
});

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`App listening to port ${port}`));

console.log("peace out");

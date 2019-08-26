console.log(`Welcome ${process.env.LOGNAME}`);
/* Dependencies */
const express = require("express");
const app = express();

/* Data */

const wordData = require("./data/data");

/* Magic Variables */
const staticPath = `${__dirname}/public`;

/*-- MiddleWare----*/

const allowCrossDomain = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
};
app.use(allowCrossDomain);

app.use(express.json());

app.use(express.static(staticPath));

/*--
 Get
 --*/

app.get("/word/", (req, res) => {
    const query = req.query.sw;
    if (query) {
        const filter = wordData.filter(data => data.searchWord.includes(query));
        return res.send(filter);
    }
    const data = wordData.map(e => e.searchWord);
    return res.send(data);
});

app.get("/lang/", (req, res) => {
    res.send(wordData);
});

app.get("/lang/:id", (req, res) => {
    const filter = wordData
        .filter(data => data.language.includes(req.params.id))
        .map(e => e.searchWord);
    if (filter.length === 0)
        return res.send("Could not find antything on that letter.");
    res.send(filter);
});

app.get("*", (req, res) => {
    console.log(`Server requested with with url ${req.url}`);
    res.status(404).sendFile(`${staticPath}/404.html`);
});

/*-- Post --*/

app.post("/word/", (req, res) => {
    if (!req.body.searchWord || req.body.searchWord.length < 2)
        return res.status(400).send("Not a valid word to post");

    const newWord = {
        searchWord: req.body.searchWord,
        language: req.body.language,
        translation: req.body.translation,
        translatedLanguage: req.body.translatedLanguage
    };

    wordData.push(newWord);
    res.status(200).send(newWord);
});

/*-- Delete --*/

app.delete("/word/", (req, res) => {
    const query = req.query.sw;
    if (query) {
        const filter = wordData.filter(data => data.searchWord.includes(query));

        const finalDelete = filter.forEach(f =>
            wordData.splice(
                wordData.findIndex(e => e.searchWord === f.searchWord),
                1
            )
        );
        res.status(200).send(finalDelete);
    }
});

/* --
Errror handling
  --*/

app.all("*", (req, res) => {
    //console.error(`404 error : ${err}`);
    res.status(404).sendFile(`${staticPath}/404.html`);
});

app.use((err, req, res, next) => {
    console.error(`some stuff 500 : ${err}`);
    res.status(500).sendFile(`${__dirname}/500.html`);
    next();
});

/*-- Listening  --*/

const port = process.env.port || 8000;

app.listen(port, () => console.log(`App listening to port ${port}`));

console.log("peace out");

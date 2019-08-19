console.log(`Welcome ${process.env.LOGNAME}`);
/* Dependencies */
const express = require("express");
const app = express();

/* Data */

const wordData = require("./js/data");

/* Magic Variables */
const staticPath = `${__dirname}/static`;

/*-- MiddleWare----*/

const logger = (req, res, next) => {
    console.log(`Server recieved URL with adress ${req.url}`);
    console.log(`Server recieved URL with TYPE ${req.method}`);
    next();
};

app.use(logger);

app.use(express.json());

app.use(express.static(staticPath));

/*--
 Get
 --*/
/*
app.get("/", (req, res) => {
    res.sendFile(`${staticPath}/index.html`);
});

app.get("/index.html", (req, res) => {
    res.sendFile(`${staticPath}/index.html`);
});

app.get("/500.html", (req, res) => {
    res.sendFile(`${staticPath}/500.html`);
});

app.get("/style.css", (req, res) => {
    res.sendFile(`${staticPath}/style.css`);
});

app.get("/tintin.jpg", (req, res) => {
    res.sendFile(`${staticPath}/tintin.jpg`);
});

app.get("/logo.png", (req, res) => {
    res.sendFile(`${staticPath}/logo.png`);
});

app.get("/app.js", (req, res) => {
    res.sendFile(`${staticPath}/app.js`);
});
*/

app.get("/word/", (req, res) => {
    const data = wordData.map(e => e.searchWord);
    res.send(data);
});

app.get("/word/:id", (req, res, next) => {
    const wordID = req.params.id;
    const filter = wordData.filter(data => data.searchWord.includes(wordID));
    if (!req.params.id || filter.length === 0)
        return res.status(404).send("Could not find anything");
    res.send(filter);
});

app.get("/lang/", (req, res) => {
    res.send(wordData);
});

app.get("/lang/:id", (req, res) => {
    const filter = wordData
        .filter(data => data.language.includes(req.params.id))
        .map(e => e.searchWord);
    if (filter.length === 0)
        return res.status(404).send("Could not find antything on that Letter.");
    res.send(filter);
});

app.get("*", (req, res) => {
    console.log(`Server requested with with url ${req.url}`);
    res.status(404).sendFile(`${staticPath}/404.html`);
});

/*-- Post --*/

app.post("/word/", (req, res) => {
    if (!req.body.searchWord || req.body.searchWord.length < 2)
        return res.status(400).send("You mothafackas");

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

app.delete("/word/:id", (req, res) => {
    const filter = wordData.filter(data =>
        data.searchWord.includes(req.params.id)
    );
    const finalFilter = wordData.filter(e => !filter.includes(e));

    if (filter.length === 0)
        return res.status(404).sendFile(`${staticPath}/404.html`);
    //const deleteStuff = wordData.filter(item => !item.includes(req.params.id));
    //console.log('Delete STUFF', deleteStuff);
    res.status(200).send(finalFilter);
});

/* --
Errror handling
  --*/

app.get("/error", (error, req, res, next) => {
    console.log("lol");
    throw new Error("lolol");
});

app.use((err, req, res, next) => {
    console.error(`404 error : ${err}`);
    res.status(404).send("404: file not found");
    //next();
});

app.use((err, req, res, next) => {
    console.error(`some stuff 500 : ${err}`);
    res.status(500).send("Turn of your computer, youre in bad luck");
    next();
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("Error Stuff");
});

/*-- Listening  --*/

const port = process.env.port || 1337;

app.listen(port, () => console.log(`App listening to port ${port}`));

console.log("peace out");

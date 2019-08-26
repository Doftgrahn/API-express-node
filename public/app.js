const port = 8000;
const url = `http://localhost:${port}/word/`;
const url2 = `http://localhost:${port}/lang/`;

//const url2 = "http://localhost:1337/lang/";

//const url = "http://backend-5bbf5.firebaseapp.com/word/";
//const url2 = "http://backend-5bbf5.firebaseapp.com/lang/";

window.addEventListener("load", () => {
    /* Output */
    const output = document.querySelector(".output");
    const langOutput = document.querySelector(".lang_output");

    /* Buttons */
    const sButton = document.querySelector(".sButton");
    const addButton = document.querySelector(".addButton");
    const deleteBtn = document.querySelector(".deleteBtn");
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Origin": "*"
    };

    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            const li = document.createElement("li");
            li.append(data.map(e => e));
            output.append(li);
        });

    fetch(url2)
        .then(resp => resp.json())
        .then(data => {
            const li = document.createElement("li");
            li.append(data.map(e => e.language));
            langOutput.append(li);
        });

    /* Search */

    sButton.addEventListener("click", () => {
        let searchInput = document.querySelector(".inputText").value;

        fetch(`${url}?sw=${s             v  earchInput}`)
            .then(resp => resp.json())
            .then(data => {
                let myData = data.map(e => e);
                output.innerHTML = myData;
            });
    });

    /* POST */

    addButton.addEventListener("click", () => {
        let searchInput = document.querySelector(".post").value;
        let languageInput = document.querySelector(".languageInput").value;
        let translationInput = document.querySelector(".translationInput")
            .value;
        let translatedLanguageInput = document.querySelector(
            ".translatedLanguageInput"
        ).value;

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                searchWord: searchInput,
                language: languageInput,
                translation: translationInput,
                translatedLanguage: translatedLanguageInput
            })
        })
            .then(response => response.json())
            .then(responseJSON => {
                output.innerHTML += "," + responseJSON.searchWord;
            })
            .catch(err => console.log(err));
        searchInput = "";
    });

    deleteBtn.addEventListener("click", () => {
        let deleteInput = document.querySelector(".delete").value;
        let stringify = JSON.stringify(deleteInput);

        if (deleteInput)
            fetch(`${url}?sw=${deleteInput}`, {
                method: "DELETE",
                headers: headers
            })
                .then(response => console.log("Removed"))
                .catch(err => console.log("Something went wrong", err));
        deleteInput = "";
    });
});

const url = "http://localhost:1337/word/";
const url2 = "http://localhost:1337/lang/";

//const url = "http://backend-5bbf5.firebaseapp.com/word/";

class App {
    constructor() {
        /* Inputs */
        const searchInput = document.querySelector(".inputText");
        const postInput = document.querySelector(".post");
        const deleteInput = document.querySelector(".delete");
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
                output.innerHTML = data.map(e => e);
            });

        fetch(url2)
            .then(resp => resp.json())
            .then(data => {
                langOutput.innerHTML = data.map(e => e.language);
            });

        /* Search */

        sButton.addEventListener("click", () => {
            fetch(`${url}${searchInput.value}`)
                .then(resp => resp.json())
                .then(data => (output.innerHTML = data.map(e => e.searchWord)));
            searchInput.value = "";
        });

        /* POST */

        addButton.addEventListener("click", () => {
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    searchWord: postInput.value,
                    language: "",
                    translation: "",
                    translatedLanguage: ""
                })
            })
                .then(response => response.json())
                .then(responseJSON => {
                    output.innerHTML += "," + responseJSON.searchWord;
                })
                .catch(err => console.log(err));
            postInput.value = "";
        });

        deleteBtn.addEventListener("click", () => {
            if (deleteInput.value)
                fetch(`${url}${deleteInput.value}`, {
                    method: "DELETE",
                    headers: headers
                })
                    .then(response => response.json())
                    .then(resJSON => {
                        output.innerHTML = resJSON.map(data => data.searchWord);
                    })
                    .catch(err => console.log("Something went wrong", err));
            deleteInput.value = "";
        });
    }
}

window.addEventListener("load", () => {
    new App();
});

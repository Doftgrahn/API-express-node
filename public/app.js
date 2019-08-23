const url = "http://localhost:1337/word/";
const url2 = "http://localhost:1337/lang/";

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
        fetch(`${url}${searchInput}`)
            .then(resp => resp.json())
            .then(data => (output.innerHTML = data.map(e => e.searchWord)));
        searchInput = "";
    });

    /* POST */

    addButton.addEventListener("click", () => {
        let postInput = document.querySelector(".post").value;

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                searchWord: postInput,
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
        postInput = "";
    });

    deleteBtn.addEventListener("click", () => {
        let deleteInput = document.querySelector(".delete").value;

        if (deleteInput)
            fetch(`${url}${deleteInput}`, {
                method: "DELETE",
                headers: headers
            })
                .then(response => response.json())
                .then(resJSON => {
                    output.innerHTML = resJSON.map(data => data.searchWord);
                })
                .catch(err => console.log("Something went wrong", err));
        deleteInput = "";
    });
});

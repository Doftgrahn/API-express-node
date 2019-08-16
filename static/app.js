const url = "http://localhost:1337/word/";

window.addEventListener("load", () => {
    const searchInput = document.querySelector(".inputText");
    const postInput = document.querySelector(".post");
    const output = document.querySelector(".output");
    const langOutput = document.querySelector(".lang_output");
    const sButton = document.querySelector(".sButton");
    const addButton = document.querySelector(".addButton");
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Origin": "*"
    };

    let searchValue;
    let postValue;

    /* Get Request */
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            output.innerHTML = data.map(e => e.searchWord);
            langOutput.innerHTML = data.map(e => e.language);
        });
    /*Key press*/

    searchInput.addEventListener("keypress", ({target}) => {
        searchValue = target.value;
        /*
        fetch(`${url}${target.value}`)
            .then(resp => resp.json())
            .then(data => (output.innerHTML = data.map(e => e.searchWord)));
            */
    });
    console.log(searchValue);

    postInput.addEventListener("keydown", ({target}) => {
        postValue = target.value;
    });

    /* -- Click   */

    sButton.addEventListener("click", () => {
        fetch(`${url}${searchInput.value}`)
            .then(resp => resp.json())
            .then(data => (output.innerHTML = data.map(e => e.searchWord)));
        searchInput.value = "";
    });

    /*POST*/

    addButton.addEventListener("click", () => {
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                language: postInput.value
            })
        })
            .then(response => response.json())
            .then(responseJSON => {
                langOutput.innerHTML += "," + responseJSON.language;
            })
            .catch(err => console.log(err));
        postInput.value = "";
    });
});

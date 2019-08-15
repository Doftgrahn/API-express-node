const url = "http://localhost:1337/word/";

window.addEventListener("load", () => {
    const searchInput = document.querySelector(".inputText");
    const output = document.querySelector(".output");
    const sButton = document.querySelector("button");

    /*POST*/

    sButton.addEventListener("click", () => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                language: searchInput.value
            })
        }).then(response => {
            console.log(response);
        });
    });

    /* Get Request */
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            output.innerHTML = data.map(e => e.language);
        });
});

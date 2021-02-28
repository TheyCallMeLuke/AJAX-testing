/**
 * I use a counter to count the number of times the ready state changes to 2.
 * This way I can ensure, that the "downloading" text in the browser is printed once per click event, in case the
 * ready state is changed to 2 multiple times.
 */
let downloadingCounter = false;

/**
 * A div element that is used to show the current status of fetching the data.
 */
const statusContainer = document.getElementById("status");

/**
 * The button that when clicked, fetches the data.
 */
const btn = document.getElementById("btn");

/**
 * To show the current status of fetching the data, I use the onreadstatechange event handler. Inside that handler I
 * check the state of the request and render the status to the HTML appropriately.
 */
btn.addEventListener("click", () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState === 1) {
            renderHTML("loading");
        } else if (http.readyState === 2) {
            renderHTML("loaded");
        } else if (http.readyState === 3) {
            if (downloadingCounter++ === 0) {
                renderHTML("downloading");
            }
        } else if (http.readyState === 4) {
            downloadingCounter = 0;
            renderHTML("finished downloading");
        }
    };

    http.open("GET", "data/input.txt", true);
    http.send();
});

function renderHTML(data) {
    let htmlString = "<p>" + data + "</p>";
    statusContainer.insertAdjacentHTML('beforeend', htmlString);
}
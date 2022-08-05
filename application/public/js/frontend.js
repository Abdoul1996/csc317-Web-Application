// this is for the flashMsg that tells u to log in, if you've logged in, or if you've logged out
function setFlashMessageFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) { // this stops the interval from being triggered again
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - 0.5; // decreases the view of it
            flashMessageElement.style.opacity = currentOpacity;
        }, 50); // change the speed of the fadeout // 0.5^^ [ the larger, the quicker it goes ]
    }, 4000);
}

// making the flash message more dynamic
function addFlashFromFrontEnd(message) {
    // delaring 
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    // connecting
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message'); // replacing the flashmessage.hbs file
    innerFlashDiv.setAttribute('class', 'alert alert-info');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);
}

// stole all info from views/partials/card.hbs
function createCard(postData) {
    return `<div id="post-${postData.id}" class="card">
    <img class="card-image" src="${postData.thumbnail}" alt="missing image">
    <div class="card-body">
        <p class="card-title">${postData.title}</p>
        <p class="card-text">${postData.description}</p>
        <a href="/post/${postData.id}" class="anchor-button">Post Details</a>
    </div>
</div>`;
}

// grabbing search content
function executeSearch() {
    let searchTerm = document.getElementById('search-text').value;
    console.log(searchTerm);
    if (!searchTerm) { // post-pressed n nothing, refresh + redirect back to same spot
        location.replace('/');
        return;
    }
    let mainContent = document.getElementById('main-content');
    let searchURL = `/posts/search?search=${searchTerm}`;
    fetch(searchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let newMainContentHTML = '';
            data_json.results.forEach((row) => {
                newMainContentHTML += createCard(row);
            });
            mainContent.innerHTML = newMainContentHTML; // this will replace what's currently on the page
            if (data_json.message) {
                addFlashFromFrontEnd(data_json.message);
            }
        })
        .catch((err) => console.log(err));
}

let flashElement = document.getElementById('flash-message');
if (flashElement) {
    setFlashMessageFadeOut(flashElement);
}

// for searching
let searchButton = document.getElementById('search-btn');
if (searchButton) {
    searchButton.onclick = executeSearch;
}


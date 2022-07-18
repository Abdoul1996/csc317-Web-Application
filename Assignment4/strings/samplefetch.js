/**
 * Uses JavaScript template strings  to make HTML elements to store
 * images
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 * @param {*} data about each indivual photo
 * @returns template string representing image div tag.
 */


function fadeOut(event){
    var item = event.currentTarget;
    item.style.opacity = "0.25";
    setTimeout(()=>{
        item.style.opacity = "0.75";
        item.remove();
        document.getElementById("item-count").innerHTML = `There are  ${document.getElementsByTagName("img").length}
        photo(s) being shown`;
    
    }, 2000);
    item.style.opacity = "0.5";
}





function buildCardsUsingStrings(data, containerDiv) {
    var card = document.createElement("div");
    var title = document.createElement("div");
    var img = document.createElement("img");

    img.setAttribute("src", data.url);
    title.innerHTML = data.title;

    card.addEventListener("click",(event) => fadeOut(event));
    card.appendChild(img);
    card.appendChild(title);
    containerDiv.appendChild(card);



    return `<div class="card">
                <img src="${data.thumbnailUrl}" alt="Fake photo for id: ${data.id}" />
            </div>`;


    
}



const mainDiv = document.getElementById("img-storage");

if(mainDiv){
     // where we will get photos from
     var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
     // calling fetch with the URL, this will initiate a GET request on the URL
     fetch(url)
     // converting response to json, this is a promise and MUST be returned
     .then((data) =>data.json())
     .then((photos) => {
        let innerHTML =  "";
        photos.forEach((photo) =>{
        buildCardsUsingStrings(photo, mainDiv);
     });

     document.getElementById("item-count").innerHTML = `There are  ${photos.length} photo (s) shown `;
});



}

/*
if(mainDiv){
      // where we will get photos from
      var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
    //calling fetch with the URL, this will initiate a GET request on the URL
    fetch(url)
    // initial hanlder for repsonse
    .then((response) =>{
         // converting response to json, this is a promise and MUST be returned
        return response.json();
    }).then( (photos) => {
        let imgStorageHTML = '';
        // getting div tag by ID
        let imgStorageElement = document.getElementById('img-storage');
        // loop over all photos in response
        photos.forEach(photo => {
            // call build function
            imgStorageHTML += buildCardsUsingStrings(photo);
        });
        imgStorageElement.innerHTML = imgStorageHTML;
        
    })
  
}

// calling fetch photos when page is loaded.
fetchPhotos();*/
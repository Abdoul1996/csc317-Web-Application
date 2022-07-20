

/* This is for the early assignment where you have to get the image cards and place on the page*/

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
    
}



const mainDiv = document.getElementById("container");
if(mainDiv){
     var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
     fetch(url)
     .then((data) =>data.json())
     .then((photos) => {
        let innerHTML =  "";
        photos.forEach((photo) =>{
        buildCardsUsingStrings(photo, mainDiv);
     });

     document.getElementById("item-count").innerHTML = `There are  ${photos.length} photo (s) shown `;
});
}
const accessKey = "aaHQO4v51mVuAuBN-jtJcdxGdrH_YtM9u06nmcWxyJU";

// form
const formEl = document.querySelector("form");

// input section
const inputEl = document.getElementById("search-input");

// images section
const searchResults = document.querySelector(".search-results");

// show more button
const showMore = document.getElementById("show-more-button");

let inputData = ""; //will store all keywords
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`


    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    //creating a div and all elements
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    //Now we can show ShowMore button
    if (page > 1) {
        showMore.style.display = "block";
    }

}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages(); //calling the function
})

showMore.addEventListener("click", (event) => {
    searchImages(); //calling the function again if it is clicked
})
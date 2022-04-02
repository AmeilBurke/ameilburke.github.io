const auth = "563492ad6f917000010000010882e084b758409981177974bb154b2f";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 2;
let fetchLink;
let currentSearch;
const header = document.querySelector('#header');

document.addEventListener("DOMContentLoaded", () => {
    curatedPhotos();
});

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {

    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

function updateInput(e) {

    searchValue = e.target.value;
}

async function fetchApi(url) {

    const dataFetch = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth
            }
        }
    );

    const data = await dataFetch.json();

    return data;
}

function generatePictures(data) {

    data.photos.forEach(photo => {
        
        const galleryImg = document.createElement("div");
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML =
        `
        <img data-aos="fade-up" src=${photo.src.large}></img>
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        </div>
        `;
        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos() {

    fetchLink = `https://api.pexels.com/v1/curated?per_page=9&page=1`
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=9&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data);

    const headerHeight = screen.height * 0.75 ;
    console.log(headerHeight);
    setTimeout( window.scroll( { top: headerHeight, left: 0, behavior: "smooth" } ), 2000 );
}

function clear() {

    gallery.innerHTML = '';
    searchInput.value = '';
}

async function loadMore() {

    page++;

    if(currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=9&page=${page}`;
    }
    else {
       fetchLink = `https://api.pexels.com/v1/curated?per_page=9&page=${page}`
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

// Animate On Scroll Library

AOS.init({
    offset: 250
});
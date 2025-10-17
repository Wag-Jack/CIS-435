import ImageFetcher from "./imageFetcher.js"
import { lazyLoadImages } from "./lazyLoader.js"

const galleryElement = document.querySelector("#gallery");
const loadingElement = document.querySelector("#loading");

const imageFetcher = new ImageFetcher("https://picsum.photos/v2/list");

// Fetch and display images
async function loadImages() {
    loadingElement.computedStyleMap.display = "block";

    const images = await imageFetcher.fetchImages(10);

    images.forEach(image => {
        const img = document.createElement("img");
        img.dataset.src = image.download_url; // Store URL in dataset for lazy loading
        img.alt = "Random Image";
        galleryElement.appendChild(img);
    });

    lazyLoadImages();
    loadingElement.style.display = "none";
}

// Load images when the page loads
document.addEventListener("DOMContentLoaded", loadImages);
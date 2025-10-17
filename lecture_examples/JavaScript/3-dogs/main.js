import DogFetcher from "./dogFetcher.js";

const dogFetcher = new DogFetcher();

const dogImageElement = document.querySelector("#dogImage");
const dogFactElement = document.querySelector("#dogFact");
const fetchBtn = document.querySelector("#fetchBtn");

// Function to update UI with new dog image and fact
async function updateDog() {
    dogImageElement.src = "loading.gif"; // loading placeholder

    const imageUrl = await dogFetcher.fetchDogImage();
    const fact = await dogFetcher.fetchDogFact();

    if (imageUrl) dogImageElement.src = imageUrl;
    dogFactElement.textContent = fact;
}

// Fetch dog info when page loads
document.addEventListener("DOMContentLoaded", updateDog);

// Fetch new dog info when button is clicked
fetchBtn.addEventListener("click", updateDog);
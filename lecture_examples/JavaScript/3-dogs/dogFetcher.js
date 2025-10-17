export default class DogFetcher {
    async fetchDogImage() {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random")
            if (!response.ok) throw new Error("failed to fetch image");

            const data = await response.json();
            return data.message; // URL of the dog image
        } catch (error) {
            console.error("Error fetching dog image:", error);
            return null;
        }
    }

    async fetchDogFact() {
        try {
            const response = await fetch("https://dog-api.kinduff.com/api/facts");
            if (!response.ok) throw new Error("failed to fetch fact");

            const data = await response.json();
            return data.facts[0]; // Return the first fact from the array
        } catch (error) {
            console.error("Error fetching dog fact:", error);
            return "Could not fetch a fact. Try again!";
        }
    }
}
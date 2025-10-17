export default class ImageFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchImages(count = 10) {
        try {
            const response = await fetch(`${this.apiUrl}?limit=${count}`);
            if (!response.ok) {
                throw new Error("Failed to fetch images");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching images:", error);
            return [];
        }
    }
}
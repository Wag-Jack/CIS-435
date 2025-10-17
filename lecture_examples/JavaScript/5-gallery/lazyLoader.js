export function lazyLoadImages() {
    const images = document.querySelectorAll(".gallery img");

    /*
        IntersectionObserver is natively available in modern browsers. It's
        for the purpose of lazy loading images (only load images when they
        appear in the viewport).
        - Can also be used with "infinite scroll" (load more content when user
        scrolls down)
        - You create the observer that watches a set of elements
        - When an element enters or exits a viewport, a callback function executes
        - The oberver can then trigger events, fetch data, or manipulate the DOM
        accordingly.
    */
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Load the actual image
                img.classList.add("loaded");
                observer.unobserve(img); // Stop observing once loaded
            }
        });
    });

    images.forEach(img => observer.observe(img));
}
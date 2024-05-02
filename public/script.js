let stars = document.querySelectorAll(".ratings span");
let products = document.querySelectorAll(".ratings");

// Load ratings from localStorage or initialize an empty object
let ratings = JSON.parse(localStorage.getItem("ratings")) || {};

// Loop through all stars and add click event listeners
stars.forEach(star => {
    star.addEventListener("click", function() {
        // Remove data-clicked attribute from all stars in the set
        this.parentElement.querySelectorAll('span').forEach(s => s.removeAttribute("data-clicked"));

        // Set data-clicked attribute for the clicked star
        this.setAttribute("data-clicked", "true");

        let rating = this.dataset.rating;
        let productId = this.parentElement.getAttribute('productid');

        // Update the rating for the product in the ratings object
        ratings[productId] = parseInt(rating);

        // Save ratings object to localStorage
        localStorage.setItem("ratings", JSON.stringify(ratings));

        console.log("Rating:", rating, "Product ID:", productId);
    });
});

// Set initial ratings if available in localStorage
for (let productId in ratings) 
{
    let rating = ratings[productId];
    for (let product of products) 
    {
        if (product.getAttribute('productid') === productId) {
            let reversedStars = Array.from(product.children).reverse();
            let index = rating - 1;
            reversedStars[index].setAttribute("data-clicked", "true");
        }
    }
}

const searchInput = document.querySelector("input-1");
const products = document.querySelectorAll("product-1-page");
searchInput.addEventListener("input" , function() {
    const searchValue = this.value.trim().toLowerCase();
    products.forEach(product => {
        const productName = product.querySelector("product-text").textContent.toLowerCase();
        if(productName.includes(searchValue)){
            product.style.display = "block";
        } else {
             product.style.display = "none";
        }
    });
});
const searchInput = document.querySelector(".input-1"); // اینپوت سرچ
const products = document.querySelectorAll(".product-1-page"); // همه محصولات

searchInput.addEventListener("input", function() {
  const searchValue = this.value.trim().toLowerCase(); // متن تایپ شده

  products.forEach(product => {
    const productName = product.querySelector(".product-text").textContent.toLowerCase(); // نام محصول

    if (productName.includes(searchValue)) {
      product.style.display = "block"; // نمایش
    } else {
      product.style.display = "none"; // مخفی
    }
  });
});

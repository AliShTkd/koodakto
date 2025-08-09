const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productImageInput = document.getElementById("productImage");

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const imageFile = productImageInput.files[0]; // فایل واقعی

    if (!name || !price || !imageFile) {
        alert("لطفا همه فیلدها را پر کنید");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", imageFile);

    try {
        const response = await fetch("http://localhost:8000/api/products", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("خطا در ارسال محصول");
        }

        const result = await response.json();
        alert("محصول با موفقیت ذخیره شد!");

        productNameInput.value = "";
        productPriceInput.value = "";
        productImageInput.value = "";
        document.getElementById("imagePreview").classList.add("d-none");
    } catch (error) {
        console.error("خطا:", error);
        alert("ارسال محصول با خطا مواجه شد.");
    }
});


// پیش‌نمایش عکس
productImageInput.addEventListener("change", () => {
    const file = productImageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById("imagePreview");
            img.src = e.target.result;
            img.classList.remove("d-none");
        };
        reader.readAsDataURL(file);
    }
});
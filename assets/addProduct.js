document.addEventListener("DOMContentLoaded", () => {
    const productNameInput = document.getElementById("productName");
    const productPriceInput = document.getElementById("productPrice");
    const productImageInput = document.getElementById("productImage");
    const userIdInput = document.getElementById("userId");
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = productNameInput.value.trim();
        const price = productPriceInput.value.trim();
        const imageFile = productImageInput.files[0];
        const userId = userIdInput ? userIdInput.value : localStorage.getItem('user_id');

        if (!name || !price || !imageFile) {
            alert("لطفا نام، قیمت و عکس محصول را پر کنید");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", imageFile);
        formData.append("user_id", userId);

        console.log("فایل ارسال‌شده:", imageFile); // دیباگ فایل

        try {
            const response = await fetch("http://localhost:8000/api/products", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
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
        const imgPreview = document.getElementById("imagePreview");
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgPreview.src = e.target.result;
                imgPreview.classList.remove("d-none");
            };
            reader.readAsDataURL(file);
        } else {
            imgPreview.classList.add("d-none");
        }
    });
});
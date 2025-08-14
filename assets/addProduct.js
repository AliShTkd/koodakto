document.addEventListener("DOMContentLoaded", () => {
    // گرفتن تمام المان‌های ورودی فرم بر اساس HTML شما
    const productNameInput = document.getElementById("productName");
    const productPriceInput = document.getElementById("productPrice");
    const productImageInput = document.getElementById("productImage");
    const userIdInput = document.getElementById("userId");
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // گرفتن مقادیر از فرم
        const name = productNameInput.value.trim();
        const price = productPriceInput.value.trim();
        const imageFile = productImageInput.files[0];
        // مقدار userId را از فیلد مخفی می‌خوانیم
        const userId = userIdInput.value;

        // اعتبارسنجی اولیه در سمت کاربر
        if (!name || !price) {
            alert("لطفا نام و قیمت محصول را پر کنید.");
            return;
        }
        
        // در HTML شما فیلد عکس required است، اما برای اطمینان اینجا هم چک می‌کنیم
        if (!imageFile) {
            alert("لطفا یک عکس برای محصول انتخاب کنید.");
            return;
        }

        // ساخت FormData برای ارسال به سرور
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", imageFile);
        formData.append("user_id", userId);

        try {
            const response = await fetch("http://localhost:8000/api/products", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: formData
            });

            const result = await response.json();

            // اگر پاسخ موفقیت‌آمیز نبود (مثلا خطای اعتبارسنجی 422)
            if (!response.ok) {
                // پرتاب خطا به همراه پیام‌های سرور برای نمایش
                throw result;
            }

            // اگر همه چیز موفق بود
            alert("محصول با موفقیت ذخیره شد!");
            form.reset(); // تمام فیلدهای فرم را پاک می‌کند
            // پیش‌نمایش عکس را هم مخفی می‌کنیم
            const imgPreview = document.getElementById("imagePreview");
            imgPreview.classList.add("d-none");
            imgPreview.src = "";

        } catch (error) {
            console.error("خطا:", error);
            
            // نمایش خطاهای اعتبارسنجی که از لاراول می‌آید
            if (error.errors) {
                let errorMessages = 'لطفا خطاهای زیر را برطرف کنید:\n\n';
                for (const key in error.errors) {
                    // پیام هر خطا را به رشته اضافه می‌کنیم
                    errorMessages += `- ${error.errors[key].join(', ')}\n`;
                }
                alert(errorMessages);
            } else {
                // خطاهای دیگر (مثل خطای شبکه یا خطای 500 سرور)
                alert("ارسال محصول با یک خطای غیرمنتظره مواجه شد.");
            }
        }
    });

    // منطق پیش‌نمایش عکس (این بخش کاملاً درست است و نیازی به تغییر ندارد)
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

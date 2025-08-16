// ادرس های من
const address = document.querySelector(".address")
// سفارش هاس من
const mybasket = document.querySelector(".basket");
const panelLeft = document.querySelector(".panel-left")

// نمایش نام کاربری ایمیل شماره تلفن

const nameBox = document.querySelector(".name")
const numberBox = document.querySelector(".number")
const emailBox = document.querySelector(".email")

async function loadUserPorfile(){
    try{
        const response = await fetch("http://localhost:8000/api/user",{
            method:"GET",
            headers : {
                "Authorization":"Bearer" + localStorage.getItem("token"),
                "Content-type":"application/json"
            }
        });

        if(!response.ok){
            throw new Error("خطا در دریافت اطلاعات کاربر" + response.status);
        }
        const data = await response.json();

        nameBox.textContent = `${data.fname} ${data.lname}`;
        numberBox.textContent = data.phone || "شماره ثبت نشده";
        emailBox.textContent = data.email || "ایمیل ثبت نشده";
    }catch(error){
        console.error("خطا",error);
    }
}

// نمایش محصولات




document.addEventListener("DOMContentLoaded", () => {
    // انتخاب المنت‌های اصلی
    const panelLeft = document.querySelector(".panel-left");
    const myOrdersBtn = document.querySelector(".mybask"); // انتخاب دکمه "سفارش‌های من"

    // اگر دکمه وجود داشت، رویداد کلیک را به آن اضافه کن
    if (myOrdersBtn) {
        myOrdersBtn.addEventListener('click', displayMyOrders);
    }

    // تابع اصلی برای دریافت و نمایش سفارش‌ها
    async function displayMyOrders() {
        // نمایش یک پیام لودینگ
        panelLeft.innerHTML = `
            <div class="text-center p-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">در حال بارگذاری سفارش‌ها...</p>
            </div>`;

        try {
            const response = await fetch("http://localhost:8000/api/orders", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json"
                }
            });

            // اگر پاسخ موفقیت‌آمیز نبود، متن خطا را بخوان
            if (!response.ok) {
                const errorText = await response.text(); // تلاش برای خواندن متن دقیق خطا از سرور
                throw new Error(`خطا در سرور (${response.status}): ${errorText}`);
            }

            const data = await response.json();
            
            if (data.data && data.data.length > 0) {
                let html = `<h2 class="mb-4">سفارش‌های من</h2>`;
                
                // حلقه روی هر سفارش برای ساختن یک فاکتور کامل
                data.data.forEach(order => {
                    const orderDate = new Date(order.created_at).toLocaleDateString('fa-IR');
                    const totalAmount = Number(order.total_amount).toLocaleString('fa-IR');

                    // ساخت جدول آیتم‌ها برای هر سفارش
                    let itemsHtml = '';
                    order.items.forEach(item => {
                        const itemTotal = item.quantity * item.price;
                        itemsHtml += `
                            <tr>
                                <td>${item.product.name}</td>
                                <td>${item.quantity}</td>
                                <td>${Number(item.price).toLocaleString('fa-IR')} تومان</td>
                                <td class="fw-bold">${itemTotal.toLocaleString('fa-IR')} تومان</td>
                            </tr>
                        `;
                    });

                    // ساخت HTML کامل فاکتور برای هر سفارش
                    html += `
                        <div class="card mb-4 shadow-sm">
                            <div class="card-header bg-light">
                                <h5 class="mb-0">فاکتور سفارش شماره: ${order.id}</h5>
                                <small class="text-muted">تاریخ ثبت: ${orderDate}</small>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">نام محصول</th>
                                                <th scope="col">تعداد</th>
                                                <th scope="col">قیمت واحد</th>
                                                <th scope="col">قیمت کل</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${itemsHtml}
                                        </tbody>
                                    </table>
                                </div>
                                <hr>
                                <div class="text-end">
                                    <h5 class="d-flex justify-content-end align-items-center">
                                        <span>مبلغ نهایی:</span>
                                        <strong class="mx-2 text-primary">${totalAmount} تومان</strong>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    `;
                });
                panelLeft.innerHTML = html;
            } else {
                panelLeft.innerHTML = `
                    <h2>سفارش‌های من</h2>
                    <p class="text-center text-muted mt-4">شما تاکنون هیچ سفارشی ثبت نکرده‌اید.</p>
                `;
            }

        } catch (error) {
            console.error(error);
            // نمایش متن دقیق خطا در صفحه
            panelLeft.innerHTML = `
                <h2>خطا در بارگذاری</h2>
                <p class='text-danger'>متاسفانه مشکلی در دریافت اطلاعات پیش آمده است.</p>
                <pre style="background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 0.25rem; white-space: pre-wrap; word-wrap: break-word;">${error.message}</pre>
            `;
        }
    }
});






  async function displayMyComments() {
        // نمایش یک پیام لودینگ
        panelLeft.innerHTML = `
            <div class="text-center p-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">در حال بارگذاری نظرات...</p>
            </div>`;

        try {
            const response = await fetch("http://localhost:8000/api/doctors/comments", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`خطا در سرور (${response.status}): ${errorText}`);
            }

            const data = await response.json();
            
            if (data.result && data.result.data && data.result.data.length > 0) {
                let html = `<h2 class="mb-4">پیام‌ها و نظرات من</h2>`;
                
                data.result.data.forEach(comment => {
                    const commentDate = new Date(comment.created_at).toLocaleDateString('fa-IR');

                    html += `
                        <div class="card mb-3 shadow-sm border-0">
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p class="mb-2">"${comment.comment}"</p>
                                    <footer class="blockquote-footer">
                                        شما در تاریخ <cite title="تاریخ ثبت">${commentDate}</cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    `;
                });
                panelLeft.innerHTML = html;
            } else {
                panelLeft.innerHTML = `
                    <h2>پیام‌ها و نظرات من</h2>
                    <p class="text-center text-muted mt-4">شما تاکنون هیچ نظری ثبت نکرده‌اید.</p>
                `;
            }

        } catch (error) {
            console.error(error);
            panelLeft.innerHTML = `
                <h2>خطا در بارگذاری</h2>
                <p class='text-danger'>متاسفانه مشکلی در دریافت نظرات شما پیش آمده است.</p>
                <pre style="background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 0.25rem; white-space: pre-wrap; word-wrap: break-word;">${error.message}</pre>
            `;
        }
    }

// ادرس های من

async function openAddress() {
    const panelLeft = document.querySelector(".panel-left");
    panelLeft.innerHTML = ""; // خالی کردن محتوای قبلی

    // ایجاد textarea و دکمه
    const textarea = document.createElement("textarea");
    textarea.placeholder = "آدرس خود را وارد کنید...";
    textarea.classList.add("form-control", "mb-3");

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "ثبت آدرس";
    submitBtn.classList.add("btn", "btn-primary", "mb-3");

    const addressList = document.createElement("div"); // لیست آدرس‌ها
    addressList.classList.add("address-list");

    panelLeft.appendChild(textarea);
    panelLeft.appendChild(submitBtn);
    panelLeft.appendChild(addressList);

    // رویداد کلیک روی دکمه
    submitBtn.addEventListener("click", async () => {
        const addressValue = textarea.value.trim();
        if (!addressValue) {
            alert("لطفاً آدرس را وارد کنید");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/address", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ address: addressValue })
            });

            if (!response.ok) {
                throw new Error("خطا در ارسال آدرس");
            }

            const result = await response.json();
            console.log("آدرس ثبت شد:", result);

            // افزودن آدرس جدید به لیست نمایش
            const newAddress = document.createElement("p");
            newAddress.textContent = addressValue;
            addressList.appendChild(newAddress);

            textarea.value = ""; // خالی کردن بعد از ثبت

        } catch (error) {
            console.error("خطا:", error);
            alert("ثبت آدرس با خطا مواجه شد.");
        }
    });
}



// async function openAddress() {
//     const panelLeft = document.querySelector(".panel-left");
//     panelLeft.innerHTML = ""; // خالی کردن محتوای قبلی

//     // --- ایجاد فرم برای ثبت آدرس جدید ---
//     const formContainer = document.createElement("div");
//     formContainer.classList.add("address-form-container");

//     const textarea = document.createElement("textarea");
//     textarea.placeholder = "آدرس جدید خود را وارد کنید...";
//     textarea.classList.add("form-control", "mb-3");

//     const submitBtn = document.createElement("button");
//     submitBtn.textContent = "ثبت آدرس";
//     submitBtn.classList.add("btn", "btn-primary");

//     formContainer.appendChild(textarea);
//     formContainer.appendChild(submitBtn);

//     // --- ایجاد بخشی برای نمایش لیست آدرس‌ها ---
//     const addressListTitle = document.createElement("h5");
//     addressListTitle.textContent = "لیست آدرس‌های شما";
//     addressListTitle.classList.add("mb-3");
    
//     const addressList = document.createElement("div");
//     addressList.classList.add("address-list");

//     // افزودن همه عناصر به پنل سمت چپ
//     panelLeft.appendChild(formContainer);
//     panelLeft.appendChild(addressListTitle);
//     panelLeft.appendChild(addressList);

//     // --- تابع برای دریافت و نمایش آدرس‌های موجود (نسخه اصلاح شده) ---
//     const displayAddresses = async () => {
//         addressList.innerHTML = "";
//         try {
//             const response = await fetch("http://localhost:8000/api/address", {
//                 method: "GET",
//                 headers: {
//                     "Authorization": "Bearer " + localStorage.getItem("token"),
//                     "Accept": "application/json"
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error("خطا در دریافت لیست آدرس‌ها از سرور");
//             }

//             const result = await response.json();
//             // بر اساس خروجی کنسول شما، داده‌ها داخل کلید result هستند
//             const addresses = result.result; 

//             if (addresses && addresses.length > 0) {
//                 addresses.forEach(addr => {
//                     const addressItem = document.createElement("div");
//                     addressItem.classList.add("address-item");
//                     addressItem.textContent = addr.address; 
//                     addressList.appendChild(addressItem);
//                 });
//             } else {
//                 addressList.textContent = "هنوز آدرسی ثبت نکرده‌اید.";
//             }

//         } catch (error) {
//             console.error("خطا در نمایش آدرس‌ها:", error);
//             addressList.textContent = "دریافت لیست آدرس‌ها با خطا مواجه شد.";
//         }
//     };

//     // --- رویداد کلیک روی دکمه ثبت آدرس جدید ---
//     submitBtn.addEventListener("click", async () => {
//         const addressValue = textarea.value.trim();
//         if (!addressValue) {
//             alert("لطفاً آدرس را وارد کنید");
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:8000/api/address", {
//                 method: "POST",
//                 headers: {
//                     "Authorization": "Bearer " + localStorage.getItem("token"),
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ address: addressValue })
//             });

//             if (!response.ok) {
//                 throw new Error("خطا در ارسال آدرس");
//             }
            
//             textarea.value = ""; // خالی کردن فیلد متن بعد از ثبت موفق
//             await displayAddresses(); // به‌روزرسانی لیست آدرس‌ها

//         } catch (error) {
//             console.error("خطا:", error);
//             alert("ثبت آدرس با خطا مواجه شد.");
//         }
//     });

//     // --- در اولین اجرای تابع، لیست آدرس‌ها را نمایش بده ---
//     await displayAddresses();
// }


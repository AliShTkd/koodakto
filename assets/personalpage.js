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

document.addEventListener("DOMContentLoaded",loadUserPorfile);


async function openbasket() {
    try{
        const response = await fetch ("",{
            method : "GET",
            headers:{
                "Authorization" : "bearer" + localStorage.getItem("token"),
                "Accept":"application/json"
            }
        });
        if(!response.ok){
            throw new Error ("خطا در دریافت اطلاعات",response.status);
        }
        const data = await response.json();
        let html = `<h2>سفارش  های من</h2><ul>`;
        data.forEach(order => {
            html +=`
             <li>
                    <strong>${order.product.name}</strong> 
                    | تعداد: ${order.quantity} 
                    | قیمت: ${order.product.price} تومان
            </li>
            `;
        });
        html +=`</ul>`

        panelLeft.innerHTML= html;


    }

    catch(error){
        console.error(error);
        panelLeft.innerHTML = "<p>خطا در دریافت سفارش‌ها</p>";
    }
}



// کامنت ها و نظرات 


async function opencomment() {
    try{
        const response = await fetch ("",{
            method:"GET",
            headers:{
                "Authorization" : "bearer" + localStorage.getItem("token"),
                "Accept":"application/json"
            }
        });
        if(!response.ok){
            throw new error ("خطا در دریافت اطلاعات", response.status);
        }
        const data = await response.json();
        let html = `<h2>نظرات و کامنت های من</h2><ul>`;
        data.forEach(Comment => {
            html += 
            `
                <div class="comment-card">
                    <img src="${Comment.product_image}" alt="${Comment.product_name}">
                    <div class="comment-info">
                        <h3>${Comment.product_name}</h3>
                        <p class="comment-text">${Comment.text}</p>
                        <span class="comment-date">${Comment.date}</span>
                    </div>
                </div>
            `;
        });
        html += `</div>`
    }
    catch(error){
        console.error(error);
        panelLeft.innerHTML = "<p>خطا در دریافت پیام ها</p>";
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




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
                    <img src="${comment.product_image}" alt="${comment.product_name}">
                    <div class="comment-info">
                        <h3>${comment.product_name}</h3>
                        <p class="comment-text">${comment.text}</p>
                        <span class="comment-date">${comment.date}</span>
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



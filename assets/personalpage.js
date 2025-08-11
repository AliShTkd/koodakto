// سفارش هاس من
const panelLeft = document.querySelector(".panel-left")

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
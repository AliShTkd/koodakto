document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".user-message-secend-container");
    console.log("Container:", container); // چک کن المنت پیدا شده

    try {
        const response = await fetch("http://localhost:8000/api/contacts/us", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("خطا در دریافت پیام");
        }

        const result = await response.json();
        console.log("Full Response:", result); // کل پاسخ رو چاپ کن
        console.log("Data:", result.result.data); // حالا به result.result.data دسترسی پیدا می‌کنیم

        container.innerHTML = "";

        if (result.result && result.result.data && Array.isArray(result.result.data)) {
            result.result.data.forEach(msg => {
                const card = document.createElement("div");
                card.classList.add("user-message-card", "col-lg-3");
                card.innerHTML = `
                    <div class="user-message-card-name d-flex">
                        <img class="img-message-card" src="./assets/photos/user.svg" alt="">
                        <div>
                            <h4>${msg.name || 'نام ناشناس'}</h4>
                            <small>${msg.email || 'ایمیل ناشناس'}</small>
                        </div>
                    </div>
                    <div class="user-message-card-text">
                        <p>${msg.message || 'پیام خالی'}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        } else {
            container.innerHTML = "<p>داده‌ای برای نمایش وجود ندارد یا ساختار نادرست است</p>";
        }
    } catch (error) {
        console.error("خطا:", error);
        container.innerHTML = "<p>خطا در بارگذاری پیام‌ها</p>";
    }
});
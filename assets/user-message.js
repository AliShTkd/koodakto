document.addEventListener("DOMContentLoaded",async () =>{
    const container = document.querySelector(".user-message-secend-container")

    try {
        const response = await fetch("https://example.com/api/messages", {
            method: "GET",
            headers : {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("خطا در دریافت پیام");
        }

        const message = await response.json();

        container.innerHTML = "";

         messages.forEach(msg => {
            const card = document.createElement("div");
            card.classList.add("user-message-card", "col-lg-3");
            card.innerHTML = `
                <div class="user-message-card-name d-flex">
                    <img class="img-message-card" src="./assets/photos/user.svg" alt="">
                    <div>
                        <h4>${msg.name}</h4>
                        <small>${msg.email}</small>
                    </div>
                </div>
                <div class="user-message-card-text">
                    <p>${msg.message}</p>
                </div>
            `;
            container.appendChild(card);
        });
        
    }

    catch (error) {
        console.error("خطا:", error);
        container.innerHTML = "<p>خطا در بارگذاری پیام‌ها</p>";
    }
});
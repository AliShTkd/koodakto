const nameInput =  document.getElementById('name')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')
const sendBtn = document.getElementById('sendBtn')


sendBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
        alert("لطفا همه فیلد را پر کنید ");
        return;
    }
    try {
        const response = await fetch("http://localhost:8000/api/contacts/us", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json', // Corrected header
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                // Add phone if required by backend, e.g., phone: ""
            }),
        });
        if (!response.ok) {
            throw new Error("خطا در ارسال پیام.");
        }
        const result = await response.json();
        alert("پیام با موفقیت ارسال شد");

        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = ""; // Fixed: messageInput, not message
    } catch (error) {
        console.error("خطا:", error);
        alert("ارسال پیام با خطا مواجه شد.");
    }
});
const nameInput =  document.getElementById('name')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')
const sendBtn = document.getElementById('sendBtn')


sendBtn.addEventListener("click", async(e) =>{
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if(!name || !email || !message){
        alert("لطفا همه فیلد را پر کنید ");
        return;
    }
    try {
        const response = await
        fetch("",{
            method:"POST",
            headers : {
                "contact-type" : "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                message,
            }),
        });
        if(!response.ok){
            throw new Error("خطا در ارسال پیام.")
        }
        const result = await response.json();
        alert("پیام باموفقیت ارسال شد");

        nameInput.value = "";
        emailInput.value= "";
        message.value="";

    }
    catch(error){
        console.error("خطا:" ,error);
        alert("ارسال پیام با خطا مواجه شد.");
    }
});
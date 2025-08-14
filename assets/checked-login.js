document.addEventListener("DOMContentLoaded",()=>{
    const token = localStorage.getItem("token");

const loginBtn = document.querySelector('a[href="login.html"] .new-btn-sign-log')
const panelBtn = document.querySelector('a[href="personalpage.html"] .new-btn-sign-log');

if(token){
    if(loginBtn) loginBtn.style.display = "none";
    if(panelBtn) panelBtn.style.display="inline-block"
}else{
    if(panelBtn) panelBtn.style.display = "none";
    if(loginBtn) loginBtn.style.display = "inline-block";
}
});
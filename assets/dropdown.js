document.querySelectorAll(".dropdown .dropbtn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const parent = btn.parentElement;

    // بستن بقیه منوها
    document.querySelectorAll(".dropdown").forEach(d => {
      if (d !== parent) d.classList.remove("active");
    });

    // باز/بسته کردن منوی همین آیتم
    parent.classList.toggle("active");
  });
});

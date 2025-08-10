  // اسلایدر
  document.addEventListener("DOMContentLoaded" , function(){
    
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slides");
  const dotsContainer = document.getElementById("dots-container");

  const slidesPerPage = 3;
  const totalSlides = slides.length;
  const maxIndex = totalSlides - slidesPerPage;
  let currentIndex = 0;

  // ساخت دات‌ها برای کنترل دستی
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement("span");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => moveToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function updateDots() {
    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  function moveToSlide(index) {
    currentIndex = index;
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(${slideWidth * currentIndex}px)`;
    updateDots();
  }

  setInterval(() => {
    currentIndex = (currentIndex + 1 > maxIndex) ? 0 : currentIndex + 1;
    moveToSlide(currentIndex);
  }, 5000);


  let sliderTrack = document.querySelector(".slider-track-2");
  let slides2 = document.querySelectorAll(".slides-2");
  let nextBtn = document.getElementById("next");
  let prevBtn = document.getElementById("prev");

  let slides2Width = slides2[0].offsetWidth;
  let currentSIndex = 0;
  let totalsliderTrack = slides2.length;
  let visibleItems = 3;

  function updateSlider() {
      let offset = -currentSIndex * slides2Width;
      sliderTrack.style.transform = `translateX(${-offset}px)`;

      prevBtn.disabled = currentSIndex === 0;
      nextBtn.disabled = currentSIndex + visibleItems >= totalsliderTrack;
  }

  nextBtn.addEventListener("click", function () {
    if (currentSIndex > 0) {
        currentSIndex--;
        updateSlider();
    }
});

prevBtn.addEventListener("click", function () {
    if (currentSIndex + visibleItems < totalsliderTrack) {
        currentSIndex++;
        updateSlider();
    }
});

  });
  
// اسلایدر
document.addEventListener("DOMContentLoaded" , function(){

let products = document.querySelector(".products");
let product = document.querySelectorAll(".product");
let nextsBtn = document.getElementById("nexts");
let prevsBtn = document.getElementById("prevs");

let productWidth = product[0].offsetWidth;
let currentproduct = 0;
let totalProducts = product.length;
let visibleproduct = 3;

function updateproduct() {
    let offset = -currentproduct * productWidth;
    products.style.transform = `translateX(${-offset}px)`;

    prevsBtn.disabled = currentproduct === 0;
    nextsBtn.disabled = currentproduct + visibleproduct >= totalProducts;
}

nextsBtn.addEventListener("click", function () {
  if (currentproduct > 0) {
    currentproduct--;
    updateproduct();
    }
});

prevsBtn.addEventListener("click", function () {
  if (currentproduct + visibleproduct < totalProducts) {
    currentproduct++;
    updateproduct();
    }
});


});

// ولیدیشن صفحه ورود

document.addEventListener("DOMContentLoaded" , function(){
  let nameInput = document.getElementById("nameInput")
  let passInput = document.getElementById("passInput")
  let nameError = document.getElementById("nameError")
  let passError = document.getElementById("passError")
  let loginBtn  = document.getElementById("loginBtn")

  loginBtn.addEventListener("click", function(event){
    event.preventDefault();

    nameError.textContent = "";
    passError.textContent = "";

    let isValid = true;
    let username = nameInput.value.trim();
    let password = passInput.value.trim();

    if(username === ""){
      nameError.textContent = "ایمیل را وارد کنید";
      isValid = false;
    }if (/^\d+$/.test(username)){
      nameError.textContent = "ایمیل نمیتواند عدد باشد"
      isValid = false;
    }if(username.length<2){
      nameError.textContent = "ایمیل باید بیشتر از 2 کارکتر باشد ";

    }

    if(password === ""){
      passError.textContent = "رمز عبور را وارد کنید"
      isValid = false;
    }else if (password.length < 5){
      passError.textContent = "رمز عبور باید بیشتر از 6 کارکتر باشد"
      isValid = false;
    }



    if (isValid) {
      const payload = {
        email: username,
        password: password,
      };
      fetch("http://localhost:8000/api/auth/login",{
        method: "POST",
        headers : {
          "Content-Type":"application/json",
        },
        body:JSON.stringify(payload),
      })
      .then(response => {
        if(!response.ok){
          throw new Error("نام کاربری یا رمز عبور اشتباه است")
        }
        return response.json();
      })
      .then(data =>{
        localStorage.setItem("token", data.result.token);

        window.location.href = "index.html";
      })
      .catch(error => {
        passError.textContent = "ارورررر";
      });
    }
  })

});

// ولیدیشن صفحه ثبت نام

document.addEventListener("DOMContentLoaded",function(){
  let signNameInput = document.getElementById("signNameInput")
  let signLnameInput = document.getElementById("signLnameInput")
  let signEmailInput = document.getElementById("signEmailInput")
  let signNumberInput = document.getElementById("signNumberInput")
  let userPassInput = document.getElementById ("userPassInput")
  
  let userPassError = document.getElementById ("userPassError")
  let signNameError = document.getElementById("signNameError")
  let signLnameError = document.getElementById("signLnameError")
  let signEmailError = document.getElementById("signEmailError")
  let signNumberError = document.getElementById("signNumberError")
  let signinBtn = document.getElementById("signinBtn")

  signinBtn.addEventListener("click", function(event){
    event.preventDefault();

    signNameError.textContent = "";
    signLnameError.textContent = "";
    signEmailError.textContent = "";
    signNumberError.textContent = "";
    userPassError.textContent = "";

    let isValid = true
    let fname = signNameInput.value.trim();
    let lname = signLnameInput.value.trim();
    let email = signEmailInput.value.trim();
    let number = signNumberInput.value.trim();
    let signPassword =  userPassInput.value.trim ();

    if(fname === ""){
      signEmailError.textContent = "نام و نام خانوادگی را وارد کنید"
      isValid = false
     }
     if (/^\d+$/.test(fname)){
      signNameError.textContent = "نام و نام خانوادگی نمیتواند عدد باشد"
      isValid = false;
    }
    if(fname.length<2){
      signNameError.textContent = "نام باید بیشتر از 2 کارکتر باشد ";
    }

    if(lname === ""){
      signLnameError.textContent = "نام خانوادگی را وارد کنید"
      isValid = false
     }
     if (/^\d+$/.test(lname)){
      signLnameError.textContent = "نام خانوادگی نمیتواند عدد باشد"
      isValid = false;
    }
    if(lname.length<2){
      signLnameError.textContent = "نام خانوادگی باید بیشتر از 2 کارکتر باشد ";
    }
   
    if(number.length<11){
      signNumberError.textContent = "شماره نمیتواند کم تر از 11 رقم باشد "
      isValid = false
     }

     if (!/^\d+$/.test(number)){
      signNumberError.textContent = "شماره باید عدد باشد"
      isValid = false;
      }

     if(email === ""){
      signEmailError.textContent = "ایمیل را وارد کنید"
      isValid = false
     }




    if(signPassword === ""){
      userPassError.textContent = "رمز عبور را وارد کنید"
      isValid = false;
    }if (signPassword.length < 6){
      userPassError.textContent = "رمز عبور باید بیشتر از 6 کارکتر باشد"
      isValid = false;
    }


    

    if (isValid) {
      const payload = {
        fname: fname,
        lname: lname,
        email: email,
        phone: number,
        password: signPassword
      };
    
      fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          //  "Authorization" : "barear "+localStorage.getItem('token')
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("مشکلی در ثبت‌نام به وجود آمده است.");
        }
        return response.json();
      })
      .then(data => {
        alert("ثبت‌نام با موفقیت انجام شد!");
        window.location.href = "login.html"; // بعد از ثبت‌نام برو به صفحه ورود
      })
      .catch(error => {
        alert(error.message); // نمایش خطا به کاربر
      });
    }
    

 })
})





// تابع بارگذاری لیست کاربران
function loadUserList() {
  fetch('http://localhost:8000/api/users', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('خطا در دریافت داده‌ها: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      const userList = document.getElementById('userList');
      userList.innerHTML = ''; // پاک کردن محتوای قبلی

      if (Array.isArray(data.result.data)) {
        data.result.data.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${user.id || 'N/A'}</td>
            <td>${user.fname+" "+ user.lname || 'N/A'}</td>
            <td>${user.email || 'N/A'}</td>
            <td>${user.group.name || 'بدون گروه'}</td>
          `;
          userList.appendChild(row);
        });
      } else {
        console.error('داده‌ها آرایه نیستند:', data);
      }
    })
    .catch(error => console.error('خطا:', error));
}

// فراخوانی در بارگذاری اولیه صفحه
document.addEventListener('DOMContentLoaded', () => {
  loadUserList();
});





// selectlist ایمیل و نام کاربران
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8000/api/users/all', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('خطا در دریافت داده‌ها: ' + response.status);
      }
      return response.json();
    })
    .then(response => {
      const usernSelect = document.getElementById('usern');
      usernSelect.innerHTML = '<option value="" disabled selected>انتخاب ایمیل</option>';

      response.result.forEach(usern => {
        const option = document.createElement('option');
        option.value = usern.id;
        option.textContent = `${usern.email} . ${usern.fname}`;
        usernSelect.appendChild(option);
      });

      // ✅ فعال‌سازی Selectize بعد از پر شدن
      $('#usern').selectize({
        create: false,
        sortField: 'text',
        placeholder: 'انتخاب ایمیل کاربر',
        dropdownParent: 'body'
      });

    })
    .catch(error => console.error('خطا در دریافت نام کاربری:', error));
});


// selectlist نقش ها
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8000/api/users/groups/all', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token') // توکن رو جایگزین کن
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('خطا در دریافت داده‌ها: ' + response.status);
    }
    return response.json();
  })
  .then(response => {
    const roleSelect = document.getElementById('role');
    roleSelect.innerHTML = '<option value="" disabled selected>انتخاب نقش</option>';
    
    response.result.forEach(role => {
      const option = document.createElement('option');
      option.value = role.id;
      option.textContent = role.name;
      roleSelect.appendChild(option);
    });

    // فعال‌سازی Selectize روی لیست نقش‌ها
    $('#role').selectize({
      create: false,
      sortField: 'text',
      placeholder: 'انتخاب نقش کاربر',
      dropdownParent: 'body'
    });
  })
  .catch(error => console.error('خطا در دریافت نقش‌ها:', error));
});



//کلید ویرایش کاربر
document.getElementById('addUserForm').addEventListener('submit', function (e) {
  e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

  const userId = document.getElementById('usern').value;
  const groupId = document.getElementById('role').value;
  const selectedEmail = document.getElementById('usern').selectedOptions[0].text.split(' . ')[0];

  // مرحله اول: گرفتن اطلاعات کامل کاربر
  fetch(`http://localhost:8000/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('خطا در دریافت اطلاعات کاربر: ' + response.status);
      }
      return response.json();
    })
    .then(userData => {
      const existingUser = userData.result;

      // مرحله دوم: ارسال اطلاعات کامل برای ویرایش
      return fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: selectedEmail,
          group_id: groupId,
          fname: existingUser.fname || "",
          lname: existingUser.lname || "",
          phone: existingUser.phone || ""
        })
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('خطا در ویرایش کاربر: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('کاربر با موفقیت ویرایش شد:', data);
      alert("✅ کاربر با موفقیت ویرایش شد");
      location.reload();// ریلود صفحه

      // بروزرسانی لیست کاربران
      updateUserList();
    })
   
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const answer = item.querySelector('.faq-answer');
      if (!answer) return;

      // اگر الان نمایش داشت، مخفی کن، وگرنه نمایش بده
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
      } else {
        answer.style.display = 'block';
      }
    });
  });
});









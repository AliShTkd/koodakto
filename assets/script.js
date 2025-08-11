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



// تابع پیش نمایش پزشکان
// document.addEventListener('DOMContentLoaded', async () => {
//   // انتخاب المنت جستجو
//   const searchInput = document.querySelector('.search-input .input-1');
  
//   // تابع اصلی برای دریافت و نمایش پزشکان
//   const fetchAndRenderDoctors = async (searchTerm = '') => {
//     try {
//       // ساخت URL درخواست با توجه به عبارت جستجو
//       const url = `http://localhost:8000/api/doctors?per_page=20&sort_by=&sort_type=&search=${searchTerm}`;
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Authorization': 'Bearer ' + localStorage.getItem('token'),
//           'Accept': 'application/json'
//         }
//       });

//       if (!response.ok) throw new Error('خطا در دریافت اطلاعات پزشکان: ' + response.status);

//       const data = await response.json();
//       console.log(data); // برای دیباگ

//       const container = document.querySelector('.box-doctor');
//       container.innerHTML = ''; // پاک کردن محتوای قبلی

//       const doctors = data.result.data;
      
//       if (doctors.length === 0) {
//         container.innerHTML = '<p class="text-center mt-5">پزشکی با این مشخصات یافت نشد.</p>';
//         return;
//       }

//       doctors.forEach(doctor => {
//         const doctorElement = document.createElement('div');
//         doctorElement.className = 'doctor-names col-6 col-md-3 mb-4';

//         const fullName = `${doctor.user.fname} ${doctor.user.lname}`;
//         const specialty = doctor.specialty ?? 'تخصص مشخص نیست';
//         const rating = '4.5'; 

//         doctorElement.innerHTML = `
//           <div class="doctor-name d-flex">
//             <div class="d-flex">
//               <div class="doctor-icon"><img src="./assets/photos/user.svg" alt=""></div>
//               <div class="doctor-details">
//                 <a href="doctor.html?id=${doctor.id}">
//                   <p class="name">${fullName}</p>
//                 </a>
//                 <p class="skill">${specialty}</p>
//               </div>
//             </div>
//             <div class="doctor-point">
//               <span>${rating}<img src="./assets/photos/Star 5.svg" alt=""></span>
//             </div>
//           </div>
//         `;

//         container.appendChild(doctorElement);
//       });

//     } catch (error) {
//       console.error('خطا:', error);
//     }
//   };

//   // اضافه کردن event listener به اینپوت جستجو با استفاده از debounce
//   searchInput.addEventListener('input', (event) => {
//     clearTimeout(searchInput.debounceTimer);
//     searchInput.debounceTimer = setTimeout(() => {
//       const searchTerm = event.target.value;
//       fetchAndRenderDoctors(searchTerm);
//     }, 500); // تاخیر 500 میلی‌ثانیه
//   });
  
//   // فراخوانی اولیه تابع برای نمایش پزشکان در بارگذاری صفحه
//   fetchAndRenderDoctors();
// });



document.addEventListener('DOMContentLoaded', async () => {
  // انتخاب المنت جستجو
  const searchInput = document.querySelector('.search-input .input-1');
  // انتخاب المنت کانتینر پزشکان
  const container = document.querySelector('.box-doctor');

  // متغیر سراسری برای ذخیره همه پزشکان
  let allDoctors = [];

  // تابع برای نمایش پزشکان در صفحه
  const renderDoctors = (doctors) => {
    container.innerHTML = ''; // پاک کردن محتوای قبلی

    if (doctors.length === 0) {
      container.innerHTML = '<p class="text-center mt-5">پزشکی با این مشخصات یافت نشد.</p>';
      return;
    }

    doctors.forEach(doctor => {
      const doctorElement = document.createElement('div');
      doctorElement.className = 'doctor-names col-6 col-md-3 mb-4';

      const fullName = `${doctor.user.fname} ${doctor.user.lname}`;
      const specialty = doctor.specialty ?? 'تخصص مشخص نیست';
      const rating = '4.5';

      doctorElement.innerHTML = `
        <div class="doctor-name d-flex">
          <div class="d-flex">
            <div class="doctor-icon"><img src="./assets/photos/user.svg" alt=""></div>
            <div class="doctor-details">
              <a href="doctor.html?id=${doctor.id}">
                <p class="name">${fullName}</p>
              </a>
              <p class="skill">${specialty}</p>
            </div>
          </div>
          <div class="doctor-point">
            <span>${rating}<img src="./assets/photos/Star 5.svg" alt=""></span>
          </div>
        </div>
      `;

      container.appendChild(doctorElement);
    });
  };
  
  // تابع اصلی برای دریافت اطلاعات از API و ذخیره آن‌ها
  const fetchDoctors = async () => {
    try {
      const url = `http://localhost:8000/api/doctors?per_page=20&sort_by=&sort_type=`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        }
      });

      if (!response.ok) throw new Error('خطا در دریافت اطلاعات پزشکان: ' + response.status);

      const data = await response.json();
      
      // ذخیره همه پزشکان در متغیر سراسری
      allDoctors = data.result.data;

      // نمایش اولیه همه پزشکان
      renderDoctors(allDoctors);

    } catch (error) {
      console.error('خطا:', error);
      container.innerHTML = '<p class="text-center mt-5">در حال حاضر مشکلی در دریافت اطلاعات وجود دارد.</p>';
    }
  };

  // تابع برای فیلتر کردن پزشکان و نمایش آن‌ها
  const filterAndRenderDoctors = (searchTerm) => {
    const searchTermLower = searchTerm.trim().toLowerCase();

    // اگر عبارت جستجو خالی بود، همه پزشکان را نمایش بده
    if (!searchTermLower) {
      renderDoctors(allDoctors);
      return;
    }

    // فیلتر کردن پزشکان بر اساس نام، نام خانوادگی یا تخصص
    const filteredDoctors = allDoctors.filter(doctor => {
      const fullName = `${doctor.user.fname} ${doctor.user.lname}`.toLowerCase();
      const specialty = (doctor.specialty ?? '').toLowerCase();
      
      return fullName.includes(searchTermLower) || specialty.includes(searchTermLower);
    });

    renderDoctors(filteredDoctors);
  };
  
  // اضافه کردن event listener به اینپوت جستجو
  searchInput.addEventListener('input', (event) => {
    clearTimeout(searchInput.debounceTimer);
    searchInput.debounceTimer = setTimeout(() => {
      const searchTerm = event.target.value;
      filterAndRenderDoctors(searchTerm);
    }, 300); // تاخیر 300 میلی‌ثانیه برای debounce
  });

  // فراخوانی اولیه تابع دریافت پزشکان هنگام بارگذاری صفحه
  fetchDoctors();
});



// document.addEventListener('DOMContentLoaded', async () => {
//   const params = new URLSearchParams(window.location.search);
//   const id = params.get('id');
//   if (!id) return alert('شناسه پزشک پیدا نشد');

//   try {
//     const response = await fetch(`http://localhost:8000/api/doctors/${id}`, {
//       headers: {
//         'Authorization': 'Bearer ' + localStorage.getItem('token'),
//         'Accept': 'application/json'
//       }
//     });

//     if (!response.ok) throw new Error('خطا در دریافت اطلاعات پزشک');

//     const data = await response.json();
//     const doctor = data.result;

//     // نام پزشک
//     document.querySelector('.doctor-name-1').textContent = `${doctor.user.fname} ${doctor.user.lname}`;

//     // تخصص
//     document.querySelector('.doctor-specialist').textContent = doctor.specialty || 'تخصص مشخص نشده';

//     // آدرس
//     document.querySelector('.loc-p').textContent = `آدرس: ${doctor.address || 'ثبت نشده'}`;

//     // تعداد نوبت موفق
//     document.querySelectorAll('.successful-turn')[0].textContent = `${doctor.successful_turns || 0} نوبت موفق`;

//     // درصد پیشنهاد کاربران
//     document.querySelectorAll('.successful-turn')[1].textContent = `${doctor.recommendation_rate || 'بدون'} پیشنهاد کاربران`;

//     // کمترین معطلی (فرضی - اگر فیلدی داری جایگزین کن)
//     document.querySelectorAll('.successful-turn')[2].textContent = doctor.waiting_time || 'کم ترین معطلی';

//     // امتیاز
//     const pointBox = document.querySelector('.doctor-point span');
//     if (pointBox) {
//       pointBox.innerHTML = `${doctor.rating || 0}<img src="./assets/photos/Star 5.svg" alt="">`;
//     }

//     // تصویر پزشک (اگر در API فیلد عکس وجود داشت)
//     if (doctor.image) {
//       const imgTag = document.querySelector('.doctor-img img');
//       imgTag.src = doctor.image;
//     }

//   } catch (error) {
//     console.error('خطا در دریافت اطلاعات پزشک:', error);
//   }
// });


document.addEventListener('DOMContentLoaded', async () => {
            // --- 1. INITIAL SETUP ---
            const params = new URLSearchParams(window.location.search);
            const doctorId = params.get('id');
            const token = localStorage.getItem('token');

            // Appointment Elements
            const bookBtn = document.getElementById('book-appointment-btn');
            const messageBox = document.getElementById('appointment-message-box');
            const bookingSection = document.getElementById('booking-section');

            // Comment Elements
            const cmBtn = document.getElementById('cmBtn');
            const cmInput = document.getElementById('cmInput');
            const commentsContainer = document.getElementById('comments-container');
            const commentFormContainer = document.querySelector('.comment-doctor-container');

            if (!token) {
                bookingSection?.classList.add('hidden');
                commentFormContainer?.classList.add('hidden');
            }

            if (!doctorId) {
                document.body.innerHTML = '<h1>شناسه پزشک در آدرس صفحه یافت نشد.</h1>';
                return;
            }

            // --- 2. FUNCTIONS ---

            const displayAppointmentMessage = (appointment) => {
                const displayTime = appointment?.appointment_time_fa || appointment?.appointment_time || 'در اولین فرصت';
                messageBox.innerHTML = `<div class="alert alert-success">شما یک نوبت رزرو شده دارید. تاریخ و ساعت: ${displayTime}</div>`;
                bookingSection?.classList.add('hidden');
            };

            const buildCommentHTML = (fname, lname, commentText) => {
                return `
                    <div class="comment-border mt-4">
                        <div class="doctor-page-left-comment justify-content-between align-items-center d-flex">
                            <div class="doctor-detail-right d-flex align-items-center">
                                <div class="doctor-img"><img src="./assets/photos/Frame 1116606828.svg" alt="User avatar"></div>
                                <div class="doctor-p-box">
                                    <div><p class="doctor-name-1">${fname} ${lname}</p></div>
                                    <div><p class="doctor-specialist">مراجعه کننده</p></div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4"><p class="comment-p-1">${commentText}</p></div>
                    </div>
                `;
            };

            // --- 3. ASYNC API CALLS ---

            const fetchDoctorDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/api/doctors/${doctorId}`, {
                        headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' }
                    });
                    if (!response.ok) throw new Error('خطا در دریافت اطلاعات پزشک');
                    const data = await response.json();
                    const doctor = data.result;
                    document.querySelector('.doctor-name-1').textContent = `${doctor.user.fname} ${doctor.user.lname}`;
                    document.querySelector('.doctor-specialist').textContent = doctor.specialty || 'تخصص مشخص نشده';
                    document.querySelector('.loc-p').textContent = `آدرس: ${doctor.address || 'ثبت نشده'}`;
                } catch (error) {
                    console.error('خطا در دریافت اطلاعات پزشک:', error);
                    document.querySelector('.doctor-name-1').textContent = 'خطا در بارگذاری اطلاعات';
                }
            };

            const checkExistingAppointment = async () => {
                if (!token) return;
                try {
                    const response = await fetch(`http://localhost:8000/api/appointments/check-doctor/${doctorId}`, {
                        headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' }
                    });
                    if (response.ok) {
                        const result = await response.json();
                        if (result && result.result) {
                            displayAppointmentMessage(result.result);
                        }
                    }
                } catch (error) {
                    console.error('خطا در بررسی نوبت موجود:', error);
                }
            };
            
            const fetchAndDisplayComments = async () => {
                commentsContainer.innerHTML = '<p class="mt-4 text-center">در حال بارگذاری نظرات...</p>';
                try {
                    const response = await fetch(`http://localhost:8000/api/doctors/comments?doctor_id=${doctorId}`, {
                        headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' }
                    });
                    if (!response.ok) throw new Error('دریافت نظرات ناموفق بود');
                    const data = await response.json();
                    commentsContainer.innerHTML = '';
                    const comments = Array.isArray(data.result) ? data.result : (data.result.data || []);
                    if (comments.length > 0) {
                        comments.forEach(item => {
                            if (item.created_by) {
                                const { created_by, comment } = item;
                                const commentHTML = buildCommentHTML(created_by.fname, created_by.lname, comment);
                                commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
                            }
                        });
                    } else {
                        commentsContainer.innerHTML = '<p class="mt-4 text-center">هنوز نظری برای این پزشک ثبت نشده است.</p>';
                    }
                } catch (err) {
                    console.error('خطا در دریافت نظرات:', err);
                    commentsContainer.innerHTML = '<p class="mt-4 text-center text-danger">خطا در بارگذاری نظرات.</p>';
                }
            };

            // --- 4. EVENT LISTENERS ---

            if (bookBtn) {
                bookBtn.addEventListener('click', async (event) => {
                    event.preventDefault();
                    bookBtn.textContent = 'در حال بررسی...';
                    bookBtn.style.pointerEvents = 'none';
                    messageBox.innerHTML = '';
                    try {
                        const response = await fetch('http://localhost:8000/api/appointments', {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({ doctor_id: doctorId })
                        });
                        const result = await response.json();
                        if (response.ok) {
                            displayAppointmentMessage(result.result);
                        } else {
                            messageBox.innerHTML = `<div class="alert alert-danger">${result.message || 'خطایی در ثبت نوبت رخ داد.'}</div>`;
                            bookBtn.textContent = 'دوباره تلاش کنید';
                            bookBtn.style.pointerEvents = 'auto';
                        }
                    } catch (error) {
                        console.error('خطای شبکه:', error);
                        messageBox.innerHTML = `<div class="alert alert-danger">خطا در ارتباط با سرور.</div>`;
                        bookBtn.textContent = 'رزرو نوبت';
                        bookBtn.style.pointerEvents = 'auto';
                    }
                });
            }

            if (cmBtn) {
                cmBtn.addEventListener('click', async () => {
                    const commentText = cmInput.value.trim();
                    if (!commentText) return alert('لطفاً متن نظر را وارد کنید');
                    cmBtn.disabled = true;
                    cmBtn.textContent = 'در حال ارسال...';
                    try {
                        const response = await fetch('http://localhost:8000/api/doctors/comments', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token,
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({ doctor_id: doctorId, comment: commentText })
                        });
                        if (!response.ok) throw new Error('ثبت نظر ناموفق بود');
                        cmInput.value = '';
                        await fetchAndDisplayComments(); // Refresh comments list
                    } catch (err) {
                        console.error('خطا در ثبت نظر:', err);
                        alert('ثبت نظر با خطا مواجه شد');
                    } finally {
                        cmBtn.disabled = false;
                        cmBtn.textContent = 'افزودن نظر';
                    }
                });
            }

            // --- 5. RUN ON PAGE LOAD ---
            await fetchDoctorDetails();
            await checkExistingAppointment();
            await fetchAndDisplayComments();
        });





// نظرات قبلی
// document.addEventListener('DOMContentLoaded', async () => {
//   const params = new URLSearchParams(window.location.search);
//   const doctorId = params.get('id');
//   if (!doctorId) return alert('شناسه پزشک یافت نشد');

//   const cmBtn = document.getElementById('cmBtn');
//   const cmInput = document.getElementById('cmInput');
//   const commentsContainer = document.querySelector('.doctor-page-left');

//   // پاک کردن کامنت‌های استاتیک قبلی از HTML
//   const staticComments = commentsContainer.querySelectorAll('.comment-border');
//   staticComments.forEach(comment => comment.remove());

//   // ✅ تابع ساختن HTML برای کامنت
//   function buildCommentHTML(fname, lname, commentText) {
//     return `
//       <div class="comment-border mt-4">
//         <div class="doctor-page-left-comment justify-content-between align-items-center d-flex">
//           <div class="doctor-detail-right d-flex align-items-center">
//             <div class="doctor-img"><img src="./assets/photos/Frame 1116606828.svg" alt=""></div>
//             <div class="doctor-p-box">
//               <div><p class="doctor-name-1">${fname} ${lname}</p></div>
//               <div><p class="doctor-specialist">مراجعه کننده</p></div>
//             </div>
//           </div> 
//           <div class="doctor-point d-flex">
//             <!-- امتیاز فعلاً بیخیال -->
//           </div>
//         </div>
//         <div class="mt-4"><p class="comment-p-1">${commentText}</p></div>
//       </div>
//     `;
//   }

//   // ✅ گرفتن کامنت‌های قبلی از سرور و نمایش آن‌ها
//   async function fetchComments() {
//     try {
//       const response = await fetch(`http://localhost:8000/api/doctors/comments?id=${doctorId}`, {
//         headers: {
//           'Authorization': 'Bearer ' + localStorage.getItem('token'),
//           'Accept': 'application/json'
//         }
//       });

//       if (!response.ok) throw new Error('دریافت نظرات ناموفق بود');
//       const data = await response.json();

//       data.result.forEach(item => {
//         const { created_by, comment } = item;
//         const commentHTML = buildCommentHTML(created_by.fname, created_by.lname, comment);
//         commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
//       });
//     } catch (err) {
//       console.error('خطا در دریافت نظرات:', err);
//     }
//   }

//   // ✅ ثبت نظر جدید
//   cmBtn.addEventListener('click', async () => {
//     const commentText = cmInput.value.trim();
//     if (!commentText) return alert('لطفاً متن نظر را وارد کنید');

//     try {
//       const response = await fetch('http://localhost:8000/api/doctors/comments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + localStorage.getItem('token'),
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//           doctor_id: doctorId,
//           comment: commentText
//         })
//       });

//       if (!response.ok) throw new Error('ثبت نظر ناموفق بود');

//       const resData = await response.json();
//       const { created_by, comment } = resData.result;

//       const newCommentHTML = buildCommentHTML(created_by.fname, created_by.lname, comment);
//       commentsContainer.insertAdjacentHTML('beforeend', newCommentHTML);
//       cmInput.value = '';

//     } catch (err) {
//       console.error('خطا در ثبت نظر:', err);
//       alert('ثبت نظر با خطا مواجه شد');
//     }
//   });

//   // در نهایت گرفتن لیست اولیه کامنت‌ها
//   await fetchComments();
// });



document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert('شناسه پزشک پیدا نشد');

  try {
    const response = await fetch(`http://localhost:8000/api/doctors/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error('خطا در دریافت اطلاعات پزشک');

    const data = await response.json();
    const doctor = data.result;

    // نام پزشک
    document.querySelector('.doctor-name-1').textContent = `${doctor.user.fname} ${doctor.user.lname}`;

    // تخصص
    document.querySelector('.doctor-specialist').textContent = doctor.specialty || 'تخصص مشخص نشده';

    // آدرس
    document.querySelector('.loc-p').textContent = `آدرس: ${doctor.address || 'ثبت نشده'}`;

    // تعداد نوبت موفق
    document.querySelectorAll('.successful-turn')[0].textContent = `${doctor.successful_turns || 0} نوبت موفق`;

    // درصد پیشنهاد کاربران
    document.querySelectorAll('.successful-turn')[1].textContent = `${doctor.recommendation_rate || 'بدون'} پیشنهاد کاربران`;

    // کمترین معطلی (فرضی - اگر فیلدی داری جایگزین کن)
    document.querySelectorAll('.successful-turn')[2].textContent = doctor.waiting_time || 'کم ترین معطلی';

    // امتیاز
    const pointBox = document.querySelector('.doctor-point span');
    if (pointBox) {
      pointBox.innerHTML = `${doctor.rating || 0}<img src="./assets/photos/Star 5.svg" alt="">`;
    }

    // تصویر پزشک (اگر در API فیلد عکس وجود داشت)
    if (doctor.image) {
      const imgTag = document.querySelector('.doctor-img img');
      imgTag.src = doctor.image;
    }

  } catch (error) {
    console.error('خطا در دریافت اطلاعات پزشک:', error);
  }
});














document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const doctorId = params.get('id');
  if (!doctorId) return alert('شناسه پزشک یافت نشد');

  const cmBtn = document.getElementById('cmBtn');
  const cmInput = document.getElementById('cmInput');
  const commentsContainer = document.querySelector('.doctor-page-left');

  // پاک کردن کامنت‌های پیش‌فرض موجود در HTML
  const staticComments = commentsContainer.querySelectorAll('.comment-border');
  staticComments.forEach(comment => comment.remove());

  cmBtn.addEventListener('click', async () => {
    const commentText = cmInput.value.trim();
    if (!commentText) return alert('لطفاً متن نظر را وارد کنید');

    try {
      const response = await fetch('http://localhost:8000/api/doctors/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          doctor_id: doctorId,
          comment: commentText
        })
      });

      if (!response.ok) throw new Error('خطا در ثبت نظر');

      const resData = await response.json();
      const { created_by, comment } = resData.result;

      const newCommentHTML = `
        <div class="comment-border mt-4">
          <div class="doctor-page-left-comment justify-content-between align-items-center d-flex">
            <div class="doctor-detail-right d-flex align-items-center">
              <div class="doctor-img"><img src="./assets/photos/Frame 1116606828.svg" alt=""></div>
              <div class="doctor-p-box">
                <div><p class="doctor-name-1">${created_by.fname} ${created_by.lname}</p></div>
                <div><p class="doctor-specialist">مراجعه کننده</p></div>
              </div>
            </div> 
            <div class="doctor-point d-flex">
              <!-- امتیاز فعلاً بیخیال -->
            </div>
          </div>
          <div class="mt-4"><p class="comment-p-1">${comment}</p></div>
        </div>
      `;

      commentsContainer.insertAdjacentHTML('beforeend', newCommentHTML);
      cmInput.value = '';

    } catch (err) {
      console.error('خطا در ثبت نظر:', err);
      alert('ثبت نظر با خطا مواجه شد');
    }
  });
});


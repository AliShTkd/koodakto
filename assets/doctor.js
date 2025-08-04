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

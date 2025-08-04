document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:8000/api/doctors?per_page=20&sort_by=&sort_type=', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('خطا در دریافت اطلاعات پزشکان: ' + response.status);
    }

    const data = await response.json();
    console.log(data); // برای دیباگ

    const container = document.querySelector('.doctors-list');
    container.innerHTML = ''; // پاک کردن محتوای قبلی

    if (Array.isArray(data.result.data)) {
      data.result.data.forEach(doctor => {
        const fullName = `${doctor.user.fname} ${doctor.user.lname}`;
        const specialty = doctor.specialty ?? 'بدون تخصص';
        const phone = doctor.user.phone ?? 'نامشخص';
        const email = doctor.user.email ?? 'نامشخص';
        const address = doctor.address ?? 'نامشخص';
        const workingHours = doctor.working_hours ?? 'ساعت کاری نامشخص';
        const bio = doctor.bio ?? 'بدون بیوگرافی';

        const doctorCard = `
          <div class="doctor-card bg-white p-3 mb-3 shadow rounded">
            <h5 class="mb-2">${fullName}</h5>
            <p><strong>تخصص:</strong> ${specialty}</p>
            <p><strong>تلفن:</strong> ${phone}</p>
            <p><strong>ایمیل:</strong> ${email}</p>
            <p><strong>آدرس:</strong> ${address}</p>
            <p><strong>ساعات کاری:</strong> ${workingHours}</p>
            <p><strong>بیو:</strong> ${bio}</p>
          </div>
        `;

        container.insertAdjacentHTML('beforeend', doctorCard);
      });
    } else {
      console.error('داده‌های دریافت شده آرایه نیستند');
    }
  } catch (error) {
    console.error('خطا:', error.message);
  }
});

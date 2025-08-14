document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:8000/api/doctors?per_page=24&sort_by=&sort_type=', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error('خطا در دریافت اطلاعات پزشکان: ' + response.status);

    const data = await response.json();
    console.log(data); // برای دیباگ

    const container = document.querySelector('.product-product');
    container.innerHTML = ''; // پاک کردن محتوای نمونه قبلی

    const doctors = data.result.data;
    const cardsPerRow = 4;
    let rowDiv = null;

    doctors.forEach((doctor, index) => {
      if (index % cardsPerRow === 0) {
        rowDiv = document.createElement('div');
        rowDiv.className = 'product-box d-flex row mb-5';
        container.appendChild(rowDiv);
      }

      const fullName = `${doctor.user.fname} ${doctor.user.lname}`;
      const specialty = doctor.specialty ?? 'تخصص مشخص نیست';
      const city = doctor.address?.split('،')[0] ?? 'نامشخص'; // مثلاً: "گرگان، ..."
      const bio = doctor.bio ?? 'بدون توضیحات';
      const cardHTML = `
        <div class="product-card col-lg-2">
          <div class="product-card-nav d-flex justify-content-between">
            <div class="product-card-nav-right d-flex">
              <div class="product-card-nav-right-photo">
                <img src="./assets/photos/Frame 1116606979 (1).svg" alt="">
              </div>
              <div class="product-card-nav-right-text">
                <h4>${fullName}</h4>
                <p>${specialty}</p>
              </div>
            </div>
            <div class="product-card-nav-left">
              <p>${city}</p>
            </div>
          </div>
          <div class="product-card-text">
            <p>${bio}</p>
          </div>
          <div class="product-card-btn">
            <a href="doctor.html?id=${doctor.id}">
              <button><img src="./assets/photos/direction-left.svg" alt=""></button>
            </a>
          </div>
        </div>
      `;

      rowDiv.insertAdjacentHTML('beforeend', cardHTML);
    });

  } catch (error) {
    console.error('خطا:', error);
  }
});

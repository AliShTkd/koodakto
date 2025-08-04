//تابع بارگذاری لیست محصولات
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:8000/api/products?per_page=20&sort_by&sort_type', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('خطا در دریافت محصولات: ' + response.status);
    }

    const data = await response.json();
    console.log(data); // برای دیباگ

    const container = document.querySelector('.products-page');
    container.innerHTML = ''; // پاک کردن محتوای قبلی

    if (Array.isArray(data.result.data)) {
      data.result.data.forEach(product => {
        const imageUrl = product.image ?? './assets/photos/16 1.svg'; // اگر تصویر نبود، از پیش‌فرض استفاده کن
        const description = product.description ?? 'بدون توضیحات';
        const rating = 4.5; // چون در API فعلاً نداریم، مقدار ثابت
        const price = Number(product.price).toLocaleString();
        const discount = (Number(product.price) * 0.8).toLocaleString(); // فرضی: 20٪ تخفیف

        const productHtml = `
          <div class="product-1-page col-12 col-sm-6 col-md-4 col-lg-3 bg-white">
            <div class="p-3">
              <a href="productPage.html?id=${product.id}">
                <div class="product-img w-100 text-center">
                  <img class="image-1 w-50" src="${imageUrl}" alt="">
                </div>
              </a>
              <div class="product-name d-flex justify-content-between align-items-center">
                <p class="product-text">${product.name}</p>
                <p class="product-star d-flex align-items-center">${rating}<img src="./assets/photos/Star 5.svg" alt=""></p>
              </div>
              <div class="product-category">
                <p class="product-category-p">${description}</p>
              </div>
              <div class="sales d-flex justify-content-between">
                <div class="right-sale d-flex justify-content-center align-items-center">
                  <a href="#"><img src="./assets/photos/bag-add.svg" alt=""></a>
                </div>
                <div class="left-sale">
                  <span class="price">${price} تومان</span>
                  <div>
                    <span class="price-takhfif">${discount}</span>
                    <span class="price-toman">تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        container.insertAdjacentHTML('beforeend', productHtml);
      });
    } else {
      console.error('داده‌ها آرایه نیستند:', data);
    }
  } catch (error) {
    console.error('خطا:', error);
  }
});


document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:8000/api/products', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const data = await response.json();
    const products = data.result.data;
    const container = document.getElementById('productList'); // div یا tbody

    products.forEach(product => {
      // اگر تصویر داشت، مسیر کامل رو بساز، در غیر این صورت عکس پیش‌فرض
      const imageUrl = product.image 
        ? `http://localhost:8000/storage/products/${product.image}` 
        : './assets/photos/16 1.svg';

      const productCard = document.createElement('div');
      productCard.classList.add('card', 'p-3', 'mb-3');
      productCard.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" class="card-img-top" style="max-height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${Number(product.price).toLocaleString()} تومان</p>
          <a href="product-details.html?id=${product.id}" class="btn btn-primary">مشاهده جزئیات</a>
        </div>
      `;
      container.appendChild(productCard);
    });
  } catch (error) {
    console.error('خطا:', error);
  }
});



document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products-page');
    const paginationContainer = document.querySelector('.pagination-container'); // یک المنت جدید برای دکمه‌های صفحه‌بندی اضافه کنید

    if (!productsContainer) {
        console.error('المنت کانتینر محصولات پیدا نشد');
        return;
    }

    // تابع اصلی برای دریافت و نمایش محصولات و صفحه‌بندی
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/products?per_page=5', {
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
            console.log('داده‌ها:', data); // دیباگ کل پاسخ

            renderProducts(data);
            renderPagination(data.links); // تابع جدید برای نمایش دکمه‌های صفحه‌بندی

        } catch (error) {
            console.error('خطا:', error);
            productsContainer.innerHTML = '<p>خطا در بارگذاری محصولات.</p>';
        }
    };

    // تابع برای نمایش محصولات
    const renderProducts = (data) => {
        productsContainer.innerHTML = ''; // پاک کردن محتوای قبلی

        if (data.result && Array.isArray(data.result.data)) {
            if (data.result.data.length === 0) {
                productsContainer.innerHTML = '<p>محصولی برای نمایش وجود ندارد.</p>';
                return;
            }

            data.result.data.forEach(product => {
                const imageUrl = product.image
                    ? `http://localhost:8000/storage/uploads/products/${product.image}`
                    : './assets/photos/16 1.svg';
                console.log(`محصول: ${product.name}, تصویر: ${imageUrl}`);

                const description = product.description ?? 'بدون توضیحات';
                const rating = 4.5;
                const price = Number(product.price).toLocaleString();
                const discount = (Number(product.price) * 0.8).toLocaleString();

                const productHtml = `
                    <div class="product-1-page col-12 col-sm-6 col-md-4 col-lg-3 bg-white">
                      <div class="p-3">
                        <a href="productPage.html?id=${product.id}">
                          <div class="product-img w-100 text-center">
                            <img class="image-1 w-50" src="${imageUrl}" alt="${product.name}" onerror="this.src='./assets/photos/16 1.svg'; console.log('عکس لود نشد، پیش‌فرض استفاده شد');">
                          </div>
                        </a>
                        <div class="product-name d-flex justify-content-between align-items-center">
                          <p class="product-text">${product.name}</p>
                          <p class="product-star d-flex align-items-center">${rating}<img src="./assets/photos/Star 5.svg" alt="ستاره"></p>
                        </div>
                        <div class="product-category">
                          <p class="product-category-p">${description}</p>
                        </div>
                        <div class="sales d-flex justify-content-between">
                          <div class="right-sale d-flex justify-content-center align-items-center">
                            <a href="#"><img src="./assets/photos/bag-add.svg" alt="افزودن به سبد"></a>
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
                productsContainer.insertAdjacentHTML('beforeend', productHtml);
            });
        } else {
            productsContainer.innerHTML = '<p>محصولی برای نمایش وجود ندارد.</p>';
            console.error('داده‌ها آرایه نیستند یا result.data وجود ندارد:', data);
        }
    };

    // تابع برای نمایش دکمه‌های صفحه‌بندی
    const renderPagination = (links) => {
        if (!paginationContainer || !links) {
            return;
        }

        paginationContainer.innerHTML = '';
        const ul = document.createElement('ul');
        ul.classList.add('pagination', 'justify-content-center');

        links.forEach(link => {
            const li = document.createElement('li');
            li.classList.add('page-item');
            if (link.active) {
                li.classList.add('active');
            }
            if (!link.url) {
                li.classList.add('disabled');
            }

            const a = document.createElement('a');
            a.classList.add('page-link');
            a.innerHTML = link.label
                .replace('&laquo; Previous', 'قبلی')
                .replace('Next &raquo;', 'بعدی');

            // اگر URL وجود داشت، به آن گوش کنید
            if (link.url) {
                a.href = '#'; // از لینک دهی پیش‌فرض جلوگیری می‌کنیم
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    fetchProducts(link.url);
                });
            }

            li.appendChild(a);
            ul.appendChild(li);
        });

        paginationContainer.appendChild(ul);
    };

    // شروع فرآیند با دریافت داده‌های صفحه اول
    fetchProducts('http://localhost:8000/api/products?per_page=5');
});
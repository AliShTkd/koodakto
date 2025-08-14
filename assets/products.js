document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products-page');
    const paginationContainer = document.querySelector('.pagination-container');

    if (!productsContainer) {
        console.error('المنت کانتینر محصولات پیدا نشد');
        return;
    }

    // تابع اصلی برای دریافت و نمایش محصولات و صفحه‌بندی
    const fetchProducts = async (url = 'http://localhost:8000/api/products?per_page=20') => {
        try {
            const response = await fetch(url, {
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
            
            // ساختار پاسخ API شما به این شکل است: { result: { data: [], links: [] } }
            // پس باید از data.result.data و data.result.links استفاده کنیم
            if (data.result) {
                renderProducts(data.result.data);
                renderPagination(data.result.links);
            } else {
                 throw new Error('ساختار پاسخ API نامعتبر است.');
            }

        } catch (error) {
            console.error('خطا:', error);
            productsContainer.innerHTML = '<p class="text-center w-100">خطا در بارگذاری محصولات.</p>';
        }
    };

    // تابع برای نمایش محصولات
    const renderProducts = (products) => {
        productsContainer.innerHTML = ''; // پاک کردن محتوای قبلی

        if (!products || products.length === 0) {
            productsContainer.innerHTML = '<p class="text-center w-100">محصولی برای نمایش وجود ندارد.</p>';
            return;
        }

        products.forEach(product => {
            // ====================================================================
            // START: منطق هوشمند برای نمایش عکس
            // ====================================================================
            // ابتدا چک می‌کنیم آیا محصول اصلاً عکس دارد (فیلد image آن null نیست؟)
            // اگر عکس داشت، از آدرس کاملی که بک‌اند می‌دهد (image_url) استفاده می‌کنیم.
            // اگر نداشت، مستقیماً از عکس پیش‌فرض خودمان در فرانت‌اند استفاده می‌کنیم.
            const imageUrl = product.image 
                ? product.image_url 
                : './assets/photos/16 1.svg';
            // ====================================================================
            // END: منطق هوشمند
            // ====================================================================

            const description = product.description ?? 'بدون توضیحات';
            const rating = 4.5; // مقدار پیش‌فرض
            const price = Number(product.price).toLocaleString('fa-IR');
            // فرض می‌کنیم فیلد off در API وجود دارد، در غیر این صورت قیمت اصلی نمایش داده می‌شود
            const finalPrice = product.off ? (Number(product.price) - Number(product.off)).toLocaleString('fa-IR') : price;

            const productHtml = `
                <div class="product-1-page col-12 col-sm-6 col-md-4 col-lg-3 bg-white mb-4">
                  <div class="p-3">
                    <a href="productPage.html?id=${product.id}">
                      <div class="product-img w-100 text-center">
                        <img class="image-1 w-50" src="${imageUrl}" alt="${product.name}" onerror="this.src='./assets/photos/16 1.svg';">
                      </div>
                    </a>
                    <div class="product-name d-flex justify-content-between align-items-center">
                      <p class="product-text">${product.name}</p>
                      <p class="product-star d-flex align-items-center">${rating}<img src="./assets/photos/Star 5.svg" alt="ستاره"></p>
                    </div>
                    <div class="product-category">
                      <p class="product-category-p">${description}</p>
                    </div>
                    <div class="sales d-flex justify-content-between align-items-end">
                      <div class="right-sale d-flex justify-content-center align-items-center">
                        <a href="#"><img src="./assets/photos/bag-add.svg" alt="افزودن به سبد"></a>
                      </div>
                      <div class="left-sale text-start">
                         <span class="price-toman">تومان</span>
                         <span class="price-takhfif">${finalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
            `;
            productsContainer.insertAdjacentHTML('beforeend', productHtml);
        });
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

            if (link.url) {
                a.href = '#';
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    // برای صفحه‌بندی، تابع fetchProducts را با URL جدید فراخوانی می‌کنیم
                    fetchProducts(link.url);
                });
            }

            li.appendChild(a);
            ul.appendChild(li);
        });

        paginationContainer.appendChild(ul);
    };

    // شروع فرآیند با دریافت داده‌های صفحه اول
    fetchProducts();
});
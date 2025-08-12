document.addEventListener('DOMContentLoaded', () => {
    // آدرس API شما
    const API_BASE_URL = 'http://localhost:8000/api/products';
    const PER_PAGE = 20;

    // انتخاب المنت‌های مورد نیاز از DOM
    const searchInput = document.querySelector('.input-1');
    const productsContainer = document.querySelector('.products-page');
    const paginationContainer = document.querySelector('.pagination-container');

    // متغیر برای ذخیره همه محصولات و لینک‌های صفحه‌بندی
    let allProducts = [];
    let currentPaginationLinks = [];
    let currentURL = `${API_BASE_URL}?per_page=${PER_PAGE}`;

    // تابع برای ساخت و نمایش المنت محصول
    function createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.className = 'product-1-page col-12 col-sm-6 col-md-4 col-lg-3 bg-white mb-4';

        // منطق هوشمند برای نمایش عکس
        const imageUrl = product.image
            ? product.image_url
            : './assets/photos/16 1.svg';

        const description = product.description ?? 'بدون توضیحات';
        const rating = product.stars ?? '4.5';
        const price = Number(product.price).toLocaleString('fa-IR');
        const finalPrice = product.off ? (Number(product.price) - Number(product.off)).toLocaleString('fa-IR') : price;

        productElement.innerHTML = `
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
        `;

        return productElement;
    }

    // تابع برای نمایش محصولات در صفحه
    function renderProducts(products) {
        if (!productsContainer) return;
        productsContainer.innerHTML = '';

        if (products.length === 0) {
            productsContainer.innerHTML = '<p class="text-center w-100 mt-5">محصولی با این مشخصات پیدا نشد.</p>';
        } else {
            products.forEach(product => {
                const productElement = createProductElement(product);
                productsContainer.appendChild(productElement);
            });
        }
    }

    // تابع برای نمایش دکمه‌های صفحه‌بندی
    function renderPagination(links) {
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

                    const newUrl = new URL(link.url);
                    newUrl.searchParams.set('per_page', PER_PAGE);

                    currentURL = newUrl.toString();
                    fetchProducts(currentURL);
                });
            }

            li.appendChild(a);
            ul.appendChild(li);
        });

        paginationContainer.appendChild(ul);
    }


    // تابع برای فیلتر کردن محصولات
    function filterProducts() {
        if (!searchInput) return;
        const searchTerm = searchInput.value.trim();

        // اگر چیزی در سرچ باکس نبود، لیست کامل را با صفحه‌بندی نمایش بده
        if (!searchTerm) {
            renderProducts(allProducts);
            renderPagination(currentPaginationLinks);
            return;
        }
        
        // هنگام جستجو، صفحه‌بندی را مخفی کن
        if (paginationContainer) {
            paginationContainer.innerHTML = '';
        }

        const regex = new RegExp(searchTerm, 'i');

        const filteredProducts = allProducts.filter(product => {
            return product.name && regex.test(product.name);
        });

        renderProducts(filteredProducts);
    }


    // تابع برای دریافت محصولات از API
    async function fetchProducts(url = currentURL) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`خطا در دریافت محصولات: ${response.status}`);
            }

            const data = await response.json();

            if (data.result && Array.isArray(data.result.data)) {
                allProducts = data.result.data;
                currentPaginationLinks = data.result.links;
                renderProducts(allProducts);
                renderPagination(currentPaginationLinks);
            } else {
                console.error('ساختار داده API نامعتبر است:', data);
                if (productsContainer) {
                    productsContainer.innerHTML = '<p class="text-center w-100 mt-5">ساختار داده‌های دریافتی از سرور نامعتبر است.</p>';
                }
            }

        } catch (error) {
            console.error('خطا در دریافت محصولات:', error);
            if (productsContainer) {
                productsContainer.innerHTML = '<p class="text-center w-100 mt-5">در حال حاضر مشکلی در دریافت اطلاعات وجود دارد.</p>';
            }
        }
    }


    // فراخوانی اولیه تابع دریافت محصولات هنگام بارگذاری صفحه
    fetchProducts();

    // اضافه کردن event listener به اینپوت جستجو
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
});

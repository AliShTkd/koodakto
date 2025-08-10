// آدرس API شما
const API_BASE_URL = 'http://localhost:8000/api/products';
const PER_PAGE = 20; // مقدار مورد نظر شما

// انتخاب المنت‌های مورد نیاز از DOM
const searchInput = document.querySelector('.input-1');
const productsContainer = document.querySelector('.products-page');
const paginationContainer = document.querySelector('.pagination-container');

// متغیر برای ذخیره همه محصولات و لینک‌های صفحه‌بندی
let allProducts = [];
let currentPaginationLinks = [];
let currentURL = `${API_BASE_URL}?per_page=${PER_PAGE}`;

// تابع برای ساخت و نمایش المنت محصول (بدون تغییر)
function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product-1-page col-12 col-sm-6 col-md-4 col-lg-3 bg-white mb-4';

    const imageUrl = product.image
        ? `http://localhost:8000/storage/uploads/products/${product.image}`
        : './assets/photos/16 1.svg';

    const description = product.description ?? 'بدون توضیحات';
    const rating = product.stars ?? '4.5';
    const price = Number(product.price).toLocaleString('fa-IR');
    const discountPrice = product.off ? (Number(product.price) - Number(product.off)).toLocaleString('fa-IR') : (Number(product.price)).toLocaleString('fa-IR');
    
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
                    <span class="price-takhfif">${discountPrice}</span>
                    <div>
                        <span class="price">${price}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    return productElement;
}

// تابع برای نمایش محصولات در صفحه (بدون تغییر)
function renderProducts(products) {
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

// تابع برای نمایش دکمه‌های صفحه‌بندی (تغییر یافته)
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
                
                // --- بخش تغییر یافته ---
                // URL فعلی را دریافت کنید.
                const newUrl = new URL(link.url);
                
                // پارامتر per_page را به آن اضافه یا جایگزین کنید.
                newUrl.searchParams.set('per_page', PER_PAGE);

                // URL جدید را برای فراخوانی API استفاده کنید.
                currentURL = newUrl.toString();
                fetchProducts(currentURL);
                // --- پایان بخش تغییر یافته ---
            });
        }

        li.appendChild(a);
        ul.appendChild(li);
    });

    paginationContainer.appendChild(ul);
}


// تابع برای فیلتر کردن محصولات (بدون تغییر)
function filterProducts() {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        renderProducts(allProducts);
        renderPagination(currentPaginationLinks);
        return;
    }
    
    if (paginationContainer) {
        paginationContainer.innerHTML = '';
    }

    const regex = new RegExp(searchTerm, 'i');

    const filteredProducts = allProducts.filter(product => {
        return product.name && regex.test(product.name);
    });

    renderProducts(filteredProducts);
}


// تابع برای دریافت محصولات از API (بدون تغییر)
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
            productsContainer.innerHTML = '<p class="text-center w-100 mt-5">ساختار داده‌های دریافتی از سرور نامعتبر است.</p>';
        }

    } catch (error) {
        console.error('خطا در دریافت محصولات:', error);
        productsContainer.innerHTML = '<p class="text-center w-100 mt-5">در حال حاضر مشکلی در دریافت اطلاعات وجود دارد.</p>';
    }
}


// فراخوانی اولیه تابع دریافت محصولات هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

// اضافه کردن event listener به اینپوت جستجو
searchInput.addEventListener('input', filterProducts);
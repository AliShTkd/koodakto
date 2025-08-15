document.addEventListener('DOMContentLoaded', async () => {
    // ====================================================================
    // بخش ۱: دریافت و نمایش آیتم‌های سبد خرید
    // ====================================================================
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (!cartItemsContainer || !totalPriceElement) {
        console.error('المنت‌های ضروری سبد خرید در صفحه پیدا نشدند.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/carts/get', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('خطا در دریافت سبد خرید: ' + response.status);
        }

        const data = await response.json();
        cartItemsContainer.innerHTML = ''; // پاک‌سازی قبل از اضافه کردن آیتم‌ها
        let total = 0;

        if (data.result && Array.isArray(data.result) && data.result.length > 0) {
            data.result.forEach(item => {
                const product = item.product;
                const quantity = parseInt(item.quantity);
                const price = parseInt(product.price);
                const itemTotal = quantity * price;
                total += itemTotal;

                const imageUrl = product.image 
                    ? `http://localhost:8000/storage/${product.image}` 
                    : 'assets/photos/16 1.svg';

                const itemHTML = `
                  <div class="card mb-3">
                    <div class="card-body d-flex align-items-center gap-3">
                      <img src="${imageUrl}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover;" onerror="this.src='assets/photos/16 1.svg';">
                      <div>
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">تعداد: ${quantity}</p>
                        <p class="card-text">قیمت واحد: ${price.toLocaleString('fa-IR')} تومان</p>
                        <p class="card-text fw-bold">قیمت کل: ${itemTotal.toLocaleString('fa-IR')} تومان</p>
                      </div>
                    </div>
                  </div>
                `;
                cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            });

            totalPriceElement.textContent = total.toLocaleString('fa-IR') + ' تومان';
        } else {
            cartItemsContainer.innerHTML = '<p class="text-center text-muted">سبد خرید شما خالی است.</p>';
            totalPriceElement.textContent = '0 تومان';
        }
    } catch (error) {
        console.error('خطا در واکشی سبد خرید:', error);
        cartItemsContainer.innerHTML = '<p class="text-center text-danger">خطا در بارگذاری سبد خرید.</p>';
    }

    // ====================================================================
    // بخش ۲: مدیریت رویداد کلیک دکمه "تایید و ادامه خرید"
    // ====================================================================
    const submitButton = document.querySelector('.btn-basket');

    if (submitButton) {
        submitButton.addEventListener('click', async () => {
            try {
                // *** تغییر کلیدی: آدرس API اصلاح شد ***
                const response = await fetch('http://localhost:8000/api/orders', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'خطا در ثبت سفارش');
                }

                alert('سفارش شما با موفقیت ثبت شد!');
                // نام فایل را به orderDetails.html تغییر دادم
                window.location.href = `orderDetails.html?id=${data.order_id}`;

            } catch (error) {
                console.error('خطا:', error);
                alert(`خطا: ${error.message}`);
            }
        });
    }
});
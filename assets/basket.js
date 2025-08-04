

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:8000/api/carts/get', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    if (!response.ok) {
      throw new Error('خطا در دریافت سبد خرید: ' + response.status);
    }

    const data = await response.json();
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = ''; // پاک‌سازی قبل از اضافه کردن آیتم‌ها

    let total = 0;

    if (Array.isArray(data.result)) {
      data.result.forEach(item => {
        const product = item.product;
        const quantity = parseInt(item.quantity);
        const price = parseInt(product.price);
        const itemTotal = quantity * price;
        total += itemTotal;

        const itemHTML = `
          <div class="card mb-3">
            <div class="card-body d-flex align-items-center gap-3">
              <img src="assets/photos/16 1.svg" alt="محصول" style="width: 80px; height: 80px; object-fit: cover;">
              <div>
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">تعداد: ${quantity}</p>
                <p class="card-text">قیمت واحد: ${price.toLocaleString()} تومان</p>
                <p class="card-text fw-bold">قیمت کل: ${itemTotal.toLocaleString()} تومان</p>
              </div>
            </div>
          </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
      });

      totalPriceElement.textContent = total.toLocaleString() + ' تومان';
    } else {
      console.error('ساختار داده دریافتی نادرست است:', data);
    }
  } catch (error) {
    console.error('خطا در واکشی سبد خرید:', error);
  }
});
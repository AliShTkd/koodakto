document.addEventListener("DOMContentLoaded" , function(){

let products = document.querySelector(".products");
let product = document.querySelectorAll(".product");
let nextsBtn = document.getElementById("nexts");
let prevsBtn = document.getElementById("prevs");

let productWidth = product[0].offsetWidth;
let currentproduct = 0;
let totalProducts = product.length;
let visibleproduct = 3;

function updateproduct() {
    let offset = -currentproduct * productWidth;
    products.style.transform = `translateX(${-offset}px)`;

    prevsBtn.disabled = currentproduct === 0;
    nextsBtn.disabled = currentproduct + visibleproduct >= totalProducts;
}

nextsBtn.addEventListener("click", function () {
  if (currentproduct > 0) {
    currentproduct--;
    updateproduct();
    }
});

prevsBtn.addEventListener("click", function () {
  if (currentproduct + visibleproduct < totalProducts) {
    currentproduct++;
    updateproduct();
    }
});


});

document.addEventListener('DOMContentLoaded', () => {
    // تابع اصلی برای دریافت و نمایش محصول و مدیریت تمام رویدادها
    const initializeProductPage = async () => {
        // --- بخش ۱: دریافت اطلاعات محصول از API ---
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            document.body.innerHTML = '<p class="text-center mt-5">شناسه محصول پیدا نشد.</p>';
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/products/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error('محصول مورد نظر یافت نشد.');

            const data = await response.json();
            const product = data.result;

            // --- بخش ۲: نمایش اطلاعات در صفحه ---
            document.querySelector('.detail-p-e').innerText = product.name;
            const imageUrl = product.image ? product.image_url : './assets/photos/16 1.svg';
            document.querySelector('.product-img-e-1').src = imageUrl;

            // --- بخش ۳: مدیریت منطق تعداد و قیمت ---
            const plusBtn = document.querySelector('.number-product a:nth-child(3)');
            const minusBtn = document.querySelector('.number-product a:nth-child(1)');
            const quantityElement = document.querySelector('.number-p');
            const priceElement = document.querySelector('.gheymat-p-1');
            const addToCartBtn = document.querySelector('.basket'); // دکمه افزودن به سبد

            const basePrice = Number(product.price);
            let currentQuantity = 1;

            function updatePriceDisplay() {
                const totalPrice = basePrice * currentQuantity;
                priceElement.textContent = totalPrice.toLocaleString('fa-IR') + ' تومان';
                quantityElement.textContent = currentQuantity;
            }

            plusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentQuantity++;
                updatePriceDisplay();
            });

            minusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentQuantity > 1) {
                    currentQuantity--;
                    updatePriceDisplay();
                }
            });

            updatePriceDisplay(); // نمایش قیمت اولیه

            // ====================================================================
            // START: منطق اصلاح شده "افزودن به سبد خرید"
            // ====================================================================
            addToCartBtn.addEventListener('click', async (e) => {
                e.preventDefault();

                // ما دیگر نیازی به خواندن اطلاعات از صفحه نداریم!
                // از متغیرهای product و currentQuantity که در دسترس هستند استفاده می‌کنیم.
                const productId = product.id;
                const quantity = currentQuantity;

                try {
                    const cartResponse = await fetch('http://localhost:8000/api/carts/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            product_id: productId,
                            quantity: quantity
                            // نکته: بهتر است قیمت در بک‌اند محاسبه شود، پس آن را ارسال نمی‌کنیم
                        })
                    });

                    const cartData = await cartResponse.json();

                    if (!cartResponse.ok) {
                        // اگر سرور خطای اعتبارسنجی برگرداند، آن را نمایش بده
                        if (cartData.errors) {
                            const errorMessages = Object.values(cartData.errors).flat().join('\n');
                            throw new Error(errorMessages);
                        }
                        throw new Error(cartData.message || 'خطا در افزودن به سبد خرید');
                    }
                    
                    alert('محصول با موفقیت به سبد خرید افزوده شد!');
                    window.location.href = 'basket.html'; // انتقال به صفحه سبد خرید

                } catch (error) {
                    console.error('خطا در افزودن به سبد خرید:', error);
                    alert(`افزودن به سبد خرید با خطا مواجه شد:\n${error.message}`);
                }
            });
            // ====================================================================
            // END: منطق اصلاح شده
            // ====================================================================

        } catch (err) {
            console.error('خطا در دریافت محصول:', err);
            document.body.innerHTML = `<p class="text-center mt-5">${err.message}</p>`;
        }
    };

    initializeProductPage();
});


//جدید تر
// document.addEventListener('DOMContentLoaded', () => {
//   const addToCartBtn = document.querySelector('.basket');

//   addToCartBtn.addEventListener('click', function (e) {
//     e.preventDefault();

//     const productId = new URLSearchParams(window.location.search).get('id');
//     const quantity = parseInt(document.querySelector('.number-p').textContent);
//     const priceText = document.querySelector('.gheymat-p-1').textContent.replace(/,/g, '').replace('تومان', '').trim();
//     const totalPrice = parseInt(priceText);

//     if (!productId || isNaN(quantity) || isNaN(totalPrice)) {
//       alert('مشکلی در دریافت اطلاعات محصول پیش آمده');
//       return;
//     }

//     fetch('http://localhost:8000/api/carts/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       },
//       body: JSON.stringify({
//         product_id: productId,
//         quantity: quantity,
//         total_price: totalPrice
//       })
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('خطا در افزودن به سبد خرید: ' + response.status);
//         }
//         return response.json();
//       })
//       .then(data => {
//         alert('محصول با موفقیت به سبد خرید افزوده شد!');
//         window.location.href = 'basket.html'; // انتقال به سبد خرید
//       })
//       .catch(error => {
//         console.error('خطا در افزودن به سبد خرید:', error);
//         alert('افزودن به سبد خرید با خطا مواجه شد.');
//       });
//   });
// });




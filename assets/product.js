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

document.addEventListener('DOMContentLoaded', function () {
    const plusBtn = document.querySelector('.number-product a:nth-child(3)');
    const minusBtn = document.querySelector('.number-product a:nth-child(1)');
    const quantity = document.querySelector('.number-p');
    const priceElement = document.querySelector('.gheymat-p-1');

    // استخراج قیمت پایه از HTML و حذف کاما و "تومان"
    const basePrice = parseInt(priceElement.textContent.replace(/,/g, '').replace('تومان', '').trim());

    function updatePriceDisplay(count) {
        const totalPrice = basePrice * count;
        priceElement.textContent = totalPrice.toLocaleString('en-US') + ' تومان';
    }

    plusBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let currentQuantity = parseInt(quantity.textContent);
        currentQuantity += 1;
        quantity.textContent = currentQuantity;
        updatePriceDisplay(currentQuantity);
    });

    minusBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let currentQuantity = parseInt(quantity.textContent);
        if (currentQuantity > 1) {
            currentQuantity -= 1;
            quantity.textContent = currentQuantity;
            updatePriceDisplay(currentQuantity);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  //if (!id) return alert('شناسه محصول پیدا نشد');

  fetch(`http://localhost:8000/api/products/${id}`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(data => {
      const product = data.result;

      document.querySelector('.detail-p-e').innerText = product.name;
      document.querySelector('.gheymat-p-1').innerText = product.price + ' تومان';
      document.querySelector('.product-img-e-1').src = product.image || './assets/photos/16 1.svg';

      // اگر ویژگی‌هات از سمت بک‌اند میاد، اینجا اضافه کن
    })
    .catch(err => console.error('خطا در دریافت محصول:', err));
});


//قدیمی
// document.querySelector('.basket').addEventListener('click', function () {
//   const productId = new URLSearchParams(window.location.search).get('id');
//   const quantity = parseInt(document.querySelector('.number-p').textContent);
//   const price = parseInt(document.querySelector('.gheymat-p-1').textContent.replace(/,/g, ''));

//   const product = {
//     id: productId,
//     quantity,
//     price,
//   };

//   // گرفتن سبد قبلی
//   let cart = JSON.parse(localStorage.getItem('cart')) || [];

//   // بررسی اینکه محصول وجود دارد یا نه
//   const existing = cart.find(p => p.id === productId);
//   if (existing) {
//     existing.quantity += quantity;
//   } else {
//     cart.push(product);
//   }

//   localStorage.setItem('cart', JSON.stringify(cart));
// });



//جدید
// document.querySelector('.basket').addEventListener('click', function () {
//   const paramsID = new URLSearchParams(window.location.search);
//   const productId = paramsID.get('id');
//   const quantity = parseInt(document.querySelector('.number-p').textContent);
//   const price = parseInt(document.querySelector('.gheymat-p-1').textContent.replace(/,/g, ''));
//   const token = localStorage.getItem('token'); // اطمینان از وجود توکن

//    if (!productId) return alert('شناسه محصول پیدا نشد');

  
//   const payload = {
//     product_id: productId,
//     quantity: quantity,
//     total_price: price
//   };

//   fetch('http://localhost:8000/api/carts/add', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + token,
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(payload)
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('خطا در افزودن محصول به سبد خرید');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('محصول با موفقیت اضافه شد:', data);
//     alert('محصول به سبد خرید اضافه شد.');
//   })
//   .catch(error => {
//     console.error('خطا:', error);
//     alert('خطا در افزودن به سبد خرید');
//   });
// });

//جدید تر
document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtn = document.querySelector('.basket');

  addToCartBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const productId = new URLSearchParams(window.location.search).get('id');
    const quantity = parseInt(document.querySelector('.number-p').textContent);
    const priceText = document.querySelector('.gheymat-p-1').textContent.replace(/,/g, '').replace('تومان', '').trim();
    const totalPrice = parseInt(priceText);

    if (!productId || isNaN(quantity) || isNaN(totalPrice)) {
      alert('مشکلی در دریافت اطلاعات محصول پیش آمده');
      return;
    }

    fetch('http://localhost:8000/api/carts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity,
        total_price: totalPrice
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('خطا در افزودن به سبد خرید: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        alert('محصول با موفقیت به سبد خرید افزوده شد!');
        window.location.href = 'basket.html'; // انتقال به سبد خرید
      })
      .catch(error => {
        console.error('خطا در افزودن به سبد خرید:', error);
        alert('افزودن به سبد خرید با خطا مواجه شد.');
      });
  });
});




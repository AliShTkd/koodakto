// // document.addEventListener('DOMContentLoaded', () => {
// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.querySelector('.products-page');
//   const pagination = document.getElementById('pagination');
//   const perPage = 16; // تعداد محصول در هر صفحه

//   async function loadProducts(page = 1) {
//     try {
//       const response = await fetch(`http://localhost:8000/api/products?per_page=${perPage}&page=${page}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': 'Bearer ' + localStorage.getItem('token'),
//           'Accept': 'application/json'
//         }
//       });

//       if (!response.ok) throw new Error('خطا در دریافت محصولات: ' + response.status);

//       const data = await response.json();

//       // پاک کردن محصولات قبلی
//       container.innerHTML = '';

//       // نمایش محصولات جدید
//       if (Array.isArray(data.result.data)) {
//         data.result.data.forEach(product => {
//           const imageUrl = product.image
//             ? `http://localhost:8000/storage/products/${product.image}`
//             : './assets/photos/16 1.svg';
//           const description = product.description ?? 'بدون توضیحات';
//           const rating = 4.5; // اگر API نداره مقدار ثابت
//           const price = Number(product.price).toLocaleString();
//           const discount = (Number(product.price) * 0.8).toLocaleString();

//           const productHtml = `
//             <div class="product-1-page col-12 col-sm-6 col-md-4 col-lg-3 bg-white">
//               <div class="p-3">
//                 <a href="productPage.html?id=${product.id}">
//                   <div class="product-img w-100 text-center">
//                     <img class="image-1 w-50" src="${imageUrl}" alt="${product.name}">
//                   </div>
//                 </a>
//                 <div class="product-name d-flex justify-content-between align-items-center">
//                   <p class="product-text">${product.name}</p>
//                   <p class="product-star d-flex align-items-center">${rating}<img src="./assets/photos/Star 5.svg" alt=""></p>
//                 </div>
//                 <div class="product-category">
//                   <p class="product-category-p">${description}</p>
//                 </div>
//                 <div class="sales d-flex justify-content-between">
//                   <div class="right-sale d-flex justify-content-center align-items-center">
//                     <a href="#"><img src="./assets/photos/bag-add.svg" alt=""></a>
//                   </div>
//                   <div class="left-sale">
//                     <span class="price">${price} تومان</span>
//                     <div>
//                       <span class="price-takhfif">${discount}</span>
//                       <span class="price-toman">تومان</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           `;
//           container.insertAdjacentHTML('beforeend', productHtml);
//         });
//       } else {
//         container.innerHTML = '<p>هیچ محصولی یافت نشد.</p>';
//       }

//       // ساخت دکمه‌های صفحه‌بندی
//       renderPagination(data.result.current_page, data.result.last_page);
//     } catch (error) {
//       console.error('خطا:', error);
//       container.innerHTML = '<p>خطا در بارگذاری محصولات.</p>';
//     }
//   }

//   function renderPagination(currentPage, totalPages) {
//     pagination.innerHTML = '';

//     // دکمه قبلی
//     const prevLi = document.createElement('li');
//     prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
//     prevLi.innerHTML = `<a class="page-link" href="#">«</a>`;
//     prevLi.addEventListener('click', e => {
//       e.preventDefault();
//       if (currentPage > 1) loadProducts(currentPage - 1);
//     });
//     pagination.appendChild(prevLi);

//     // دکمه‌های شماره صفحات
//     for (let i = 1; i <= totalPages; i++) {
//       const li = document.createElement('li');
//       li.className = `page-item ${i === currentPage ? 'active' : ''}`;

//       const a = document.createElement('a');
//       a.className = 'page-link';
//       a.href = '#';
//       a.innerText = i;

//       a.addEventListener('click', e => {
//         e.preventDefault();
//         loadProducts(i);
//       });

//       li.appendChild(a); 
//       pagination.appendChild(li);
//     }

//     // دکمه بعدی
//     const nextLi = document.createElement('li');
//     nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
//     nextLi.innerHTML = `<a class="page-link" href="#">»</a>`;
//     nextLi.addEventListener('click', e => {
//       e.preventDefault();
//       if (currentPage < totalPages) loadProducts(currentPage + 1);
//     });
//     pagination.appendChild(nextLi);
//   }

//   // لود اولیه محصولات صفحه 1
//   loadProducts();
// });






  // document.addEventListener("DOMContentLoaded", () => {
  //   document.querySelectorAll('.faq-item').forEach(item => {
  //     item.addEventListener('click', () => {
  //       const answer = item.querySelector('.faq-answer');
  //       if (!answer) return;
  //       answer.classList.toggle('active');
  //     });
  //   });
  // });




//علی 
// document.addEventListener('DOMContentLoaded', async () => {
//   const container = document.querySelector('.products-page');
//   const pagination = document.getElementById('pagination');
//   const perPage = 16; // تعداد محصول در هر صفحه

//   async function loadProducts(page = 1) {
//     try {
//       const response = await fetch(`http://localhost:8000/api/products?per_page=${perPage}&page=${page}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': 'Bearer ' + localStorage.getItem('token'),
//           'Accept': 'application/json'
//         }
//       });

//       if (!response.ok) throw new Error('خطا در دریافت محصولات: ' + response.status);

//       const data = await response.json();

//       // پاک کردن محصولات قبلی
//       container.innerHTML = '';

//       // نمایش محصولات جدید
//       if (Array.isArray(data.result.data)) {
//         data.result.data.forEach(product => {
//           const imageUrl = product.image
//             ? `http://localhost:8000/storage/products/${product.image}`
//             : './assets/photos/16 1.svg';
//           const description = product.description ?? 'بدون توضیحات';
//           const rating = 4.5; // اگر API نداره مقدار ثابت
//           const price = Number(product.price).toLocaleString();
//           const discount = (Number(product.price) * 0.8).toLocaleString();

//           const productHtml = `
//             <div class="product-1-page col-12 col-sm-6 col-md-4 col-lg-3 bg-white">
//               <div class="p-3">
//                 <a href="productPage.html?id=${product.id}">
//                   <div class="product-img w-100 text-center">
//                     <img class="image-1 w-50" src="${imageUrl}" alt="${product.name}">
//                   </div>
//                 </a>
//                 <div class="product-name d-flex justify-content-between align-items-center">
//                   <p class="product-text">${product.name}</p>
//                   <p class="product-star d-flex align-items-center">${rating}<img src="./assets/photos/Star 5.svg" alt=""></p>
//                 </div>
//                 <div class="product-category">
//                   <p class="product-category-p">${description}</p>
//                 </div>
//                 <div class="sales d-flex justify-content-between">
//                   <div class="right-sale d-flex justify-content-center align-items-center">
//                     <a href="#"><img src="./assets/photos/bag-add.svg" alt=""></a>
//                   </div>
//                   <div class="left-sale">
//                     <span class="price">${price} تومان</span>
//                     <div>
//                       <span class="price-takhfif">${discount}</span>
//                       <span class="price-toman">تومان</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           `;
//           container.insertAdjacentHTML('beforeend', productHtml);
//         });
//       } else {
//         container.innerHTML = '<p>هیچ محصولی یافت نشد.</p>';
//       }

//       // ساخت دکمه‌های صفحه‌بندی
//       renderPagination(data.result.current_page, data.result.last_page);
//     } catch (error) {
//       console.error('خطا:', error);
//       container.innerHTML = '<p>خطا در بارگذاری محصولات.</p>';
//     }
//   }

//   function renderPagination(currentPage, totalPages) {
//     pagination.innerHTML = '';

//     // دکمه قبلی
//     const prevLi = document.createElement('li');
//     prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
//     prevLi.innerHTML = `<a class="page-link" href="#">«</a>`;
//     prevLi.addEventListener('click', e => {
//       e.preventDefault();
//       if (currentPage > 1) loadProducts(currentPage - 1);
//     });
//     pagination.appendChild(prevLi);

//     // دکمه‌های شماره صفحات
//     for (let i = 1; i <= totalPages; i++) {
//       const li = document.createElement('li');
//       li.className = `page-item ${i === currentPage ? 'active' : ''}`;

//       const a = document.createElement('a');
//       a.className = 'page-link';
//       a.href = '#';
//       a.innerText = i;

//       a.addEventListener('click', e => {
//         e.preventDefault();
//         loadProducts(i);
//       });

//       li.appendChild(a); 
//       pagination.appendChild(li);
//     }

//     // دکمه بعدی
//     const nextLi = document.createElement('li');
//     nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
//     nextLi.innerHTML = `<a class="page-link" href="#">»</a>`;
//     nextLi.addEventListener('click', e => {
//       e.preventDefault();
//       if (currentPage < totalPages) loadProducts(currentPage + 1);
//     });
//     pagination.appendChild(nextLi);
//   }

//   // لود اولیه محصولات صفحه 1
//   loadProducts();
// });



//علی 
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.products-page');
  if (!container) {
    console.error('المنت کانتینر پیدا نشد');
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/api/products?per_page=20', {
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

    container.innerHTML = ''; // پاک کردن محتوای قبلی

    if (data.result && Array.isArray(data.result.data)) {
      data.result.data.forEach(product => {
        // دیباگ مسیر تصویر
        const imageUrl = product.image
          ? `http://localhost:8000/storage/uploads/products/${product.image}` // مسیر بک‌اند
          : './assets/photos/16 1.svg'; // عکس پیش‌فرض
        console.log(`محصول: ${product.name}, تصویر: ${imageUrl}`); // چک کردن مسیر

        const description = product.description ?? 'بدون توضیحات';
        const rating = 4.5; // مقدار ثابت
        const price = Number(product.price).toLocaleString();
        const discount = (Number(product.price) * 0.8).toLocaleString(); // 20٪ تخفیف فرضی

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

        container.insertAdjacentHTML('beforeend', productHtml);
      });
    } else {
      container.innerHTML = '<p>محصولی برای نمایش وجود ندارد.</p>';
      console.error('داده‌ها آرایه نیستند یا result.data وجود ندارد:', data);
    }
  } catch (error) {
    console.error('خطا:', error);
    container.innerHTML = '<p>خطا در بارگذاری محصولات.</p>';
  }
});

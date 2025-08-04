// تابع بارگذاری لیست کاربران
// function loadUserList() {
//     fetch('http://localhost:8000/api/users?per_page=15&sort_by&sort_type', {
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('خطا در دریافت داده‌ها: ' + response.status);
//         }
//         return response.json();
//       })
//       .then(data => {
//         const userList = document.getElementById('userList');
//         userList.innerHTML = ''; // پاک کردن محتوای قبلی
  
//         if (Array.isArray(data.result.data)) {
//           data.result.data.forEach(user => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//               <td>${user.id || 'N/A'}</td>
//               <td>${user.fname+ ' ' + user.lname || 'N/A'}</td>
//               <td>${user.email || 'N/A'}</td>
//               <td>${user.group.name || 'بدون گروه'}</td>
//             `;
//             userList.appendChild(row);
//           });
//         } else {
//           console.error('داده‌ها آرایه نیستند:', data);
//         }
//       })
//       .catch(error => console.error('خطا:', error));
//   }
  
//   // فراخوانی در بارگذاری اولیه صفحه
//   document.addEventListener('DOMContentLoaded', () => {
//     loadUserList();
//   });
  

// تابع بارگذاری لیست کاربران با async و await
async function loadUserList() {
    try {
        const response = await fetch('http://localhost:8000/api/users?per_page=15&sort_by&sort_type', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (!response.ok) {
            throw new Error('خطا در دریافت داده‌ها: ' + response.status);
        }

        const data = await response.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // پاک کردن محتوای قبلی

        if (Array.isArray(data.result.data)) {
            data.result.data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id || 'N/A'}</td>
                    <td>${user.fname + ' ' + user.lname || 'N/A'}</td>
                    <td>${user.email || 'N/A'}</td>
                    <td>${user.group.name || 'بدون گروه'}</td>
                `;
                userList.appendChild(row);
            });
        } else {
            console.error('داده‌ها آرایه نیستند:', data);
        }
    } catch (error) {
        console.error('خطا:', error);
    }
}

// فراخوانی در بارگذاری اولیه صفحه
document.addEventListener('DOMContentLoaded', () => {
    loadUserList();
});
  
  // selectlist ایمیل و نام کاربران
  document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/api/users/all', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('خطا در دریافت داده‌ها: ' + response.status);
        }
        return response.json();
      })
      .then(response => {
        const usernSelect = document.getElementById('usern');
        usernSelect.innerHTML = '<option value="" disabled selected>انتخاب ایمیل</option>';
  
        response.result.forEach(usern => {
          const option = document.createElement('option');
          option.value = usern.id;
          option.textContent = `${usern.email} . ${usern.fname+" "+usern.lname}`;
          usernSelect.appendChild(option);
        });
  
        // ✅ فعال‌سازی Selectize بعد از پر شدن
        $('#usern').selectize({
          create: false,
          sortField: 'text',
          placeholder: 'انتخاب ایمیل کاربر',
          dropdownParent: 'body'
        });
  
      })
      .catch(error => console.error('خطا در دریافت نام کاربری:', error));
  });
  
  
  // selectlist نقش ها
  document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/api/users/groups/all', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token') // توکن رو جایگزین کن
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('خطا در دریافت داده‌ها: ' + response.status);
      }
      return response.json();
    })
    .then(response => {
      const roleSelect = document.getElementById('role');
      roleSelect.innerHTML = '<option value="" disabled selected>انتخاب نقش</option>';
      
      response.result.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id;
        option.textContent = role.name;
        roleSelect.appendChild(option);
      });
  
      // فعال‌سازی Selectize روی لیست نقش‌ها
      $('#role').selectize({
        create: false,
        sortField: 'text',
        placeholder: 'انتخاب نقش کاربر',
        dropdownParent: 'body'
      });
    })
    .catch(error => console.error('خطا در دریافت نقش‌ها:', error));
  });
  
  
  
  //کلید ویرایش کاربر
  document.getElementById('addUserForm').addEventListener('submit', function (e) {
    e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم
  
    const userId = document.getElementById('usern').value;
    const groupId = document.getElementById('role').value;
    const selectedEmail = document.getElementById('usern').selectedOptions[0].text.split(' . ')[0];
  
    // مرحله اول: گرفتن اطلاعات کامل کاربر
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('خطا در دریافت اطلاعات کاربر: ' + response.status);
        }
        return response.json();
      })
      .then(userData => {
        const existingUser = userData.result;
  
        // مرحله دوم: ارسال اطلاعات کامل برای ویرایش
        return fetch(`http://localhost:8000/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: selectedEmail,
            group_id: groupId,
            fname: existingUser.fname  || "",
            lname: existingUser.lname  || "",
            phone: existingUser.phone || ""
          })
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('خطا در ویرایش کاربر: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log('کاربر با موفقیت ویرایش شد:', data);
        alert("✅ کاربر با موفقیت ویرایش شد");
        location.reload();// ریلود صفحه
  
        // بروزرسانی لیست کاربران
        updateUserList();
      })
     
  });



document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/api/users/doctors', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('خطا در دریافت داده‌ها: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('پاسخ API:', data); // برای دیباگ
            const doctorSelect = document.getElementById('doctor');
            doctorSelect.innerHTML = '<option value="" disabled selected>انتخاب پزشک</option>';

            // بررسی ساختار داده
            let doctors = [];
            if (Array.isArray(data)) {
                doctors = data; // اگر مستقیماً آرایه باشه
            } else if (data.result && Array.isArray(data.result)) {
                doctors = data.result; // اگر آرایه تو کلید result باشه
            } else if (data.data && Array.isArray(data.data)) {
                doctors = data.data; // اگر آرایه تو کلید data باشه
            } else {
                console.error('ساختار داده نامعتبر یا خالی:', data);
                doctorSelect.innerHTML += '<option value="">داده‌ای برای بارگذاری وجود ندارد</option>';
                return;
            }

            if (doctors.length === 0) {
                console.warn('هیچ پزشکی یافت نشد.');
                doctorSelect.innerHTML += '<option value="">هیچ پزشکی موجود نیست</option>';
            } else {
                doctors.forEach(doctor => {
                    const option = document.createElement('option');
                    option.value = doctor.id; // استفاده از doctor.id
                    option.textContent = `${doctor.fname} ${doctor.lname}`; // استفاده مستقیم از fname و lname
                    doctorSelect.appendChild(option);
                });
            }

            // فعال‌سازی Selectize
            $('#doctor').selectize({
                create: false,
                sortField: 'text',
                placeholder: 'انتخاب پزشک',
                dropdownParent: 'body'
            });
        })
        .catch(error => {
            console.error('خطا در دریافت لیست پزشکان:', error);
            const doctorSelect = document.getElementById('doctor');
            doctorSelect.innerHTML = '<option value="">خطا در بارگذاری لیست پزشکان</option>';
        });
});

// افزودن پزشک
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('اسکریپت لود شد'); // لاگ برای چک کردن لود اسکریپت
//     const addDoctorButton = document.getElementById('addDoctor');
//     if (!addDoctorButton) {
//         console.error('دکمه با id="addDoctor" پیدا نشد!');
//         return;
//     }
//     console.log('دکمه پیدا شد، افزودن رویداد کلیک');
//     addDoctorButton.addEventListener('click', function (e) {
//         console.log('دکمه کلیک شد'); // لاگ برای چک کردن کلیک

//         // جمع‌آوری داده‌های فرم
//         const doctorId = document.getElementById('doctor').value; // ID از لیست انتخاب
//         const specialty = document.getElementById('specialty').value;
//         const licenseNumber = document.getElementById('license_Number').value;
//         const address = document.getElementById('address').value;
//         const workingHours = document.getElementById('working_hours').value;
//         console.log('داده‌های جمع‌آوری‌شده:', { doctorId, specialty, licenseNumber, address, workingHours }); // لاگ داده‌ها

//         // اعتبارسنجی ساده
//         if (!specialty || !licenseNumber || !address || !workingHours) {
//             console.log('اعتبارسنجی ناموفق: برخی فیلدها خالی‌اند'); // لاگ برای اعتبارسنجی ناموفق
//             alert('لطفاً تمام فیلدها را پر کنید.');
//             return;
//         }
//         console.log('اعتبارسنجی موفق'); // لاگ برای اعتبارسنجی موفق

//         // آماده‌سازی داده برای ارسال
//         const doctorData = {
//             doctorId, // اگر ID لازمه (مثلاً برای لینک به کاربر موجود)
//             specialty,
//             licenseNumber,
//             address,
//             workingHours
//         };
//         console.log('داده‌های آماده‌شده برای ارسال:', doctorData); // لاگ داده‌های آماده

//         // ارسال درخواست به API برای افزودن پزشک
//         fetch('http://localhost:8000/api/doctors', {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(doctorData)
//         })
//             .then(response => {
//                 console.log('پاسخ سرور دریافت شد، وضعیت:', response.status); // لاگ وضعیت پاسخ
//                 if (!response.ok) {
//                     throw new Error('خطا در افزودن پزشک: ' + response.status);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('پاسخ موفق از API:', data); // لاگ داده‌های برگشتی
//                 alert('✅ پزشک با موفقیت اضافه شد');
//                 document.getElementById('addUserForm').reset(); // پاک کردن فرم
//                 // اگر نیازه لیست پزشکان دوباره لود بشه، تابع مربوطه رو فراخوانی کنید
//                 // updateDoctorList();
//             })
//             .catch(error => {
//                 console.error('خطا در افزودن پزشک:', error); // لاگ خطا
//                 alert('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
//             });
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    console.log('اسکریپت لود شد');
    const addDoctorButton = document.getElementById('addDoctor');
    if (!addDoctorButton) {
        console.error('دکمه با id="addDoctor" پیدا نشد!');
        return;
    }
    console.log('دکمه پیدا شد، افزودن رویداد کلیک');

    addDoctorButton.addEventListener('click', async function (e) {
        console.log('دکمه کلیک شد');

        // جمع‌آوری داده‌های فرم
        const doctorId = document.getElementById('doctor')?.value || '';
        const specialty = document.getElementById('specialty')?.value || '';
        const licenseNumber = document.getElementById('licenseNumber')?.value || ''; // اصلاح ID
        const address = document.getElementById('address')?.value || '';
        const workingHours = document.getElementById('working_hours')?.value || '';
        const bio = document.getElementById('bio')?.value || '';
        console.log('داده‌های جمع‌آوری‌شده:', { doctorId, specialty, licenseNumber, address, workingHours, bio });

        // اعتبارسنجی ساده
        if (!specialty || !licenseNumber || !address || !workingHours || !bio) {
            console.log('اعتبارسنجی ناموفق: برخی فیلدها خالی‌اند');
            alert('لطفاً تمام فیلدها را پر کنید.');
            return;
        }
        console.log('اعتبارسنجی موفق');

        // آماده‌سازی داده برای ارسال
        const doctorData = {
            user_id: doctorId,
            specialty,
            license_number: licenseNumber,
            address,
            working_hours: workingHours,
            bio
        };
        console.log('داده‌های آماده‌شده برای ارسال:', doctorData);

        try {
            const response = await fetch('http://localhost:8000/api/doctors', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(doctorData)
            });

            console.log('پاسخ سرور دریافت شد، وضعیت:', response.status);
            const responseData = await response.json();
            console.log('داده‌های پاسخ سرور:', responseData);

            if (!response.ok) {
                throw new Error('خطا در افزودن پزشک: ' + (responseData.message || response.status));
            }

            console.log('پاسخ موفق از API:', responseData);
            alert('✅ پزشک با موفقیت اضافه شد');
            document.getElementById('addUserForm').reset();
        } catch (error) {
            console.error('خطا در افزودن پزشک:', error);
            alert('خطایی رخ داد. لطفاً دوباره تلاش کنید. جزئیات: ' + error.message);
        }
    });
});
// تابع بارگذاری لیست کاربران
function loadUserList() {
    fetch('http://localhost:8000/api/users', {
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
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // پاک کردن محتوای قبلی
  
        if (Array.isArray(data.result.data)) {
          data.result.data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${user.id || 'N/A'}</td>
              <td>${user.name || 'N/A'}</td>
              <td>${user.email || 'N/A'}</td>
              <td>${user.group.name || 'بدون گروه'}</td>
            `;
            userList.appendChild(row);
          });
        } else {
          console.error('داده‌ها آرایه نیستند:', data);
        }
      })
      .catch(error => console.error('خطا:', error));
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
          option.textContent = `${usern.email} . ${usern.name}`;
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
            name: existingUser.name || "",
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


  document.addEventListener("DOMContentLoaded", () => {
    const doctorSelect = document.getElementById("doctor");
    const form = document.getElementById("addUserForm");
  
    // 1. گرفتن لیست نام پزشکان از بک‌اند
    fetch("https://your-backend-url.com/api/doctors") // آدرس API رو اینجا بذار
      .then((res) => res.json())
      .then((data) => {
        data.forEach((doctor) => {
          const option = document.createElement("option");
          option.value = user.id; // یا doctor.name
          option.textContent = doctor.user.fname+' '+doctor.user.lname;
          doctorSelect.appendChild(option);
        });
      })
      .catch((err) => {
        console.error("خطا در دریافت لیست پزشکان:", err);
      });
  
    // 2. ارسال اطلاعات فرم به بک‌اند
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const selectedDoctorId = doctorSelect.value;
      const specialty = document.getElementById("specialty").value;
      const licenseNumber = document.getElementById("licenseNumber").value;
      const address = document.getElementById("address").value;
      const workingHours = document.getElementById("workingHours").value;
  
      const payload = {
        doctorId: selectedDoctorId,
        specialty,
        licenseNumber,
        address,
        workingHours,
      };
  
      fetch("https://your-backend-url.com/api/add-doctor-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error("ارسال اطلاعات با خطا مواجه شد.");
          return res.json();
        })
        .then((data) => {
          alert("اطلاعات پزشک با موفقیت ثبت شد!");
          form.reset();
        })
        .catch((err) => {
          console.error("خطا:", err);
          alert("خطا در ثبت اطلاعات پزشک.");
        });
    });
  });
  
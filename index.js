// (ilia)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.faq-item').forEach(item => {
      item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        if (!answer) return;
  
        // اگر الان نمایش داشت، مخفی کن، وگرنه نمایش بده
        if (answer.style.display === 'block') {
          answer.style.display = 'none';
        } else {
          answer.style.display = 'block';
        }
      });
    });
  });
  

document.addEventListener("DOMContentLoaded", function () {
  // هندلر به صورت delegation روی کل باکس سوالات
  const box = document.querySelector('.section-questions-box');
  if(!box) return;

  
    // نزدیک‌ترین آیتم FAQ که کلیک داخلش بوده
    const item = e.target.closest('.faq-item');
    if(!item || !box.contains(item)) return;

    // جلوگیری از رفتار لینک‌ها داخل آیتم (رفرش/ناوبری)
    const a = e.target.closest('a');
    if (a) e.preventDefault();

    // اگر روی فلش یا متن کلیک شد، باز/بسته کن
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    if(!answer) return;

    const isOpen = (answer.style.display === 'block');
    answer.style.display = isOpen ? 'none' : 'block';
    if(icon){
      icon.classList.toggle('open', !isOpen);
    }
  }, false);

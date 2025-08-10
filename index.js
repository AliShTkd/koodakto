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
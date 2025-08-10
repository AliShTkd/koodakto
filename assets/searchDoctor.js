// سرچ کردن برترین پزشکان

const searchInput = document.querySelector('.search-input input');
const doctorsCards = document.querySelectorAll('.doctor-names');

searchInput.addEventListener('input', ()=>{
   const searchValue = searchInput.value.trim().toLowerCase();

   doctorsCards.forEach(card =>{
    const name = card.querySelector('.name').textContent.trim().toLowerCase();
    const skill = card.querySelector('.skill').textContent.trim().toLowerCase();

    if(name.includes(searchValue) || skill.includes(searchValue)) {
      card.style.display = '';
    }else{
      card.style.display = 'none';   
    }
    
    });
});
import {CustomSelect} from './custom-select';

const closeIconEl = document.querySelector('.search__close-icon');
const searchInputEl = document.querySelector('.search__recepies-input');
const searchIconEl = document.querySelector('.search__icon-svg');
const searchFormEl = document.querySelector('.search__recepies');
const resetFiltersEl = document.querySelector('.filters-reset');
const selectsEl = document.querySelectorAll('.filter-select__toggle');

resetFiltersEl.addEventListener('click', () => {
    searchInputEl.value = '';
    clearFiltersInput();
    selectsEl.forEach(select => {
        console.log(select)
        select.textContent = select.dataset.start;
        select.dataset.index = '-1';
        select.style.color = 'inherit'
    }
    );
})

/* searchFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('ok')
}) */

searchInputEl.addEventListener('input', clearFiltersInput);
closeIconEl.addEventListener('click', () => {
    searchInputEl.value = '';
    clearFiltersInput();
});

function clearFiltersInput (){
    closeIconEl.classList.add('is-hidden');
    searchIconEl.style.fill = "currentColor";   
    if (searchInputEl.value !== '') {
        closeIconEl.classList.remove('is-hidden');
        searchIconEl.style.fill = "var(--color-accent-primary)";
    }
}

(async() => {
    const response = await fetch('https://tasty-treats-backend.p.goit.global/api/areas')
    if (response.ok) {
      const data = await response.json();
      const values = Object.keys(data).map((key, index) => {
        return `<li class="filter-select__option" data-select="option" data-value="${key}" data-index="${index}">${data[key].name}</li>`;
      });
      document.querySelector('#options-area').innerHTML = values.join('');
      new CustomSelect('#select-area');
      document.querySelector('#toggle-area').disabled = false;
    }
})();
(async() => {
    const response = await fetch('https://tasty-treats-backend.p.goit.global/api/ingredients')
    if (response.ok) {
      const data = await response.json();
      const values = Object.keys(data).map((key, index) => {
        return `<li class="filter-select__option" data-select="option" data-value="${key}" data-index="${index}">${data[key].name}</li>`;
      });
      document.querySelector('#options-ingridients').innerHTML = values.join('');
      new CustomSelect('#select-ingridients');
      document.querySelector('#toggle-ingridients').disabled = false;
    }
})();
function renderTime () {
    let arr = []; 
    for (let i = 5; i <= 120; i+= 5) {
      arr.push(i);
    }
    const values = arr.map((key, index) => {
        return `<li class="filter-select__option" data-select="option" data-value="${key}" data-index="${index}">${key} min</li>`;
    });
    document.querySelector('#options-time').innerHTML = values.join('');
    new CustomSelect('#select-time');
    document.querySelector('#toggle-time').disabled = false;
}
renderTime ();
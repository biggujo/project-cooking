import {CustomSelect} from './custom-select';
const closeIconEl = document.querySelector('.close-icon');
const searchInputEl = document.querySelector('.search__recepies-input');
const searchIconEl = document.querySelector('.search-icon1');

searchInputEl.addEventListener('input', () => {
    closeIconEl.style.display = "flex";
    searchIconEl.style.fill = "var(--color-accent-primary)";
});

closeIconEl.addEventListener('click', () => {
    console.log(searchInputEl);
});
/* searchInputEl.addEventListener('change', () => {
    closeIconEl.style.display = "none";
    searchIconEl.style.backgroundColor = "inherit";
}); */


(async() => {
    const response = await fetch('https://tasty-treats-backend.p.goit.global/api/areas')
    if (response.ok) {
      const data = await response.json();
      const values = Object.keys(data).map((key, index) => {
        return `<li class="itc-select__option" data-select="option" data-value="${key}" data-index="${index}">${data[key].name}</li>`;
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
        return `<li class="itc-select__option" data-select="option" data-value="${key}" data-index="${index}">${data[key].name}</li>`;
      });
      document.querySelector('#options-ingridients').innerHTML = values.join('');
      new CustomSelect('#select-ingridients');
      document.querySelector('#toggle-ingridients').disabled = false;
    }
  })();
  function f () {
    let arr = []; 
    for (let i = 5; i <= 120; i+= 5){
      arr.push(i);
    }
    console.log(arr);
    const values = arr.map((key, index) => {
        return `<li class="itc-select__option" data-select="option" data-value="${key}" data-index="${index}">${key} min</li>`;
      });
      document.querySelector('#options-time').innerHTML = values.join('');
      new CustomSelect('#select-time');
      document.querySelector('#toggle-time').disabled = false;
  }
f ();
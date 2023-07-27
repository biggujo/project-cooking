import axios from 'axios';
import {CustomSelect} from './custom-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const API_URL = 'https://tasty-treats-backend.p.goit.global/api';
const searchFormEl = document.querySelector('.search__recipes');
const searchInputEl = document.querySelector('.search__recipes-input');
const closeIconEl = document.querySelector('.search__close-icon');
const searchIconEl = document.querySelector('.search__icon-svg');

const resetFiltersEl = document.querySelector('.filters-reset');
const selectsEl = document.querySelectorAll('.filter-select__toggle');

export let filtersResultForQuery = {};

/* Reset and clear filters/input block */
export function resetAllFilters () {
  searchInputEl.value = '';
  const propertiesToDelete = ['title', 'area', 'ingredient', 'time'];
  propertiesToDelete.forEach(prop => {
    delete filtersResultForQuery[prop];
  });
  changesInInput();
  document.querySelectorAll('.filter-select__option_selected').forEach(el => {
    el.classList.remove('filter-select__option_selected')
  })
  selectsEl.forEach(select => {
     select.textContent = select.dataset.start;
     select.dataset.index = '-1';
     select.style.color = 'inherit';
 });
}

function changesInInput (){
    closeIconEl.classList.add('is-hidden');
    searchIconEl.style.fill = "currentColor";
    if (searchInputEl.value !== '') {
        closeIconEl.classList.remove('is-hidden');
        searchIconEl.style.fill = "var(--color-accent-primary)";
    }
}

const debouncedFetchRecipe = debounce((filters) => {
  fetchRecipeByFilter(filters);
}, 300);

searchFormEl.addEventListener('submit', (e) => {
  e.preventDefault();
  debouncedFetchRecipe(filtersResultForQuery);
})

searchIconEl.addEventListener('click', () => {
  console.log('hi');
  fetchRecipeByFilter(filtersResultForQuery);
});

searchInputEl.addEventListener('input', changesInInput);

closeIconEl.addEventListener('click', () => {
    searchInputEl.value = '';
    changesInInput();
    delete filtersResultForQuery.title;
    fetchRecipeByFilter(filtersResultForQuery);
});

resetFiltersEl.addEventListener('click', () => {
    resetAllFilters();
    fetchRecipeByFilter(filtersResultForQuery);
})

/* Debounce function for input change and added to query */
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

searchInputEl.addEventListener('input', debounce(() => {
  filtersResultForQuery['title'] = searchInputEl.value;
  fetchRecipeByFilter(filtersResultForQuery);
}, 300));

/* Receiving the results of a filter query */
function fetchRecipeByFilter(filters) {
  let url = `${API_URL}/recipes?`;
  if( filters.category){
    url += `category=${filters.category}`;
  }
  if (filters.title) {
    url += `&title=${filters.title}`;
  }
  if (filters.time) {
    url += `&time=${filters.time}`;
  }
  if (filters.area) {
    url += `&area=${filters.area}`;
  }
  if (filters.ingredient) {
    url += `&ingredient=${filters.ingredient}`;
  }
  return axios
    .get(url)
    .then(response => {
      const recipes = response.data;
      console.log(recipes);
      if( recipes.results.length === 0){
        Notify.failure('Sorry, nothing found. Change your filters, or check the entered values.');
      }
      return recipes;
    })
    .catch(error => {
      Notify.failure('Sorry, there is something wrong with your request!');
      throw error;
    });
}

/* filter change listener */
function handleFilterSelectChange(e) {
  const filterBtn = e.target.querySelector('.filter-select__toggle');
    let elName = filterBtn.name;
    filtersResultForQuery[elName] = filterBtn.value;
    console.log(filtersResultForQuery); 
    fetchRecipeByFilter(filtersResultForQuery);
}

function addFilterToResultQuery (filterName){
  const filterSelectContainers = document.querySelector(`${filterName}`);
  filterSelectContainers.addEventListener('filter.select.change', handleFilterSelectChange);
}

/* Fetch and rendering dropdown */
function fetchDataForFilters(filterName) {
  return axios
  .get(`${API_URL}/${filterName}`)
  .then(response => {
    if (response.status === 200) {
      const data = response.data;
      data.sort((x, y) => x.name.localeCompare(y.name));
      return data;
    }
  })
  .catch(error => {
    Notify.failure('Sorry, there is something wrong with your request!');
    console.error('ERROR', error);
  });
}

function renderFilterList (filterName, values) {
  document.querySelector(`#options-${filterName}`).innerHTML = values.join('');
  new CustomSelect(`#select-${filterName}`);
  document.querySelector(`#toggle-${filterName}`).disabled = false;
}

function renderTime () {
  let arr = []; 
  for (let i = 5; i <= 120; i+= 5) {
    arr.push(i);
  }
  const values = arr.map((key, index) => {
    return `<li class="filter-select__option" data-select="option" data-value="${key}" data-index="${index}">${key} min</li>`;
  });
  renderFilterList('time', values);
  addFilterToResultQuery('#select-time');
};
renderTime();

fetchDataForFilters('ingredients')
.then(data => {
  const values = Object.keys(data).map((key, index) => {
    return `<li class="filter-select__option" data-select="option" data-value="${data[key]._id}" data-index="${index}">${data[key].name}</li>`;
  });
  renderFilterList('ingredients', values);
  addFilterToResultQuery('#select-ingredients');
})
.catch(error => {
  Notify.failure('Sorry, there is something wrong with your request data fo filter!');
  console.error('ERROR', error);
});

fetchDataForFilters('areas')
.then(data => {
  const values = Object.keys(data).map((key, index) => {
    return `<li class="filter-select__option" data-select="option" data-value="${data[key].name}" data-index="${index}">${data[key].name}</li>`;
  });
  renderFilterList('area', values);
  addFilterToResultQuery('#select-area');
})
.catch(error => {
  Notify.failure('Sorry, there is something wrong with your request data fo filter!!');
  console.error('ERROR', error);
});
import axios from 'axios';
import {CustomSelect} from './custom-select';
import './all-categories'

const searchInputEl = document.querySelector('.search__recipes-input');
const closeIconEl = document.querySelector('.search__close-icon');
const searchIconEl = document.querySelector('.search__icon-svg');

const resetFiltersEl = document.querySelector('.filters-reset');
const selectsEl = document.querySelectorAll('.filter-select__toggle');

const allCategories = document.querySelector('.all-categories');
const categoryEl = allCategories.querySelector('.is-active');
const allCategoriesButton = document.querySelector('.all-categories-button');
const API_URL = 'https://tasty-treats-backend.p.goit.global/api';

let filtersResultForQuery = {};

/* Reset and clear filters/input block */
function resetAllFilters () {
  searchInputEl.value = '';
  filtersResultForQuery = {};
  clearFiltersInput();
  selectsEl.forEach(select => {
     select.textContent = select.dataset.start;
     select.dataset.index = '-1';
     select.style.color = 'inherit';
 });
}

function clearFiltersInput (){
    closeIconEl.classList.add('is-hidden');
    searchIconEl.style.fill = "currentColor";
    if (searchInputEl.value !== '') {
        closeIconEl.classList.remove('is-hidden');
        searchIconEl.style.fill = "var(--color-accent-primary)";
    }
}

allCategoriesButton.addEventListener('click', resetAllFilters);
searchInputEl.addEventListener('input', clearFiltersInput);

closeIconEl.addEventListener('click', () => {
    searchInputEl.value = '';
    clearFiltersInput();
    delete filtersResultForQuery.title;
});

resetFiltersEl.addEventListener('click', () => {
    document.querySelectorAll('.filter-select__option_selected').forEach(el => {
    el.classList.remove('filter-select__option_selected')
    })
    resetAllFilters();
    console.log(categoryEl);
    if(categoryEl.textContent.trim() === 'All categories'){
    return
    } else {
      filtersResultForQuery['category'] = categoryEl.textContent.trim();
    }
})

/* Debounce function for input change and added to query */
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function handleInput() {
  filtersResultForQuery['title'] = searchInputEl.value;
  console.log(filtersResultForQuery);
  fetchRecipeByFilter(filtersResultForQuery, 'title');
}

const debouncedHandleInput = debounce(handleInput, 300);
searchInputEl.addEventListener('input', debouncedHandleInput);


/* Receiving the results of a filter query */
function fetchRecipeByFilter(filters, value) {
  let url = `${API_URL}/recipes`;
    url += `?${value}=${filters[value]}`;
  return axios
    .get(url)
    .then(response => {
      const recipes = response.data;
      console.log(recipes);
      return recipes;
    })
    .catch(error => {
      throw error;
    });
}

/* filter change listener */
function handleFilterSelectChange(e) {
  const filterBtn = e.target.querySelector('.filter-select__toggle');
    let elName = filterBtn.name;
    filtersResultForQuery[elName] = filterBtn.value;
    console.log(filtersResultForQuery); 
    fetchRecipeByFilter(filtersResultForQuery, elName);
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
  console.error('ERROR', error);
});
import { fetchCategories } from './api-categories.js';
import {filtersResultForQuery, resetAllFilters, checkMediaQueriesByClick, axiosRequestForRenderCards, buildRecipeURL} from './filters.js';

const API_URL = 'https://tasty-treats-backend.p.goit.global/api';
const allCategoriesList = document.querySelector('.all-categories-list');
const allCategoriesButton = document.querySelector('.all-categories-button');

let activeCategory = null;

function checkMediaQueriesForFirstRendering () {
  const handleMediaChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      if (mediaQuery.media === '(max-width: 768px)') {
        fetchRecipes(activeCategory, 5);
      } else if (mediaQuery.media === '(min-width: 769px) and (max-width: 1160px)') {
        fetchRecipes(activeCategory, 8);
      } else if (mediaQuery.media === '(min-width: 1161px)') {
        fetchRecipes(activeCategory, 9);
      }
    }
  };

  const mediaQuery768 = window.matchMedia('(max-width: 768px)');
  const mediaQuery769to1160 = window.matchMedia('(min-width: 769px) and (max-width: 1160px)');
  const mediaQueryMin1161 = window.matchMedia('(min-width: 1161px)');

  handleMediaChange(mediaQuery768);
  handleMediaChange(mediaQuery769to1160);  
  handleMediaChange(mediaQueryMin1161);

  mediaQuery768.addListener(handleMediaChange);
  mediaQuery769to1160.addListener(handleMediaChange);
  mediaQueryMin1161.addListener(handleMediaChange);
}

fetchCategories()
  .then(categories => {
    markupAllCategoriesListItem(categories);
    allCategoriesList.addEventListener('click', handleClickedCategories);
    allCategoriesButton.addEventListener('click', () => {
      resetAllFilters();
      delete filtersResultForQuery.category;
      handleClickedAllCategories();
    });
    checkMediaQueriesForFirstRendering();
  })
  .catch(error => {
    console.error('ERROR', error);
  });

function handleClickedCategories(event) {
  const target = event.target;

  if (target.classList.contains('all-categories-item-button')) {
    const activeButton = document.querySelector('.all-categories-item-button.is-active');

    if (activeButton && activeButton !== target) {
      activeButton.classList.remove('is-active');
    }

    if (activeCategory === target.innerText) {
      activeCategory = null;
    } else {
      target.classList.add('is-active');
      filtersResultForQuery['category'] = target.textContent.trim();
      console.log(filtersResultForQuery);
      activeCategory = target.innerText;
      allCategoriesButton.classList.remove('is-active'); // Знімаємо активний клас з кнопки "All categories"
    }
    let limit = checkMediaQueriesByClick();
    fetchRecipes(activeCategory, limit)
  }
}

function handleClickedAllCategories() {
  const activeButton = document.querySelector('.all-categories-item-button.is-active');

  if (activeButton) {
    activeButton.classList.remove('is-active');
  }

  activeCategory = null;
  allCategoriesButton.classList.add('is-active');

  let limit = checkMediaQueriesByClick();
  fetchRecipes(activeCategory, limit)
}

function fetchRecipes(category, limit) {
  const url = buildRecipeURL(filtersResultForQuery, limit);
  axiosRequestForRenderCards(url);
}

function markupAllCategoriesListItem(categories) {
  const allCategoriesListItem = categories
    .map(category => {
      return `<li class='all-categories-item'>
                <button class='all-categories-item-button'
                  type='button'>${category}
                </button>
              </li>`;
    })
    .join('');

  allCategoriesList.insertAdjacentHTML('afterbegin', allCategoriesListItem);
}
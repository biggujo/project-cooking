import { RecipeCard } from './js/recipe-card.js';
import './js/pagination-favorites.js';
import { createPagination } from './js/pagination-favorites.js';

const ALL_CATEGORIES_NAME = 'All categories';
const ITEMS_PER_PAGE = 12;

let page = 1;

const refs = {
  favoritesCategories: document.querySelector('.fav-categories'),
  favoritesList: document.getElementById('rendered-cards-for-favourites'),
};

document.addEventListener('remove-from-favorites', () => {
  console.log('Change!');
  doNewRenderOfCardsAndCategories();
});

refs.favoritesCategories.addEventListener('click', handleCategoryClick);
refs.favoritesList.addEventListener('click', handleFavoriteLikeClick);

doNewRenderOfCardsAndCategories();

function handleCategoryClick({ target }) {
  if (target.nodeName !== 'BUTTON') {
    return;
  }

  const selectedCategory = target.dataset['category'];

  unselectAllCategories();
  selectCategoryByName(selectedCategory);

  holdHeightOfCardList();
  renderCardsFromLocalStorage({ givenCategory: selectedCategory })
    .catch(console.log)
    .finally(() => releaseHeightOfCardList());
}

function handleFavoriteLikeClick({ target }) {
  if (target.nodeName !== 'svg' && target.nodeName !== 'use') {
    return;
  }

  holdHeightOfCardList();
  renderCardsFromLocalStorage({
    givenCategory: target.textContent,
  }).then(categories => {
    renderCategoriesByNames(categories);
    releaseHeightOfCardList();
  });
}

function doNewRenderOfCardsAndCategories() {
  holdHeightOfCardList();
  renderCardsFromLocalStorage({ page })
    .then(categories => {
      console.log(categories);
      renderCategoriesByNames(categories);
      releaseHeightOfCardList();
    })
    .catch(console.log);
}

async function renderCardsFromLocalStorage({ givenCategory, page }) {
  try {
    const idsArray = JSON.parse(localStorage.getItem('favorites'));

    refs.favoritesList.innerHTML = '';

    const cardsPromises = idsArray.map(id => {
      return new RecipeCard().init(id);
    });

    let recipeCardEls = await Promise.all(cardsPromises);

    let categories = recipeCardEls;

    if (givenCategory && givenCategory !== ALL_CATEGORIES_NAME) {
      if (page) {
        recipeCardEls = recipeCardEls.slice(
          page * ITEMS_PER_PAGE,
          (page + 1) * ITEMS_PER_PAGE
        );
      }

      categories = recipeCardEls.filter(
        recipeCardEl => recipeCardEl.recipeData.category === givenCategory
      );
    }

    categories = new Set(
      categories.map(recipeCardEl => {
        const itemEl = document.createElement('li');
        itemEl.classList.add('fav-categories-item');

        itemEl.appendChild(recipeCardEl.recipeCardEl);

        refs.favoritesList.appendChild(itemEl);

        return recipeCardEl.recipeData.category;
      })
    );

    return categories;
  } catch (error) {
    console.log(error);
  }
}

function renderCategoriesByNames(categories) {
  refs.favoritesCategories.innerHTML = '';

  renderCategoryByName(ALL_CATEGORIES_NAME);
  [...categories].sort().forEach(renderCategoryByName);

  function renderCategoryByName(categoryName) {
    refs.favoritesCategories.insertAdjacentHTML(
      'beforeend',
      `<button data-category='${categoryName}' class='button-fav-category${
        categoryName === ALL_CATEGORIES_NAME
          ? ' button-fav-category-active'
          : ''
      }'>${categoryName}</button>`
    );
  }
}

function unselectAllCategories() {
  const categoriesRefs =
    refs.favoritesCategories.querySelectorAll('[data-category]');

  categoriesRefs.forEach(categoriesRef =>
    categoriesRef.classList.remove('button-fav-category-active')
  );
}

function selectCategoryByName(name) {
  const categoryRef = refs.favoritesCategories.querySelector(
    `[data-category="${name}"]`
  );
  categoryRef.classList.add('button-fav-category-active');
}

function holdHeightOfCardList() {
  refs.favoritesList.style.height = String(
    refs.favoritesList.offsetHeight + 'px'
  );
}

function releaseHeightOfCardList() {
  refs.favoritesList.style.height = 'auto';
}

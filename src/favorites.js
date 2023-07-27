import { RecipeCard } from './js/recipe-card.js';

console.log('Hello!');

const refs = {
  favoritesCategories: document.querySelector('.fav-categories'),
  favoritesList: document.getElementById('rendered-cards-for-favourites'),
};

const categories = new Set();

document.addEventListener('remove-from-favorites', () => {
  console.log('Change!');
  doNewRenderOfCardsAndCategories();
});

doNewRenderOfCardsAndCategories();

function doNewRenderOfCardsAndCategories() {
  renderCardsByIds()
    .then(categories => {
      console.log(categories);
      renderCategoriesByNames(categories);
    })
    .catch(console.log);
}

async function renderCardsByIds() {
  try {
    const idsArray = JSON.parse(localStorage.getItem('favorites'));

    refs.favoritesList.innerHTML = '';

    const cardsPromises = idsArray.map(id => {
      return new RecipeCard().init(id);
    });

    const recipeCardEls = await Promise.all(cardsPromises);

    const categories = recipeCardEls.map(recipeCardEl => {
      const itemEl = document.createElement('li');
      itemEl.classList.add('fav-categories-item');

      itemEl.appendChild(recipeCardEl.recipeCardEl);

      refs.favoritesList.appendChild(itemEl);

      return recipeCardEl.recipeData.category;
    });

    return categories;
  } catch (error) {
    console.log(error);
  }
}

function renderCategoriesByNames(categories) {
  const ALL_CATEGORIES_NAME = 'All categories';

  refs.favoritesCategories.innerHTML = '';

  renderCategoryByName(ALL_CATEGORIES_NAME);
  categories.forEach(renderCategoryByName);

  function renderCategoryByName(categoryName = '') {
    refs.favoritesCategories.insertAdjacentHTML(
      'beforeend',
      `<button data-category='${
        categoryName === ALL_CATEGORIES_NAME ? '' : categoryName
      }'>${categoryName}</button>`
    );
  }
}

new RecipeCard().init('6462a8f74c3d0ddd28897fb8').then(recipeCardEl => {
  document.body.prepend(recipeCardEl.recipeCardEl);
});

new RecipeCard().init('6462a8f74c3d0ddd28897fb9').then(recipeCardEl => {
  document.body.prepend(recipeCardEl.recipeCardEl);
});

new RecipeCard().init('6462a8f74c3d0ddd28897fba').then(recipeCardEl => {
  document.body.prepend(recipeCardEl.recipeCardEl);
});

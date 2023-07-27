import { RecipeCard } from './js/recipe-card.js';

const ALL_CATEGORIES_NAME = 'All categories';

const refs = {
  favoritesCategories: document.querySelector('.fav-categories'),
  favoritesList: document.getElementById('rendered-cards-for-favourites'),
};

document.addEventListener('remove-from-favorites', () => {
  console.log('Change!');
  doNewRenderOfCardsAndCategories();
});

refs.favoritesCategories.addEventListener('click', handleFavoriteClick);

doNewRenderOfCardsAndCategories();

function handleFavoriteClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  console.log('Click!');

  holdHeightOfCardList();
  renderCardsFromLocalStorage(event.target.textContent).then(() => {
    releaseHeightOfCardList();
  });
}

function doNewRenderOfCardsAndCategories() {
  holdHeightOfCardList();
  renderCardsFromLocalStorage()
    .then(categories => {
      console.log(categories);
      renderCategoriesByNames(categories);
      releaseHeightOfCardList();
    })
    .catch(console.log);
}

async function renderCardsFromLocalStorage(givenCategory) {
  try {
    const idsArray = JSON.parse(localStorage.getItem('favorites'));

    refs.favoritesList.innerHTML = '';

    const cardsPromises = idsArray.map(id => {
      return new RecipeCard().init(id);
    });

    const recipeCardEls = await Promise.all(cardsPromises);

    let categories = recipeCardEls;

    if (givenCategory && givenCategory !== ALL_CATEGORIES_NAME) {
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
  categories.forEach(renderCategoryByName);

  function renderCategoryByName(categoryName = '') {
    refs.favoritesCategories.insertAdjacentHTML(
      'beforeend',
      `<button data-category='${
        categoryName === ALL_CATEGORIES_NAME ? '' : categoryName
      }' class='button-favorite'>${categoryName}</button>`
    );
  }
}

let currentHeight;

function holdHeightOfCardList() {
  refs.favoritesList.style.height = String(
    refs.favoritesList.offsetHeight + 'px'
  );
}

function releaseHeightOfCardList() {
  refs.favoritesList.style.height = 'auto';
}

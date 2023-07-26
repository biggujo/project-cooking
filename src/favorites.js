import { RecipeCard } from './js/recipe-card.js';

console.log('Hello!');

const refs = {
  favoritesList: document.querySelector('.fav-categories-list'),
};

renderCardsByIds();

document.addEventListener('remove-from-favorites', () => {
  console.log('Change!');
  renderCardsByIds();
});

function renderCardsByIds() {
  try {
    const idsArray = JSON.parse(localStorage.getItem('favorites'));

    refs.favoritesList.innerHTML = '';

    idsArray.forEach(id => {
      new RecipeCard().init(id).then(recipeCardEl => {
        const itemEl = document.createElement('li');
        itemEl.classList.add('fav-categories-item');
        itemEl.appendChild(recipeCardEl);

        refs.favoritesList.appendChild(itemEl);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

new RecipeCard().init('6462a8f74c3d0ddd28897fb8').then(recipeCardEl => {
  document.body.prepend(recipeCardEl);
  console.log(recipeCardEl);
});

new RecipeCard().init('6462a8f74c3d0ddd28897fb9').then(recipeCardEl => {
  document.body.prepend(recipeCardEl);
  console.log(recipeCardEl);
});

new RecipeCard().init('6462a8f74c3d0ddd28897fba').then(recipeCardEl => {
  document.body.prepend(recipeCardEl);
  console.log(recipeCardEl);
});

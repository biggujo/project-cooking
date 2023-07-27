// * An example of import
import { sayHello } from './js/test.js';
sayHello();
import { popular } from './js/popular.js';
popular();
import { scrollFunc } from './js/scroll-up.js';
scrollFunc();

import { highlightCurrentPage } from './js/header-current-page-marker.js';

import './js/heroSection.js';
import './js/all-categories.js';
import './js/pagination.js';
import { PopUpModal } from './js/pop-up-modal.js';
import { PopUpRecipeModal } from './js/pop-up-recipe-modal.js';

import { RecipeCard } from './js/recipe-card.js';
import './js/filters.js';
import './js/switcher.js';
import './js/render-cards.js';

highlightCurrentPage();

// Recipe modal
new PopUpModal({
  openModalSelector: '[data-pop-up-rating-open]',
  closeModalSelector: '[data-pop-up-rating-close]',
  backdropSelector: '[data-pop-up-rating-modal]',
});

// Rating modal
new PopUpModal({
  openModalSelector: '[data-pop-up-recipe-open]',
  closeModalSelector: '[data-pop-up-recipe-close]',
  backdropSelector: '[data-pop-up-recipe-modal]',
});

// Header burger-menu modal
new PopUpModal({
  openModalSelector: '[data-header-menu-open]',
  closeModalSelector: '[data-header-menu-close]',
  backdropSelector: '[data-header-menu-modal]',
});

// "Order now" modal
new PopUpModal({
  openModalSelector: '[data-pop-up-order-now-open]',
  closeModalSelector: '[data-pop-up-order-now-close]',
  backdropSelector: '[data-pop-up-order-now-modal]',
});

const cardArray = [];

renderCards();

async function renderCards() {
  const card = await new RecipeCard().init('6462a8f74c3d0ddd28897fb8');
  const card1 = await new RecipeCard().init('6462a8f74c3d0ddd28897fb9');
  cardArray.push(card);
  cardArray.push(card1);

  document.body.prepend(card.recipeCardEl);
  document.body.prepend(card1.recipeCardEl);

  console.log(card);
}

document.body.addEventListener('click', handleRecipeCardClick);

async function handleRecipeCardClick({ target }) {
  // if (event.currentTarget.dataset.id != undefined) {
  //   console.log('No ID!');
  //   return;
  // }

  console.log(target);

  if (target.nodeName !== 'DIV' || target.dataset['data-id'] === null) {
    console.log('error');
    return;
  }

  console.log(target.nodeName);

  const givenId = target.dataset.id;

  const { _recipeData: recipeData } = cardArray.find(
    card => givenId === card.recipeData._id
  );

  await new PopUpRecipeModal(recipeData).openModal();

  // const modal = new PopUpRecipeModal(event.)
}

// const card2 = new RecipeCard()
// .init('6462a8f74c3d0ddd28897fb9')
// .then(recipeCardEl => {
//   document.body.prepend(recipeCardEl);
// });

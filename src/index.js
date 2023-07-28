import axios from 'axios';

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
import { PopUpRatingModal } from './js/pop-up-rating-modal.js';

import { RecipeCard } from './js/recipe-card.js';
import './js/filters.js';
import './js/switcher.js';
// import './js/render-cards.js';

highlightCurrentPage();

const loaderRef = document.querySelector('.card-modal-loader-backdrop');

// Recipe modal
// new PopUpRatingModal();

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
  const recipeCardURL =
    'https://tasty-treats-backend.p.goit.global/api/recipes';

  if (hasLikeIconBeenClicked(target)) {
    return;
  }

  let clickedCard;

  if (!target.dataset.id) {
    clickedCard = target.closest('[data-id]');
  } else {
    clickedCard = target;
  }

  if (!clickedCard) {
    console.log('error');
    return;
  }

  loaderRef.classList.remove('is-hidden');

  try {
    await renderModalById();
  } catch (e) {
    console.log(e);
  } finally {
    loaderRef.classList.add('is-hidden');
  }

  function hasLikeIconBeenClicked() {
    return target.nodeName === 'svg' || target.nodeName === 'use';
  }

  async function renderModalById() {
    const givenId = clickedCard.dataset.id;

    const response = await axios.get(`${recipeCardURL}/${givenId}`);
    const recipeData = await response.data;

    await new PopUpRecipeModal(recipeData).openModal();
  }
}

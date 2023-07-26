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
import { PopUpModal } from './js/pop-up-modal.js';
import { RecipeCard } from './js/recipe-card.js';
import './js/filters.js';
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

const card1 = new RecipeCard()
.init('6462a8f74c3d0ddd28897fb8')
.then(recipeCardEl => {
  document.body.prepend(recipeCardEl);
});

const card2 = new RecipeCard()
.init('6462a8f74c3d0ddd28897fb9')
.then(recipeCardEl => {
  document.body.prepend(recipeCardEl);
});

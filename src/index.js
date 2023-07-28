import axios from 'axios';

import { popular } from './js/popular.js';

popular();
import { scrollFunc } from './js/scroll-up.js';

scrollFunc();

import { highlightCurrentPage } from './js/header-current-page-marker.js';

import './js/heroSection.js';
import './js/pagination.js';
import { PopUpModal } from './js/pop-up-modal.js';
import './js/card-click.js';

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

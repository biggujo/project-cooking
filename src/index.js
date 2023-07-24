// * An example of import
import { sayHello } from './js/test.js';
sayHello();
import { popular } from './js/popular.js';
popular();
import { scrollFunc } from './js/scroll-up.js';
scrollFunc();

import './js/all-categories.js';
import { PopUpModal } from './js/pop-up-modal.js';

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

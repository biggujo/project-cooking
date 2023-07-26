// * An example of import
import { sayHello } from './js/test.js';

import './js/all-categories.js';
import { PopUpModal } from './js/pop-up-modal.js';
import { RecipeCard } from './js/recipe-card.js';

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

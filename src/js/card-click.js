import axios from 'axios';
import { PopUpRecipeModal } from './pop-up-recipe-modal.js';

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

  try {
    await renderModalById();
  } catch (e) {
    console.log(e);
  }

  function hasLikeIconBeenClicked() {
    console.log(
      'target.dataset.like === undefined: ',
      target.dataset.like === undefined
    );
    return target.dataset.like !== undefined;
  }

  async function renderModalById() {
    const givenId = clickedCard.dataset.id;

    const response = await axios.get(`${recipeCardURL}/${givenId}`);
    const recipeData = await response.data;

    await new PopUpRecipeModal(recipeData).openModal();
  }
}

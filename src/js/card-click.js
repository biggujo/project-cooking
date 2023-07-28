import axios from 'axios';
import { PopUpRecipeModal } from './pop-up-recipe-modal.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio.js';

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
    return;
  }

  try {
    await renderModalById();
  } catch (e) {
    Notify.failure(e);
  }

  function hasLikeIconBeenClicked() {
    return target.dataset.like !== undefined;
  }

  async function renderModalById() {
    const givenId = clickedCard.dataset.id;

    const response = await axios.get(`${recipeCardURL}/${givenId}`);
    const recipeData = await response.data;

    await new PopUpRecipeModal(recipeData).openModal();
  }
}

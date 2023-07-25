// https://tasty-treats-backend.p.goit.global/api/recipes/recipeID;
import axios from 'axios';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal() {
  getRecipeInfo();
  window.addEventListener('keydown', onEscapeKeyPress);
  refs.backdrop.classList.remove('is-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscapeKeyPress);
  refs.backdrop.classList.add('is-hidden');
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscapeKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

// get Data for Modal Window

async function getRecipeInfo() {
  try {
    const apiUrl =
      'https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=6&time=160&area=Irish&ingredients=640c2dd963a319ea671e3796';
    const response = await fetch(apiUrl);
    const data = await response.json();
    const recipeData = data.results[0];

    console.log(recipeData);

    const ingredientsMarkup = recipeData.ingredients
      .map(({ id, measure }) => {
        return `<li class='ingred-li-item'>
                  <p class='ingred-name'>${id}</p>
                  <p class='ingred-amount'>${measure}</p>
              </li>`;
      })
      .join('');

    const tagsMarkup = recipeData.tags
      .map(tag => {
        return `<li>
                <p>#${tag}</p>
              </li>`;
      })
      .join('');

    const modalWindowRecipeMarkup = `
    <div class='switch-places'>
            <iframe
          class='video-link'
          src='https://www.youtube.com/embed/${getYouTubeVideoID(
            recipeData.youtube
          )}'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen
        ></iframe>
        <h1 class='pop-up-recipe-title'>${recipeData.title}</h1>
      </div>
        <div class='media-container'>
          <div class='rating'>
            <span class='middle-rate'>${recipeData.rating}</span>
            <ul class='stars-list'>
              <li><svg class='star-svg'>
                <use href='./img/icons.svg#star'></use>
              </svg></li>
              <li><svg class='star-svg'>
                <use href='./img/icons.svg#star'></use>
              </svg></li>
              <li><svg class='star-svg'>
                <use href='./img/icons.svg#star'></use>
              </svg></li>
              <li><svg class='star-svg'>
                <use href='./img/icons.svg#star'></use>
              </svg></li>
              <li><svg class='star-svg'>
                <use href='./img/icons.svg#star'></use>
              </svg></li>
            </ul>
            <span class='middle-time'>${recipeData.time}</span>
          </div>
          <div class='ingredientss'>
            <ul class='ingred-list'>
              ${ingredientsMarkup}
            </ul>
          </div>
             <ul class='hashtag-list'>
              ${tagsMarkup}
            </ul>
        </div>
            <p class='how-to-cook'>
                ${recipeData.instructions}
              </p>
        `;

    const modalWindow = document.querySelector('.modal');
    modalWindow.innerHTML = modalWindowRecipeMarkup;
  } catch (error) {
    console.log(error);
  }
}

function getYouTubeVideoID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

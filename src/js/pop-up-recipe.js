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
      'https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=6&time=160&area=Irish&ingredient=640c2dd963a319ea671e3796';
    const response = await fetch(apiUrl);
    const data = await response.json();
    const recipeData = data.results[0];

    const modalWindowRecipeMarkup = `
    <div class="switch-places">
            <iframe
          class="video-link"
          src="${recipeData.youtube}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <h1 class="pop-up-recipe-title">${recipeData.title}</h1>
      </div>
        <div class="media-container">
          <div class="rating">
            <span class="middle-rate">${recipeData.rating}</span>
            <ul class="stars-list">
              <li><svg class="star-svg">
                <use href="./img/icons.svg#star"></use>
              </svg></li>
              <li><svg class="star-svg">
                <use href="./img/icons.svg#star"></use>
              </svg></li>
              <li><svg class="star-svg">
                <use href="./img/icons.svg#star"></use>
              </svg></li>
              <li><svg class="star-svg">
                <use href="./img/icons.svg#star"></use>
              </svg></li>
              <li><svg class="star-svg">
                <use href="./img/icons.svg#star"></use>
              </svg></li>
            </ul>
            <span class="middle-time">${recipeData.time}</span>
          </div>
          <div class="ingredients">
            <ul class='ingred-list'>
              <li class='ingred-li-item'>
                  <p class="ingred-name">${recipeData.ingredient.id}</p>
                  <p class="ingred-amount">${recipeData.ingredient.measure}</p>
              </li>
              <li class='ingred-li-item'>
                  <p class="ingred-name">${recipeData.ingredient.id}</p>
                  <p class="ingred-amount">${recipeData.ingredient.measure}</p>
              </li>
              <li class='ingred-li-item'>
                  <p class="ingred-name">${recipeData.ingredient.id}</p>
                  <p class="ingred-amount">${recipeData.ingredient.measure}</p>
              </li>
              <li class='ingred-li-item'>
                  <p class="ingred-name">${recipeData.ingredient.id}</p>
                  <p class="ingred-amount">${recipeData.ingredient.measure}</p>
              </li>
              <li class='ingred-li-item'>
                  <p class="ingred-name">${recipeData.ingredient.id}</p>
                  <p class="ingred-amount">${recipeData.ingredient.measure}</p>
              </li>
              <li class='ingred-li-item'>
                  <p class="ingred-name">${recipeData.ingredient.id}</p>
                  <p class="ingred-amount">${recipeData.ingredient.measure}</p>
              </li>
            </ul>
          </div>
                 <ul class="hashtag-list">
              <li>
                <p>#${recipeData.tags[0]}</p>
               </li>
               <li>
                <p>#${recipeData.tags[1]}</p>
               </li>
               <li>
                <p>#${recipeData.tags[2]}</p>
               </li>
        </div>
      </ul>
            <p class="how-to-cook">
                ${recipeData.instructions}
              </p>
        `;

    const modalWindow = document.querySelector('.modal');
    modalWindow.innerHTML = modalWindowRecipeMarkup;
  } catch (error) {
    console.log('Error fetching data form server');
  }
}

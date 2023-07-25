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

    const ingredientsMarkup = recipeData.ingredients
      .map(({ id, measure }) => {
        return `<li class='ingred-li-item'>
                  <p class='ingred-name'>${id}</p>
                  <p class='ingred-amount'>${measure}</p>
              </li>`;
      })
      .join('');



    // if (ingredientsMarkup.id === showId._id) {
    //   const idName = showId.name;
    //   console.log(idName);
    // }



    const res = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/ingredients'
    );
    const arrOfIngredients = await res.json();
    console.log(arrOfIngredients);
    const showId = arrOfIngredients.map(ingredient => ingredient.name);
    console.log(showId);





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
          <div class='ingredients'>
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

    const modalWindow = document.querySelector('.modal-recipe-content');
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



// Add to FAVORITES

const favBtn  = document.querySelector('.fav');
favBtn.addEventListener('click', onFavBtnClick);
const localStorageData = [];

function onFavBtnClick(evt) {
  evt.preventDefault();
  console.log(evt.target);

  localStorageData.push(id); 
 
  localStorage.setItem('favorites', JSON.stringify(localStorageData));
}





function toggleFavourite(recipeTitle) {
  const heartIcon = document.querySelector(".like-icon");
  const isFilled = heartIcon.classList.contains("filled");

  if (!isFilled) {
    console.log("Add to favourites: ", recipeTitle);
    addToFavorites(recipeTitle);
  } else {
    console.log("Remove from favourites: ", recipeTitle);
    removeFromFavorites(recipeTitle);
  }
}

function addToFavorites(recipeTitle) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(recipeTitle)) {
    favorites.push(recipeTitle);
    saveToFavorites(favorites);
  }
}

function removeFromFavorites(recipeTitle) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.indexOf(recipeTitle);
  if (index !== -1) {
    favorites.splice(index, 1);
    saveToFavorites(favorites);
  }
}

function saveToFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function toggleHeartFill() {
  const heartIcon = document.querySelector(".like-icon");
  heartIcon.classList.toggle("filled");
}
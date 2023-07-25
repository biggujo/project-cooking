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
      'https://tasty-treats-backend.p.goit.global/api/recipes?category=Soup&page=1&limit=6&area=Ukrainian&ingredients=6462a8f74c3d0ddd288980d4';
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    const recipeData = data.results[0];
    // console.log(data.results[0]);

    // colorPickerOptions.find(option => option.label === "blue")
    const res = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/ingredients'
    );
    const arrOfIngredients = await res.json();

    // let idName = [];
    // const {id, measure} = recipeData.ingredients;
    //   const{_id, name} = arrOfIngredients;
    //   // console.dir(name);
    // // console.log(arrOfIngredients);
    // // const showId = arrOfIngredients.map(ingredient => ingredient.name);
    // // console.log(showId);
    // arrOfIngredients.forEach((element) => {
    //   // console.log(element.name);
    //   // console.log(id);
    //   // console.log(element._id);
    //   if(id === element._id){
    //     idName = element.name;

    //     return idName;
    //   }
    // });

    console.log(recipeData.ingredients);
    const ingredientsMarkup = recipeData.ingredients
      .map(({ id: originalId, measure }) => {
        const { name: ingredientName } = arrOfIngredients.find(
          ({ _id: ingredientIdToBeFound }) =>
            originalId === ingredientIdToBeFound
        );

        console.log(name);

        return `<li class='ingred-li-item'>
                  <p class='ingred-name'>${ingredientName}</p>
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

    // Add to FAVORITES

    const favBtn = document.querySelector('.fav');
    favBtn.addEventListener('click', onFavBtnClick);
    let localStorageData = [];

    function onFavBtnClick(evt) {
      const localStorCheck = localStorage.getItem('favorites');
      const parsed = JSON.parse(localStorCheck);
      console.log(parsed);

      if (!parsed) {
        localStorageData.push(`${recipeData.title}`);
        localStorage.setItem('favorites', JSON.stringify(localStorageData));
        favBtn.textContent = 'Remove from Favorites';
      } else if (localStorageData.includes(`${recipeData.title}`)) {
        favBtn.textContent = 'Remove from Favorites';
        localStorage.removeItem('favorites');
        favBtn.textContent = 'Add to Favorites';
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function getYouTubeVideoID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

// function toggleFavourite(recipeTitle) {
//   const heartIcon = document.querySelector(".like-icon");
//   const isFilled = heartIcon.classList.contains("filled");

//   if (!isFilled) {
//     console.log("Add to favourites: ", recipeTitle);
//     addToFavorites(recipeTitle);
//   } else {
//     console.log("Remove from favourites: ", recipeTitle);
//     removeFromFavorites(recipeTitle);
//   }
// }

// function addToFavorites(recipeTitle) {
//   let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   if (!favorites.includes(recipeTitle)) {
//     favorites.push(recipeTitle);
//     saveToFavorites(favorites);
//   }
// }

// function removeFromFavorites(recipeTitle) {
//   let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   const index = favorites.indexOf(recipeTitle);
//   if (index !== -1) {
//     favorites.splice(index, 1);
//     saveToFavorites(favorites);
//   }
// }

// function saveToFavorites(favorites) {
//   localStorage.setItem("favorites", JSON.stringify(favorites));
// }

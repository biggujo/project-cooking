import { PopUpModal } from './pop-up-modal.js';

export class PopUpRecipeModal extends PopUpModal {
  _recipeData;

  constructor(recipeData) {
    console.log('Dish description');
    super({
      openModalSelector: null,
      closeModalSelector: '[data-pop-up-recipe-close]',
      backdropSelector: '[data-pop-up-recipe-modal]',
    });

    this.recipeData = recipeData;
  }

  async openModal() {
    // Ingredients
    const res = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/ingredients'
    );
    const arrOfIngredients = await res.json();

    const ingredientsMarkup = this.recipeData.ingredients
      .map(({ id: originalId, measure }) => {
        const { name: ingredientName } = arrOfIngredients.find(
          ({ _id: ingredientIdToBeFound }) =>
            originalId === ingredientIdToBeFound
        );

        return `<li class='ingred-li-item'>
                  <p class='ingred-name'>${ingredientName}</p>
                  <p class='ingred-amount'>${measure}</p>
              </li>`;
      })
      .join('');

    let tagsMarkup = this.recipeData.tags
      .map(tag => {
        return `<li>
                <p>#${tag}</p>
              </li>`;
      })
      .join('');

    const videoMarkup = () => {
      if (!this.recipeData.youtube) {
        return `<img class='video-link' src='${this.recipeData.thumb}'>`;
      }

      return `<iframe
          class='video-link'
          src='https://www.youtube.com/embed/${PopUpRecipeModal.getYouTubeVideoID(
            this.recipeData.youtube
          )}'
      title='YouTube video player'
      frameborder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowfullscreen
      ></iframe>`;
    };

    const modalWindowRecipeMarkup = `
    <div class='switch-places'>
      ${videoMarkup()}
      <h1 class='pop-up-recipe-title'>${this.recipeData.title}</h1>
    </div>
      <div class='media-container'>
        <div class='rating'>
          <span class='middle-rate'>${this.recipeData.rating}</span>
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
          <span class='middle-time'>${this.recipeData.time}</span>
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
                ${this.recipeData.instructions}
              </p>
        `;

    const modalWindow = document.querySelector('.modal-recipe-content');
    modalWindow.innerHTML = modalWindowRecipeMarkup;

    // Add to favorites

    try {
      const favBtn = document.querySelector('.fav');
      favBtn.addEventListener('click', onFavBtnClick);

      let dishName = this.recipeData._id;
      console.log(dishName);

      let parsed = JSON.parse(localStorage.getItem('favorites')) || [];
      console.log(parsed);

      function onFavBtnClick() {
        if (!parsed.includes(dishName)) {
          console.log('Add to favourites: ', dishName);
          parsed.push(dishName);
          saveToFavorites(parsed);
          favBtn.textContent = 'Remove from Favorites';
        } else {
          console.log('Remove from favourites: ', dishName);
          const index = parsed.indexOf(dishName);
          if (index !== -1) {
            parsed.splice(index, 1);
            saveToFavorites(parsed);
            favBtn.textContent = 'Add to Favorites';
          }
        }
      }

      function saveToFavorites(parsed) {
        localStorage.setItem('favorites', JSON.stringify(parsed));
      }
    } catch (error) {
      console.log(error);
    }

    this.onOpenModal();
  }

  static getYouTubeVideoID(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  get recipeData() {
    return this._recipeData;
  }

  set recipeData(value) {
    this._recipeData = value;
  }
}

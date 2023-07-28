import { PopUpRatingModal } from './pop-up-rating-modal';

export class PopUpRecipeModal {
  _recipeData;
  refs;
  ratingBtnRef;

  constructor(recipeData) {
    console.log('Dish description');
    this.refs = {
      openModalBtns: document.querySelectorAll(null),
      closeModalBtn: document.querySelector('[data-pop-up-recipe-close]'),
      backdrop: document.querySelector('[data-pop-up-recipe-modal]'),
    };
    this.recipeData = recipeData;
    this.ratingBtnRef = document.querySelector('.rating-btn');

    this.refs.closeModalBtn.addEventListener(
      'click',
      this.onCloseModal.bind(this)
    );
    this.refs.backdrop.addEventListener(
      'click',
      this.onBackdropClick.bind(this)
    );
  }

  onOpenModal = () => {
    console.log('Open!');
    window.addEventListener('keydown', this.onEscapeKeyPress);
    this.refs.backdrop.classList.remove('is-hidden');
    this.ratingBtnRef.addEventListener('click', this.onRatingBtnClick);
  };

  onCloseModal = () => {
    this.ratingBtnRef.removeEventListener('click', this.onRatingBtnClick);
    const favBtn = document.querySelector('.fav');
    favBtn.removeEventListener('click', this.onFavBtnClick);

    window.removeEventListener('keydown', this.onEscapeKeyPress);
    this.refs.backdrop.classList.add('is-hidden');
  };

  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.onCloseModal();
    }
  };

  onRatingBtnClick = () => {
    new PopUpRatingModal(this.recipeData._id).onOpenModal();
  };

  onEscapeKeyPress = e => {
    console.log(e);
    if (e.code === 'Escape') {
      this.onCloseModal();
    }
  };

  async openModal() {
    const ingredientsMarkup = this.recipeData.ingredients
      .map(
        ({ name, measure }) => `
      <li class='ingred-li-item'>
        <p class='ingred-name'>${name}</p>
        <p class='ingred-amount'>${measure}</p>
      </li>`
      )
      .join('');

    let tagsMarkup = this.recipeData.tags
      .map(tag => {
        if (tag.length)
          return `
        <li>
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

    const cardRef = document.querySelector(
      `[data-id="${this.recipeData._id}"]`
    );
    const ratingContainerRef = cardRef.querySelector('.rating-stars');

    const modalWindowRecipeMarkup = `
    <div class='switch-places'>
      ${videoMarkup()}
      <h1 class='pop-up-recipe-title'>${this.recipeData.title}</h1>
    </div>
      <div class='media-container'>
        <div class='div-rating'>
          <span class='middle-rate'>${this.recipeData.rating}</span>
          ${ratingContainerRef.outerHTML}
          <span class='middle-time'>${this.recipeData.time} min</span>
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
      let dishId = this.recipeData._id;
      let favortiesIdsArray =
        JSON.parse(localStorage.getItem('favorites')) || [];

      const favBtn = document.querySelector('.fav');
      const ratingBtn = document.querySelector('.btn');
      favBtn.addEventListener('click', this.onFavBtnClick);

      if (favortiesIdsArray.includes(dishId)) {
        favBtn.textContent = 'Remove from Favorites';
      } else {
        favBtn.textContent = 'Add to Favorites';
      }
    } catch (error) {
      console.log(error);
    }

    this.onOpenModal();
  }

  onFavBtnClick = () => {
    const dishId = this._recipeData._id;
    let favortiesIdsArray = JSON.parse(localStorage.getItem('favorites')) || [];
    const favBtn = document.querySelector('.fav');

    function saveToFavorites(parsed) {
      localStorage.setItem('favorites', JSON.stringify(parsed));
    }

    function toggleFavIconFill(dishId) {
      const cardRef = document.querySelector(`[data-id='${dishId}']`);
      const favIconRef = cardRef.querySelector('.like-icon');

      favIconRef.classList.toggle('filled');
    }

    toggleFavIconFill(dishId);

    if (!favortiesIdsArray.includes(dishId)) {
      console.log('Add to favourites: ', dishId);
      favortiesIdsArray.push(dishId);
      saveToFavorites(favortiesIdsArray);
      favBtn.textContent = 'Remove from Favorites';
    } else {
      console.log('Remove from favourites: ', dishId);
      const index = favortiesIdsArray.indexOf(dishId);
      if (index !== -1) {
        favortiesIdsArray.splice(index, 1);
        saveToFavorites(favortiesIdsArray);
        favBtn.textContent = 'Add to Favorites';
      }
    }
  };

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

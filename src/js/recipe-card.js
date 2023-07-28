import { all } from 'axios';

const removeFromFavoritesEvent = new Event('remove-from-favorites');

export class RecipeCard {
  static BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

  _recipeData;
  _recipeCardEl;

  constructor() {}

  init = async recipeId => {
    const response = await fetch(`${RecipeCard.BASE_URL}/${recipeId}`);
    this.recipeData = await response.json();

    this.recipeCardEl = RecipeCard.createCardElement({
      data: this.recipeData,
      id: recipeId,
    });

    this.updateRatingStars(this.recipeData.rating);

    const heartIcon = this.recipeCardEl.querySelector('.like-icon');
    heartIcon.addEventListener('click', () => {
      this.toggleFavourite({
        recipeId: this.recipeData._id,
        recipeTitle: this.recipeData.title,
      });
      this.toggleHeartFill();
    });

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(this.recipeData._id)) {
      heartIcon.classList.add('filled');
    }

    return this;
  };

  static createCardElement({ data, id }) {
    const cardEl = document.createElement('div');

    cardEl.classList.add('recipe-card');
    cardEl.style.background = `linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url('${data.thumb}'), lightgray -36.5px 0px / 129.2% 112.544% no-repeat`;
    cardEl.style.backgroundPosition = 'center';
    cardEl.style.backgroundSize = 'cover';
    cardEl.dataset.id = id;

    cardEl.classList.add('recipe-card');

    const recipeInner = document.createElement('div');
    recipeInner.classList.add('recipe-card-inner');
    cardEl.appendChild(recipeInner);

    const likeWrapperEl = document.createElement('span');
    likeWrapperEl.innerHTML = `<svg class='like-icon' data-like><use href='./img/icons.svg#like' data-like></use></svg>`;
    recipeInner.appendChild(likeWrapperEl);

    const subtitle = document.createElement('h2');
    subtitle.classList.add('recipe-title');
    subtitle.textContent = data.title;
    recipeInner.appendChild(subtitle);

    const description = document.createElement('p');
    description.classList.add('recipe-description');
    description.textContent = data.description;
    recipeInner.appendChild(description);

    const info = document.createElement('div');
    info.classList.add('card-information');

    const rating = document.createElement('div');
    rating.classList.add('rating');
    info.appendChild(rating);

    const recipeBtn = document.createElement('button');
    recipeBtn.textContent = 'See recipe';
    recipeBtn.classList.add('recipe-button');
    info.appendChild(recipeBtn);

    recipeInner.appendChild(info);

    const ratingNumber = document.createElement('div');
    ratingNumber.classList.add('rating-number');

    ratingNumber.textContent = data.rating.toFixed(1);
    rating.appendChild(ratingNumber);

    const ratingStars = document.createElement('div');
    ratingStars.classList.add('rating-stars');
    rating.appendChild(ratingStars);

    ratingStars.innerHTML = `<span class='rating-star'><svg class='rating-star-icon'><use href='./img/icons.svg#star'></use>
    </svg></span><span class='rating-star'><svg class='rating-star-icon'><use href='./img/icons.svg#star'></use>
    </svg></span><span class='rating-star'><svg class='rating-star-icon'><use href='./img/icons.svg#star'></use>
    </svg></span><span class='rating-star'><svg class='rating-star-icon'><use href='./img/icons.svg#star'></use>
    </svg></span><span class='rating-star'><svg class='rating-star-icon'><use href='./img/icons.svg#star'></use>
    </svg></span>`;

    return cardEl;
  }

  updateRatingStars(rating) {
    const ratingContainer = this.recipeCardEl.querySelector('.rating-stars');
    const allStars = ratingContainer.querySelectorAll('.rating-star');

    const filledStars = Math.floor(rating);
    const fractionPartOfStar = rating % 1;

    for (let i = 0; i < filledStars; i++) {
      allStars[i].classList.add('filled');
    }

    if (filledStars === 5 || fractionPartOfStar === 0) {
      return;
    }

    const filledPercentageOfStar = Math.floor(fractionPartOfStar * 100);

    allStars[filledStars].innerHTML = this.createLastStart(
      filledPercentageOfStar
    );
  }

  createLastStart(filledPart) {
    return `<svg class='rating-star-icon'>
      <linearGradient id='myGradient${filledPart}' gradientTransform='rotate(0)'>
        <stop offset='0%' stop-color='var(--color-star-marked)' />
        <stop offset='${filledPart}%' stop-color='var(--color-star-marked)' />
        <stop offset='${filledPart}%' stop-color='var(--color-star-unmarked)' />
        <stop offset='100%' stop-color='var(--color-star-unmarked)' />
      </linearGradient>
      <use href='./img/icons.svg#star' fill='url(#myGradient${filledPart})'></use>
    </svg>`;
  }

  toggleFavourite({ recipeId, recipeTitle }) {
    const heartIcon = this.recipeCardEl.querySelector('.like-icon');
    const isFilled = heartIcon.classList.contains('filled');

    if (!isFilled) {
      console.log('Add to favourites: ', recipeTitle);
      this.addToFavorites(recipeId);
    } else {
      console.log('Remove from favourites: ', recipeTitle);
      this.removeFromFavorites(recipeId);
    }
  }

  addToFavorites(recipeTitle) {
    try {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.includes(recipeTitle)) {
        favorites.push(recipeTitle);
        this.saveToFavorites(favorites);
      }
    } catch (error) {
      console.log(error);
    }
  }

  removeFromFavorites(recipeTitle) {
    try {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const index = favorites.indexOf(recipeTitle);
      if (index !== -1) {
        favorites.splice(index, 1);
        this.saveToFavorites(favorites);
      }
    } catch (error) {
      console.log(error);
    }
  }

  saveToFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  toggleHeartFill() {
    const heartIcon = this.recipeCardEl.querySelector('.like-icon');
    heartIcon.classList.toggle('filled');
  }

  get recipeData() {
    return this._recipeData;
  }

  set recipeData(value) {
    this._recipeData = value;
  }

  get recipeCardEl() {
    return this._recipeCardEl;
  }

  set recipeCardEl(value) {
    this._recipeCardEl = value;
  }
}

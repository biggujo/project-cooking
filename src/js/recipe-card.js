export class RecipeCard {
  static BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

  _recipeData;
  _recipeCardEl;

  constructor() {}

  init = async recipeId => {
    const response = await fetch(`${RecipeCard.BASE_URL}/${recipeId}`);
    this.recipeData = await response.json();

    this.recipeCardEl = RecipeCard.createCardElement(this.recipeData);

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

    return this.recipeCardEl;
  };

  static createCardElement(recipeData) {
    const cardEl = document.createElement('div');

    cardEl.classList.add('recipe-card');
    cardEl.style.background = `url("${recipeData.preview}")`;

    const svg = document.createElement('svg');
    svg.classList.add('like-icon');
    svg.style.fill = 'none';
    cardEl.appendChild(svg);

    const svgUse = document.createElement('use');
    svgUse.href = './img/icons.svg#like';
    svg.appendChild(svgUse);

    const subtitle = document.createElement('h2');
    subtitle.classList.add('recipe-title');
    subtitle.textContent = recipeData.title;
    cardEl.appendChild(subtitle);

    const description = document.createElement('p');
    description.classList.add('recipe-description');
    description.textContent = recipeData.description;
    cardEl.appendChild(description);

    const rating = document.createElement('div');
    rating.classList.add('rating');
    cardEl.appendChild(rating);

    const ratingNumber = document.createElement('div');
    ratingNumber.classList.add('rating-number');
    ratingNumber.textContent = recipeData.rating;
    rating.appendChild(ratingNumber);

    const ratingStars = document.createElement('div');
    ratingStars.classList.add('rating-stars');
    rating.appendChild(ratingStars);

    return cardEl;
  }

  updateRatingStars(rating) {
    const ratingContainer = this.recipeCardEl.querySelector('.rating-stars');
    const filledStars = Math.round(rating);
    const emptyStars = 5 - filledStars;

    let ratingStarsHTML = '';
    for (let i = 0; i < filledStars; i++) {
      ratingStarsHTML += '<span class="rating-star filled">&#9733;</span>';
    }
    for (let i = 0; i < emptyStars; i++) {
      ratingStarsHTML += '<span class="rating-star">&#9733;</span>';
    }

    ratingContainer.innerHTML = ratingStarsHTML;
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
    const heartIcon = document.querySelector('.like-icon');
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

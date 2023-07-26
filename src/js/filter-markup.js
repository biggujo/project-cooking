async function fetchRecipeData() {
  try {
    const apiUrl =
      'https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=6&time=160&area=Irish&ingredients=640c2dd963a319ea671e3796';
    const response = await fetch(apiUrl);
    const data = await response.json();
    const recipeData = data.results[0];

    const recipeCardTemplate = `
      <div class='recipe-card' style='background-image: url("https://placeholder.co/400");'>
        <svg class='like-icon' fill='none'>
          <use href='./img/icons.svg#like' />
        </svg>
        <h2 class='recipe-title'>${recipeData.title}</h2>
        <p class='recipe-description'>${recipeData.description}</p>
        <div class='rating'>
          <div class='rating-number'>${recipeData.rating}</div>
          <div class='rating-stars'></div>
        </div>
      </div>
    `;

    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = recipeCardTemplate;
    updateRatingStars(recipeData.rating);

    const heartIcon = recipeContainer.querySelector('.like-icon');
    heartIcon.addEventListener('click', function () {
      toggleFavourite({
        recipeId: recipeData._id,
        recipeTitle: recipeData.title,
      });
      toggleHeartFill();
    });

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(recipeData._id)) {
      heartIcon.classList.add('filled');
    }
  } catch (error) {
    console.error('Error fetching data from the backend:', error);
  }
}

function updateRatingStars(rating) {
  const ratingContainer = document.querySelector('.rating-stars');
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

function toggleFavourite({ recipeId, recipeTitle }) {
  const heartIcon = document.querySelector('.like-icon');
  const isFilled = heartIcon.classList.contains('filled');

  if (!isFilled) {
    console.log('Add to favourites: ', recipeTitle);
    addToFavorites(recipeId);
  } else {
    console.log('Remove from favourites: ', recipeTitle);
    removeFromFavorites(recipeId);
  }
}

function addToFavorites(recipeTitle) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(recipeTitle)) {
    favorites.push(recipeTitle);
    saveToFavorites(favorites);
  }
}

function removeFromFavorites(recipeTitle) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.indexOf(recipeTitle);
  if (index !== -1) {
    favorites.splice(index, 1);
    saveToFavorites(favorites);
  }
}

function saveToFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleHeartFill() {
  const heartIcon = document.querySelector('.like-icon');
  heartIcon.classList.toggle('filled');
}

fetchRecipeData();

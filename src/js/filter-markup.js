async function fetchRecipeData() {
  try {
    const apiUrl =
      'https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=6&time=160&area=Irish&ingredients=640c2dd963a319ea671e3796';
    const response = await fetch(apiUrl);
    const data = await response.json();
    const recipeData = data.results[0];

    const recipeCardTemplate = `
        <div class='recipe-card' style='background-image: url("https://placeholder.co/400");'>
          <svg class='like-icon'>
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

    const heartIcon = recipeContainer.querySelector('.heart-icon');
    heartIcon.addEventListener('click', function () {
      toggleFavourite(recipeData.title);
    });
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

function toggleFavourite(recipeTitle) {
  const heartIcon = document.querySelector('.heart-icon');
  const isFilled = heartIcon.classList.contains('active');

  if (isFilled) {
    console.log('Remove from favourites: ', recipeTitle);
  } else {
    console.log('Add to favourites: ', recipeTitle);
  }

  heartIcon.classList.toggle('active');
}

fetchRecipeData();

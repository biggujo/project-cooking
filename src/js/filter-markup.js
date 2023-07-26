function scrollToTop() {
  const scrollDuration = 300;
  const scrollStep = -window.scrollY / (scrollDuration / 15);

  const scrollInterval = setInterval(function () {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}

window.addEventListener("scroll", function () {
  const scrollUpBtn = document.querySelector(".scroll-up-btn");

  if (scrollUpBtn && window.scrollY > 100) {
    scrollUpBtn.style.display = "block";
  } else if (scrollUpBtn) {
    scrollUpBtn.style.display = "none";
  }
});

const scrollUpBtn = document.querySelector(".scroll-up-btn");
if (scrollUpBtn) {
  scrollUpBtn.addEventListener("click", function () {
    scrollToTop();
  });
}

async function fetchRecipeData() {
  try {
    const apiUrl =
      "https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=6&time=160&area=Irish&ingredients=640c2dd963a319ea671e3796";
    const response = await fetch(apiUrl);
    const data = await response.json();
    const recipeData = data.results[0];

    const recipeCardTemplate = `
      <div class='recipe-card' style='background-image: url("https://placeholder.co/400");'>
        <svg class='like-icon' fill="none">
          <use href='./img/icons.svg#like' />
        </svg>
        <h2 class='recipe-title'>${recipeData.title}</h2>
        <p class='recipe-description'>${recipeData.description}</p>
        <div class='rating'>
          <div class='rating-number'>${recipeData.rating}</div>
          <div class='rating-stars' style='--filled-percentage: ${Math.round((recipeData.rating / 5) * 100)}%'></div>
        </div>
        <div class="see-recipe-btn">See Recipe</div>
      </div>
    `;

    const recipeContainer = document.getElementById("recipe-container");
    recipeContainer.innerHTML = recipeCardTemplate;
    updateRatingStars(recipeData.rating);

    const heartIcon = recipeContainer.querySelector(".like-icon");
    heartIcon.addEventListener("click", function () {
      toggleFavourite(recipeData.title);
      toggleHeartFill();
    });

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(recipeData.title)) {
      heartIcon.classList.add("filled");
    }
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
  }
}

function updateRatingStars(rating) {
  const ratingContainer = document.querySelector(".rating-stars");
  const filledStars = Math.floor(rating);
  const fraction = rating - filledStars;
  const filledPercentage = (Math.round(fraction * 1000) / 10).toFixed(1);

  let ratingStarsHTML = "";
  for (let i = 0; i < filledStars; i++) {
    ratingStarsHTML += '<span class="rating-star filled with-color">&#9733;</span>'; // Додайте клас .with-color тут
  }
  if (fraction > 0) {
    ratingStarsHTML +=
      '<span class="rating-star filled with-color" style="--filled-percentage: ' +
      filledPercentage +
      '%">&#9733;</span>'; // Та також додайте клас .with-color тут
  }
  const emptyStars = 5 - filledStars - (fraction > 0 ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    ratingStarsHTML += '<span class="rating-star">&#9733;</span>';
  }

  ratingContainer.innerHTML = ratingStarsHTML;
}

function toggleFavourite(recipeTitle) {
  const heartIcon = document.querySelector(".like-icon");
  const isFilled = heartIcon.classList.contains("filled");

  if (!isFilled) {
    addToFavorites(recipeTitle);
  } else {
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

fetchRecipeData();

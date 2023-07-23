// Функція для отримання даних рецепту з бекенду та створення картки рецепту
async function fetchRecipeData() {
  try {

    const apiUrl = "https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=6&time=160&area=Irish&ingredients=640c2dd963a319ea671e3796";
    const response = await fetch(apiUrl);
    const data = await response.json();
    const recipeData = data.recipes[0]; 

    const recipeCardTemplate = `
      <div class="recipe-card">
        <h2 class="recipe-title">${recipeData.title}</h2>
        <p class="recipe-description">${recipeData.description}</p>
        <div class="rating">Rating: ${recipeData.rating}</div>
        <button class="see-recipe-btn">See Recipe</button>
        <svg class="icon-close"></svg>
      </div>
    `;


    const recipeContainer = document.getElementById("recipe-container");
    recipeContainer.innerHTML = recipeCardTemplate;
    const seeRecipeButton = document.querySelector(".see-recipe-btn");
    seeRecipeButton.addEventListener("click", () => {
      
      console.log("Переглянути рецепт");
    });
  } catch (error) {
    console.error("Помилка при отриманні даних з бекенду:", error);
  }
}
fetchRecipeData();

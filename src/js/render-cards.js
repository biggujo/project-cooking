import { filtersResultForQuery } from './filters.js';
import { RecipeCard } from './recipe-card';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const renderedCards = document.getElementById('rendered-cards-for-favourites');
const API_URL = 'https://tasty-treats-backend.p.goit.global/api';

let limit = checkMediaQueriesByClick();
const url = buildRecipeURL(filtersResultForQuery, limit);
axiosRequestForRenderCards(url);

function axiosRequestForRenderCards(url) {
  return axios
    .get(url)
    .then(response => {
      const recipes = response.data.results;
      console.log(recipes);
      if (recipes.length === 0) {
        Notify.failure(
          'Sorry, nothing found. Change your filters, or check the entered values.'
        );
      }
      const recipeCardPromises = recipes.map(recipe => {
        return new RecipeCard().init(recipe._id);
      });

      return Promise.all(recipeCardPromises).then(recipeCardEls => {
        recipeCardEls.forEach(recipeCardEl => {
          renderedCards.prepend(recipeCardEl._recipeCardEl);
        });
      });
    })
    .catch(error => {
      Notify.failure('Sorry, there is something wrong with your request!');
      throw error;
    });
}

function buildRecipeURL(filters, limit) {
  let url = `${API_URL}/recipes/?limit=${limit}`;

  if (filters.category) {
    url += `&category=${filters.category}`;
  }
  if (filters.title) {
    url += `&title=${filters.title}`;
  }
  if (filters.time) {
    url += `&time=${filters.time}`;
  }
  if (filters.area) {
    url += `&area=${filters.area}`;
  }
  if (filters.ingredient) {
    url += `&ingredient=${filters.ingredient}`;
  }

  return url;
}

function checkMediaQueriesByClick() {
  let limit = null;
  const mediaQuery768 = window.matchMedia('(max-width: 768px)');
  const mediaQuery769to1160 = window.matchMedia(
    '(min-width: 769px) and (max-width: 1160px)'
  );
  const mediaQueryMin1161 = window.matchMedia('(min-width: 1161px)');
  if (mediaQuery768.matches) {
    limit = 5;
  } else if (mediaQuery769to1160.matches) {
    limit = 8;
  } else if (mediaQueryMin1161.matches) {
    limit = 9;
  }
  return limit;
}

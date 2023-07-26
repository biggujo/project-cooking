import axios from 'axios';

const listDiv = document.querySelector('.popular-recipes-list');
const popularRecipesItems = document.querySelectorAll('.popular-recipes-item');
const loader = document.querySelector('.loader');

// function showLoader() {
//   loader.classList.remove('is-hidden');
//   listDiv.classList.add('is-hidden');
// }
function hideLoader() {
  loader.classList.add('is-hidden');
}

function throttle(f, t) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall === undefined || this.lastCall - previousCall > t) {
      f(args);
    }
  };
}

function getEventData() {
  return axios
    .get('https://tasty-treats-backend.p.goit.global/api/recipes/popular')
    .then(response => response.data);
}

function renderPopular(item) {
  return `
    <li class="popular-recipes-item" attribute-id="${item._id}">
      <img class="popular-recipes-image" src="${item.preview}" alt="${item.title}" />
      <div class="popular-recipes-text">
        <h3 class="popular-recipes-text-title">${item.title}</h3>
        <p class="popular-recipes-text-description">${item.description}</p>
      </div>
    </li>
  `;
}

function renderPopularItems(data) {
  listDiv.innerHTML = '';
  const maxIterations = window.screen.availWidth < 768 ? 2 : data.length;
  for (let i = 0; i < maxIterations; i++) {
    const item = data[i];
    const masterClassHTML = renderPopular(item);
    listDiv.innerHTML += masterClassHTML;
    hideLoader();
  }
}

export function popular() {
  function resize() {
    getEventData()
      .then(data => {
        renderPopularItems(data);
      })
      .catch(error => console.error(error));
  }

  window.addEventListener('resize', throttle(resize, 100));
  resize();
}

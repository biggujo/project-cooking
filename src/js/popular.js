const listDiv = document.querySelector('.popular-recipes-list');
const loader = document.querySelector('.loader');

// function showLoader() {
//   loader.classList.remove('is-hidden');
//   listDiv.classList.add('is-hidden');
// }
function hideLoader() {
  loader.classList.add('is-hidden');
}

function truncateText(text, limit) {
  if (text.length <= limit) {
    return text;
  } else {
    return text.slice(0, limit) + '...';
  }
}

function getTruncateLength() {
  const screenWidth = window.screen.availWidth;

  if (screenWidth < 768) {
    return 80;
  } else if (screenWidth >= 768 && screenWidth < 1280) {
    return 64;
  } else if (screenWidth >= 1280) {
    return 85;
  }
}

// const getEventData = async () => {

function getEventData() {
  return fetch(
    'https://tasty-treats-backend.p.goit.global/api/recipes/popular'
  ).then(response => response.json());
}

function renderPopular(item) {
  const truncatedDescription = truncateText(
    item.description,
    getTruncateLength()
  );
  return `
    <li class="popular-recipes-item" attribute-id="${item._id}">
      <img class="popular-recipes-image" src="${item.preview}" alt="${item.title}" />
      <div class="popular-recipes-text">
        <h3 class="popular-recipes-text-title">${item.title}</h3>
        <p class="popular-recipes-text-description">${truncatedDescription}</p>
      </div>
    </li>
  `;
}
export function popular() {
  function renderPopularItems(data) {
    listDiv.innerHTML = '';
    const maxIterations = window.screen.availWidth < 768 ? 2 : data.length;
    for (let i = 0; i < maxIterations; i++) {
      const item = data[i];
      const masterClassHTML = renderPopular(item);
      listDiv.innerHTML += masterClassHTML;
      hideLoader();
    }

    const popularRecipesItems = document.querySelectorAll(
      '.popular-recipes-item'
    );
    popularRecipesItems.forEach(item => {
      item.addEventListener('click', () => {
        const attributeId = item.getAttribute('attribute-id');
        function getId() {
          return fetch(
            `https://tasty-treats-backend.p.goit.global/api/recipes/${attributeId}`
          )
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error(error);
            });
        }
        getId();
      });
    });
  }

  let resizeTimer;
  function handleResize() {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(() => {
      getEventData()
        .then(data => {
          renderPopularItems(data);
        })
        .catch(error => console.error(error));
    }, 100);
  }

  window.addEventListener('resize', handleResize);
  handleResize();
}

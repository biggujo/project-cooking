const listDiv = document.querySelector('.popular-recipes-list');
<<<<<<< Updated upstream

// window.screen.availWidth < 720;
=======
const loader = document.querySelector('.loader');

// function showLoader() {
//   loader.classList.remove('is-hidden');
//   listDiv.classList.add('is-hidden');
// }
function hideLoader() {
  loader.classList.add('is-hidden');
}
>>>>>>> Stashed changes

function truncateText(text, limit) {
  if (text.length <= limit) {
    return text;
  } else {
    return text.slice(0, limit) + '...';
  }
}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
function getTruncateLength() {
  const screenWidth = window.screen.availWidth;

  if (screenWidth < 768) {
    return 80;
<<<<<<< Updated upstream
  } else if (screenWidth >= 768 && screenWidth < 1024) {
    return 64;
  } else if (screenWidth > 1024) {
=======
  } else if (screenWidth >= 768 && screenWidth < 1280) {
    return 64;
  } else if (screenWidth >= 1280) {
>>>>>>> Stashed changes
    return 85;
  }
}

<<<<<<< Updated upstream
=======
// const getEventData = async () => {

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        <li class="popular-recipes-item">
          <img class="popular-recipes-image" src="${item.preview}" alt="${item.title}" />
          <div class="popular-recipes-text">
            <h3 class="popular-recipes-text-title">${item.title}</h3>
            <p class="popular-recipes-text-description">${truncatedDescription}</p>
          </div>
        </li>
=======
    <li class="popular-recipes-item" attribute-id="${item._id}">
      <img class="popular-recipes-image" src="${item.preview}" alt="${item.title}" />
      <div class="popular-recipes-text">
        <h3 class="popular-recipes-text-title">${item.title}</h3>
        <p class="popular-recipes-text-description">${truncatedDescription}</p>
      </div>
    </li>
>>>>>>> Stashed changes
  `;
}
export function popular() {
  function renderPopularItems(data) {
    listDiv.innerHTML = '';
<<<<<<< Updated upstream

    data.forEach((item, index) => {
      if (window.screen.availWidth < 768 && index >= 2) {
        return;
      }

      const masterClassHTML = renderPopular(item);
      listDiv.innerHTML += masterClassHTML;
=======
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
>>>>>>> Stashed changes
    });
  }

  let resizeTimer;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    }, 300);
=======
    }, 100);
>>>>>>> Stashed changes
  }

  window.addEventListener('resize', handleResize);
  handleResize();
}
<<<<<<< Updated upstream
// document.addEventListener(
//   'scroll',
//   _.throttle(() => {
//     console.log('Scroll handler call every 300ms');
//   }, 300)
// );

let screenObj = window.screen;
console.log(screenObj);
const screenAvailWidth = window.screen.availWidth;

console.log(screenAvailWidth);

// const listDiv = document.querySelector('.popular-recipes-list');
// console.log(document.querySelector('.popular-recipes-list'));
// function getEventData() {
//   return fetch(
//     'https://tasty-treats-backend.p.goit.global/api/recipes/popular'
//   ).then(response => response.json());
// }
// function renderPopular(item) {
//   return `
//         <li class="popular-recipes-item">
//           <img class="popular-recipes-image" src="${item.preview}" alt="${item.title}" />
//           <div class="popular-recipes-text">
//             <h3 class="popular-recipes-text-title">${item.title}</h3>
//             <p class="popular-recipes-text-description">${item.description}</p>
//           </div>
//         </li>
//   `;
// }

// export function popular() {
//   getEventData()
//     .then(data => {
//       data.forEach(item => {
//         const masterClassHTML = renderPopular(item);
//         listDiv.innerHTML += masterClassHTML;
//       });
//     })
//     .catch(error => console.error(error));
// }
=======
>>>>>>> Stashed changes

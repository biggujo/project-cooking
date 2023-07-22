const listDiv = document.querySelector('.popular-recipes-list');

// window.screen.availWidth < 720;

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
  } else if (screenWidth >= 768 && screenWidth < 1024) {
    return 64;
  } else if (screenWidth > 1024) {
    return 85;
  }
}

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
        <li class="popular-recipes-item">
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

    data.forEach((item, index) => {
      if (window.screen.availWidth < 768 && index >= 2) {
        return;
      }

      const masterClassHTML = renderPopular(item);
      listDiv.innerHTML += masterClassHTML;
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
    }, 300);
  }

  window.addEventListener('resize', handleResize);
  handleResize();
}
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

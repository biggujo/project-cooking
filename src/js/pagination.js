import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const BASE_API_URL = 'https://tasty-treats-backend.p.goit.global/api';
const paginationContainer = document.getElementById('pagination');

function fetchRecipes(page, limit) {
  const url = `${BASE_API_URL}/recipes?page=${page}&limit=${limit}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('ERROR', error);
      }
      return response.json();
    })
    .then(recipes => {
      console.log(recipes);
    })
    .catch(error => {
      console.error('ERROR', error);
    });
}

const findLimitOfCards = () => {
  const currentWindowWidth = document.documentElement.clientWidth;
  let limitCount = 0;

  if (currentWindowWidth < 768) {
    limitCount = 6;
  } else if (currentWindowWidth >= 768 && currentWindowWidth < 1160) {
    limitCount = 8;
  } else if (currentWindowWidth >= 1160) {
    limitCount = 9;
  }

  return limitCount;
};

const currentWindowWidth = document.documentElement.clientWidth;

const pagination = new Pagination(paginationContainer, {
  totalItems: 1000,
  itemsPerPage: 100,
  visiblePages: currentWindowWidth < 768 ? 2 : 3,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="pag__page-btn tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="pag__current-page tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="pag__btn-move tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="pag__btn-move pag__btn-disabled tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
});

pagination.on('afterMove', event => {
  const { page } = event;
  const limit = findLimitOfCards();
  fetchRecipes(page, limit);
});

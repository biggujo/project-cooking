import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const paginationContainer = document.getElementById('pagination');

const currentWindowWidth = document.documentElement.clientWidth;
let limitCount = 0;

if (currentWindowWidth < 768) {
  limitCount = 6;
} else if (currentWindowWidth >= 768 && currentWindowWidth < 1160) {
  limitCount = 8;
} else if (currentWindowWidth >= 1160) {
  limitCount = 9;
}

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

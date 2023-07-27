import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { fetchEvents } from './fetchEvents';
import { createHeroSliderMarkup } from './createHeroSliderMarkup.js';

const eventsSwiperRef = document.querySelector('.swiper-wrapper');

const loader = document.querySelector('.load-hero');
function hideLoader() {
  loader.classList.add('is-hidden');
}

fetchEvents().then(async resp => {
  const eventsMarkup = await createHeroSliderMarkup(resp);

  eventsSwiperRef.innerHTML = eventsMarkup;

  const swiper = new Swiper('.mySwiper', {
    loop: true,
    modules: [Pagination],
    spaceBetween: 8,
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
    },
    pagination: {
      clickable: true,
      el: '.swiper-pagination',
    },
  });
  hideLoader();
});

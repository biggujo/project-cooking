// * An example of import
import { sayHello } from './js/test.js';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { fetchEvents } from './js/fetchEvents.js';
import { createHeroSliderMarkup } from './js/createHeroSliderMarkup.js';

const eventsSwiperRef = document.querySelector('.swiper-wrapper');

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
      el: '.swiper-pagination',
    },
  });
});

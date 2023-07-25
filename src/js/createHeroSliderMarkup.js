export const createHeroSliderMarkup = async data => {
  return (await data)
    .map(({ cook, topic }, index) => {
      return `
        <div class="swiper-slide hero-swiper-slide hero-swiper-slide-${
          index + 1
        }" style="display: flex">
          <div class="hero-swiper-slide-wrapper hero-cook-slide-wrapper"><img class="hero-swiper-img" src="${
            cook.imgWebpUrl
          }" alt="${cook.name}"></div>
          <div class="hero-swiper-slide-wrapper hero-info-slide-wrapper">
            <img class="hero-swiper-info-img" src="${
              topic.previewWebpUrl
            }" alt="${topic.name}">
            <div class="hero-swiper-info-descr">
              <p class="hero-swiper-info-dish">${topic.name}</p>
              <span class="hero-swiper-info-country">${topic.area}</span>
            </div>
          </div>
          <div class="hero-swiper-slide-wrapper hero-img-slide-wrapper"><img class="hero-swiper-img hero-swiper-dish-img" src="${
            topic.imgWebpUrl
          }" alt="${topic.name}"></div>
        </div>
   `;
    })
    .join('');
};

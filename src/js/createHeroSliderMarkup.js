export const createHeroSliderMarkup = async data => {
  console.log(await data);
  return (await data)
    .map(({ cook, topic }) => {
      return `
        <div class="swiper-slide hero-swiper-slide">
          <div class="hero-swiper-slide-wrapper hero-cook-slide-wrapper"><img class="hero-swiper-img" src="${cook.imgWebpUrl}" alt="${cook.name}"></div>
          <div class="hero-swiper-slide-wrapper hero-info-slide-wrapper"><img class="hero-swiper-info-img" src="${topic.previewWebpUrl}" alt="${topic.name}"></div>
          <div class="hero-swiper-slide-wrapper hero-img-slide-wrapper"><img class="hero-swiper-img" src="${topic.imgWebpUrl}" alt="${topic.name}"></div>
        </div>
   `;
    })
    .join('');
};

export const initSwiper = (selector, tarjetasVisibles) => {
  return new Swiper(selector, {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: tarjetasVisibles,
  });
};

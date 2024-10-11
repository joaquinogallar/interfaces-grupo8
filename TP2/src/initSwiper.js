export const initSwiper = (
  selector,
  tarjetasVisibles,
  res1,
  res2,
  res3,
  res4,
  res5,
  res6
) => {
  return new Swiper(selector, {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: res6,
        spaceBetween: 20,
      },
      700: {
        slidesPerView: res5,
      },
      850: {
        slidesPerView: res4,
      },
      1000: {
        slidesPerView: res3,
      },
      1220: {
        slidesPerView: res2,
      },
      1500: {
        slidesPerView: res1,
      },
      1700: {
        slidesPerView: tarjetasVisibles,
      },
    },
  });
};

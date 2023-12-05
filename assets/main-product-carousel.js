const mainProductCarouselElement = document.querySelector('.main-product-carousel')
const mobileScreen = (window.innerWidth < 770) ? true : false;

if (mobileScreen) {
  new Flickity( mainProductCarouselElement, {
    fullscreen: true,
    prevNextButtons: false,
    pageDots: true
  });
}
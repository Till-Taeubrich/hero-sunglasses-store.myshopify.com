const mainProductCarouselElement = document.querySelectorAll('.main-product-carousel')
const mobileScreen = (window.innerWidth < 770) ? true : false;

if (mobileScreen) {
  mainProductCarouselElement.forEach(elem => {
    new Flickity( elem, {
      fullscreen: true,
      prevNextButtons: false,
      pageDots: true
    });
  })
}
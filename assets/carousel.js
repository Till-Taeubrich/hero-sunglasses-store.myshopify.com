window.addEventListener('load', function () {
  let productCardHeight = `${document.querySelector('.custom__product-card .product-card-img-wrapper > img').offsetHeight}px`
  const imgWrappers = document.querySelectorAll('.product-card-img-wrapper')

  const addHeight = (e) => {
    e.target.querySelector('.carousel').style.height = productCardHeight
    e.target.querySelector('.flickity-viewport').style.height = productCardHeight
    e.target.querySelectorAll('.carousel .carousel-cell').forEach(cell => {
      cell.style.height = productCardHeight
      cell.querySelector('img').style.height = productCardHeight
    })
  }

  const removeHeight = (e) => {
    e.target.querySelector('.carousel').style.height = "0"
    e.target.querySelector('.flickity-viewport').style.height = "0"
    e.target.querySelectorAll('.carousel .carousel-cell').forEach(cell => {
      cell.style.height = "0"
      cell.querySelector('img').style.height = productCardHeight
    })
  }

  imgWrappers.forEach(item => {
    item.addEventListener('mouseenter', (e) => addHeight(e))
    item.addEventListener('mouseleave', (e) => removeHeight(e))
  })

  addEventListener("resize", () => {
    productCardHeight = `${document.querySelector('.custom__product-card .product-card-img-wrapper > img').offsetHeight}px`
  });
}) 
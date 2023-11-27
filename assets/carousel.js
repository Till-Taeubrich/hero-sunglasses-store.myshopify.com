window.addEventListener('load', function () {
  let productCardHeight = `${document.querySelector('.custom__product-card .product-card-img-wrapper > img').offsetHeight}px`
  console.log('🚀 ~ file: carousel.js:3 ~ productCardHeight:', productCardHeight)

  const imgWrappers = document.querySelectorAll('.product-card-img-wrapper')

  const addHeight = (e) => {
    e.target.querySelector('.custom__product-card .carousel').style.height = productCardHeight
    console.log('in')
  }

  const removeHeight = (e) => {
    e.target.querySelector('.custom__product-card .carousel').style.height = "0"
    console.log('out')
  }

  imgWrappers.forEach(item => {
    item.addEventListener('mouseenter', (e) => addHeight(e))
    item.addEventListener('mouseleave', (e) => removeHeight(e))
  })
}) 
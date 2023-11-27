window.addEventListener('load', function () {
  let productCardHeight = `${document.querySelector('.custom__product-card .product-card-img-wrapper > img').offsetHeight}px`
  const imgWrappers = document.querySelectorAll('.product-card-img-wrapper')
  const flickityBtns = this.document.querySelectorAll('.custom__product-card .flickity-button')

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

  const updateMainImg = (e) => {
    const productCard = e.target.closest('.custom__product-card').querySelector('.main_product_img')
    console.log('🚀 ~ file: carousel.js:26 ~ updateMainImg ~ e.target:', e.target)
    const newMainImgUrl = e.target.closest('.custom__product-card').querySelector('.carousel-cell.is-selected').dataset.variantMainImg
    productCard.srcset = newMainImgUrl
  }

  imgWrappers.forEach(item => {
    item.addEventListener('mouseenter', (e) => addHeight(e))
    item.addEventListener('mouseleave', (e) => {
      removeHeight(e)
      updateMainImg(e)
    })
  })

  flickityBtns.forEach(btn => {
    btn.addEventListener('click', updateMainImg)
  })

  addEventListener("resize", () => {
    productCardHeight = `${document.querySelector('.custom__product-card .product-card-img-wrapper > img').offsetHeight}px`
  });
}) 
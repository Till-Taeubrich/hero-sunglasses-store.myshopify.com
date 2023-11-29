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
    const newMainImgUrl = e.target.closest('.custom__product-card').querySelector('.carousel-cell.is-selected').dataset.variantMainImg
    productCard.srcset = newMainImgUrl
  }

  const filterPrice = (string) => {
    return string.split(">")[1].split("<")[0]
  }

  const updatePrice = (e) => {
    // const newComparePriceSpan = e.target.closest('.custom__product-card').querySelector('.carousel-cell.is-selected').dataset.variantComparePrice
    const newPriceData = filterPrice(e.target.closest('.custom__product-card').querySelector('.carousel-cell.is-selected').dataset.variantPrice)
    const productPriceElement = e.target.closest('.custom__product-card').querySelector('.price-item--regular > span')
    productPriceElement.textContent = newPriceData

    // if (newComparePriceSpan) {
    //   return
    // }
  }

  const addSelectedClass = (e) => {
    e.target.closest('li.grid__item').classList.add('selected')
  }

  const removeSelectedClass = (e) => {
    e.target.closest('li.grid__item').classList.remove('selected')
  }

  const initCarousel = () => {
    const flktyCarousels = document.querySelectorAll('.carousel');
    flktyCarousels.forEach(carousel => {
      new Flickity( carousel, {
        fullscreen: true,
        lazyLoad: "1",
        pageDots:false,
        draggable: false,
        wrapAround: true
      });
    })
  }

  const initialPriceLoad = () => {
    const productCards = document.querySelectorAll('.custom__product-card');
    productCards.forEach(card => {
      const dataElement = card.querySelector('.carousel-cell.is-selected')
      const price = dataElement.dataset.variantPrice
      const productPriceElement = card.querySelector('.price-item--regular > span')
      productPriceElement.style.visibility = "visible"
      productPriceElement.textContent = price
    })
  }

  imgWrappers.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      addHeight(e)
      addSelectedClass(e)
    })
    item.addEventListener('mouseleave', (e) => {
      removeHeight(e)
      // updateMainImg(e)
      removeSelectedClass(e)
    })
  })

  flickityBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      updatePrice(e)
      updateMainImg(e)
    })
  })

  addEventListener("resize", () => {
    productCardHeight = `${document.querySelector('.custom__product-card .product-card-img-wrapper > img').offsetHeight}px`
  });

  initCarousel()
  initialPriceLoad()
}) 
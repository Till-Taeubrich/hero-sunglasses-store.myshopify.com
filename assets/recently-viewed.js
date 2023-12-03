class BtRecentlyViewedUtil
{
  static init() {
    BtRecentlyViewedUtil.key = 'recently_viewed';
  }

  static setArray(array) {
    BtStorageUtil.set(BtRecentlyViewedUtil.key, array);
  }

	static getArray() {
    return BtStorageUtil.get(BtRecentlyViewedUtil.key, true) || [];
  }

	static addProduct(productId, productUrl, productImage, limit) {
    let currentList = BtRecentlyViewedUtil.getArray();
		let existProduct = currentList.filter(e => e.product_id != productId);

		existProduct.unshift({
			"product_id": productId,
			"url": productUrl,
			"image": productImage
		});

		if(existProduct.length > limit) {
			existProduct.pop();
		}

		BtRecentlyViewedUtil.setArray(existProduct);
  }
}

BtRecentlyViewedUtil.init();

const recentlyViewedObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if(entry.isIntersecting) {
			entry.target.updateContent();
			observer.unobserve(entry.target);
		}
	});
}, {threshold: 0.1});

class RecentlyViewed extends HTMLElement
{
  constructor() {
		super();

		this.limit = parseInt(this.dataset.limit);
		
		this.isEmpty = true;
		
		this.updatedContent = false;
		this.section = this.querySelector('.recently-viewed-products__section');
		this.results = this.querySelector('.recently-viewed-products__results');

		if(this.dataset.productId) {
			this.addProduct(this.dataset.productId, this.dataset.productUrl, this.dataset.productImage);
		}
	}

	connectedCallback() {
		recentlyViewedObserver.observe(this);
	}

	addProduct(productId, productUrl, productImage) {
		BtRecentlyViewedUtil.addProduct(productId, productUrl, productImage, this.limit);
		this.updatedContent = false;
	}

	updateContent() {
		const itemList = BtRecentlyViewedUtil.getArray();
		if(itemList.length > 0) {
			const newIds = [];
			itemList.forEach((item) => {
				newIds.push(`id:${item.product_id}`);
			});
			const idsQuery =  newIds.join(' OR ');
			fetch(`${window.routes.search_url}?section_id=recently-viewed-products-ajax&q=${idsQuery}&type="product"`)
			.then((response) => response.text()) 
			.then(response => {
				const html = new DOMParser().parseFromString(response, 'text/html');
				if(!this.hasAssets) {
					html.querySelectorAll('.assets > *').forEach(asset => {
						document.body.appendChild(asset);
					});
					this.hasAssets = true;
				}
				// main element
				const sliderComponent = html.querySelector('slider-component');
				if(sliderComponent) {
					sliderComponent.setAttribute('data-outside-prev-button-id', this.dataset.prevButton);
					sliderComponent.setAttribute('data-outside-next-button-id', this.dataset.nextButton);
					if(this.dataset.fullWidth) {
						sliderComponent.classList.add('page-width--full');
						if(sliderComponent.classList.contains('has-slider')) {
							sliderComponent.classList.add('slider-component-full-width');
							const productGrid = sliderComponent.querySelector('.product-grid');
							if(productGrid.classList.contains('slider')) {
								productGrid.classList.add('grid--peek');
							}
						}
					}
					this.section.classList.remove('hidden');
					this.results.innerHTML == '';
					this.results.appendChild(sliderComponent);
				} else {
					this.section.classList.add('hidden');
				}
			})
			.then(() => {
				reinitCarouselJs()
			})
			.finally(() => {
				BtCompareUtil.loadedContent = true;
			});
		}
		this.updatedContent = true;
	}
}

const reinitCarouselJs = () => {

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

	initCarousel()

	const customerLogged = document.querySelector('.main-body').dataset.customerLogged
	let productCardHeight = `${document.querySelector('.custom__product-card .product-card-img-wrapper > img').offsetHeight}px`
	const imgWrappers = document.querySelectorAll('.product-card-img-wrapper')
	const flickityBtns = document.querySelectorAll('.custom__product-card .flickity-button')

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

	const updatePrice = (e) => {
		const newPriceData = e.target.closest('.custom__product-card').querySelector('.carousel-cell.is-selected').dataset.variantPrice
		const newComparePriceData = e.target.closest('.custom__product-card').querySelector('.carousel-cell.is-selected').dataset.variantComparePrice
		const priceContainer = e.target.closest('.custom__product-card').querySelector('.price--out-card')

		const productPriceElement = newComparePriceData ? e.target.closest('.custom__product-card').querySelector('span.price-item--sale') : e.target.closest('.custom__product-card').querySelector('span.price-item--regular')
		const compareProductPriceElement = e.target.closest('.custom__product-card').querySelector('.price__sale s.price-item--regular')

		if (!newComparePriceData) {
			productPriceElement.innerText = newPriceData
			priceContainer.classList.remove('price--on-sale')
			return
		}

		compareProductPriceElement.cl
		productPriceElement.innerText = newPriceData
		compareProductPriceElement.innerText = newComparePriceData
		priceContainer.classList.add('price--on-sale')
	}

	const addSelectedClass = (e) => {
		e.target.closest('li.grid__item').classList.add('selected')
	}

	const removeSelectedClass = (e) => {
		e.target.closest('li.grid__item').classList.remove('selected')
	}

  if (window.innerWidth > 749) {
    imgWrappers.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        addHeight(e)
        addSelectedClass(e)
      })
      item.addEventListener('mouseleave', (e) => {
        removeHeight(e)
        removeSelectedClass(e)
      })
    })
  }

	flickityBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			if (customerLogged) {
        updatePrice(e)
      }
			updateMainImg(e)
		})
	})

	addEventListener("resize", () => {
		productCardHeight = `${document.querySelector('.custom__product-card .product-card-img-wrapper > img').offsetHeight}px`
	});
}

customElements.define('recently-viewed', RecentlyViewed);

class FixedElementsPadding {
	constructor(bannerSelector, fixedElementsSelector) {
		this.banner = document.querySelector(bannerSelector);
		this.fixedElements = document.querySelectorAll(fixedElementsSelector);
		this.isTopBanner = this.banner?.classList.contains('something--upper');

		if (this.banner && this.fixedElements.length) {
			this.init();
		}
	}

	init() {
		this.updatePadding();
		this.updatePosition();

		window.addEventListener('resize', () => {
			this.updatePadding();
			this.updatePosition();
		});

		const closeButton = this.banner.querySelector('.something__close');
		if (closeButton) {
			closeButton.addEventListener('click', () => this.onBannerClose());
		}
	}

	updatePadding() {
		const screenWidth = window.innerWidth;

		if (screenWidth < 480) {
			this.extraPadding = 8;
		} else {
			this.extraPadding = 20;
		}
	}

	getBannerOffset() {
		return getComputedStyle(this.banner).display !== 'none'
			? this.banner.offsetHeight + this.extraPadding
			: this.extraPadding;
	}

	updatePosition() {
		const offset = this.getBannerOffset();

		this.fixedElements.forEach(element => {
			if (this.isTopBanner) {
				element.style.top = `${offset}px`;
				element.style.bottom = '';
			} else {
				element.style.bottom = `${offset}px`;
				element.style.top = '';
			}
		});
	}

	onBannerClose() {
		this.banner.remove();
		this.updatePosition();
	}
}

if (document.querySelector('.something--upper')) {
	new FixedElementsPadding('.something--upper', null);
}

if (document.querySelector('.something--lowner')) {
	new FixedElementsPadding('.something--lowner', '.campaign-island, .article__menu, .main-anchors, .contents--static, .admin-panel, .unit-nav, .header__c-select');
}

function copyToClipboard(e) {
	let input = document.body.appendChild(document.createElement("input"));
	input.classList.add('input-copy-hidden');
	input.value = window.location.href;
	input.select();
	document.execCommand('copy');
	input.parentNode.removeChild(input);
}

document.querySelectorAll('[data-copy-url]').forEach(copyButton => {
	copyButton.addEventListener("click", copyToClipboard)
})

//
// Header and mobile menu
//

// let header = document.querySelector('.header'),
// 	headerBurger = document.querySelector('.header__burger'),
// 	headerMenu = document.querySelector('.header__menu'),
// 	headerMenuClose = document.querySelector('.header__menu-close'),
// 	headerNav = document.querySelector('.header__nav'),
// 	headerNavItem = document.querySelectorAll('.header__nav-item');

// function toggleMobileMenu(e) {
// 	header.classList.toggle('header-mobile-menu');
// 	headerBurger.classList.toggle('btn--cross');
// 	document.body.classList.toggle('overflow-hidden');

// 	if (window.innerWidth < 767 && document.querySelector('.something--lowner .something')) {
// 		headerMenu.style.paddingBottom = '60px';
// 	} else {
// 		headerMenu.style.paddingBottom = '';
// 	}

// 	hideMobileSubMenu();
// }

// function hideMobileSubMenu() {
// 	document.querySelector('.header__nav-item').classList.remove('header__nav-item--active');
// }

// headerNav.addEventListener('click', function (event) {
// 	const target = event.target;

// 	if (target.classList.contains('header__nav-toggle')) {
// 		const btn = target.closest('.header__nav-item');

// 		headerNavItem.forEach(item => {
// 			if (item !== btn) {
// 				item.classList.remove('header__nav-item--active');
// 			}
// 		});

// 		btn.classList.toggle('header__nav-item--active');
// 	}
// });

// headerBurger.addEventListener("click", toggleMobileMenu);
// headerMenuClose.addEventListener("click", toggleMobileMenu);


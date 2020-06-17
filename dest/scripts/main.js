(function ($) {

  //
  // Header and mobile menu
  //

  const $header = $(".header"),
    $headerContainer = $(".header__container"),
    $headerBurger = $(".header__burger"),
    $mobileMenuCover = $(".mobile-menu-cover"),
    $headerBtnSearch = $(".header__btn-search"),
    $headerSearch = $(".header__search"),
    $headerSearchBtnClose = $(".header__search-close"),
    $headerSearchInput = $(".header__search-input"),
    $headerNavList = $(".header__nav-list"),
    $headerNavLinksList = $(".header__nav-item--arrow"),
    $headerMobileMenuBack = $(".mobile-menu-back");

  function toggleMobileMenu() {
    $header.toggleClass("header--mobile-menu");
    $headerBurger.toggleClass("btn--cross");
    hideMobileSubMenu();
    $("body").toggleClass("overflow-hidden");
    $mobileMenuCover.fadeToggle(280);
  }

  function toggleHeaderSearch(e) {
    e.preventDefault();
    $headerNavList.toggleClass("visibility-hidden");
    $headerSearch.fadeToggle(180);
    $headerSearchInput.focus();
  }

  function showMobileSubMenu() {
    $headerMobileMenuBack.addClass("show");
    $(".header__nav-child-list", this).addClass("show");
  }

  function hideMobileSubMenu() {
    $headerMobileMenuBack.removeClass("show");
    $(".header__nav-child-list").removeClass("show");
  }

  $headerMobileMenuBack.on("click", hideMobileSubMenu);
  $headerNavLinksList.on("click", showMobileSubMenu);
  $headerBurger.on("click", toggleMobileMenu);
  $mobileMenuCover.on("click", toggleMobileMenu);
  $headerBtnSearch.on("click", toggleHeaderSearch)
  $headerSearchBtnClose.on("click", toggleHeaderSearch);

  //
  // Accordion
  //

  $(".accordion__title").on("click", function () {
    $(this).parent().toggleClass("accordion--open");
  });

  //
  // Modals
  //

  function getScrollBarWidth() {
    var $outer = $('<div>').css({
        visibility: 'hidden',
        width: 100,
        overflow: 'scroll'
      }).appendTo('body'),
      widthWithScroll = $('<div>').css({
        width: '100%'
      }).appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
  }

  function openModal() {
    var modalId = $(this).data("modal");
    $("#" + modalId).addClass("modal--open");

    $("body").css("overflow", "hidden");

    if (window.innerWidth >= 1152) {
      $(".share-and-up").css("transform", "translateX(-" + (getScrollBarWidth() / 2) + "px)");
    }

    setTimeout(function () {
      $("#" + modalId).addClass("modal--fadeIn");
    }, 50);
  }

  function closeModal() {
    var $openModal = $(".modal--open");
    $openModal.removeClass("modal--fadeIn");

    setTimeout(function () {
      $openModal.removeClass("modal--open");

      $("body").css("overflow", "");

      $("body, .share-and-up").css("padding-right", "0");
      $(".share-and-up").css("transform", "translateX(0)");
    }, 200);
  }

  $("[data-modal]").on("click", openModal);
  $(".modal").on("click", closeModal);
  $("[data-close-modal]").on("click", closeModal);

  $(".modal > *").on("click", function () {
    event.stopPropagation();
  });


  var currencyValue = $(".currencies__currency span");

  $("[data-set-currency]").on("click", setCurrency);

  function setCurrency() {
    var currency = $(this).data("set-currency");

    switch (currency) {
      case "usd":
        console.log("set usd")
        break;

      case "eur":
        console.log("set eur")
        break;

      case "rub":
        console.log("set rub")
        break;
    }

    currencyValue.text(currency);
  }

  function modalTimeout() {
    var i = 3;
    var timerId = setTimeout(function go() {
      $('.timeout__item').html(i);
      if (i <= 3) setTimeout(go, 1000);
      i--;
    }, 0);
  }

})(jQuery);
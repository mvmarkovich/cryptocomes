(function ($) {

  //
  // Header and mobile menu
  //

  const $header = $(".header"),
    $headerBurger = $(".header__burger"),
    $mobileMenuCover = $(".mobile-menu-cover"),
    $headerBtnSearch = $(".header__btn-search"),
    $headerSearch = $(".header__search"),
    $headerSearchBtnClose = $(".header__search-close"),
    $headerSearchInput = $(".header__search-input"),
    $headerNavList = $(".header__nav-list"),
    $headerNavLinksList = $(".header__nav-item--arrow"),
    $headerMobileMenuBack = $(".mobile-menu-back"),
    $headerMobileMenuClose = $(".header__mobile-cross");

  function toggleMobileMenu() {
    $header.toggleClass("header--mobile-menu");
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
  $headerMobileMenuClose.on("click", toggleMobileMenu);
  $headerBtnSearch.on("click", toggleHeaderSearch);
  $headerSearchBtnClose.on("click", toggleHeaderSearch);

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

  function modalTimeout() {
    var i = 3;
    var timerId = setTimeout(function go() {
      $('.timeout__item').html(i);
      if (i <= 3) setTimeout(go, 1000);
      i--;
    }, 0);
  }

  //
  // Fixed sidebar
  //

  var sidebar = new StickySidebar('.aside', {
    containerSelector: '.f-container',
    innerWrapperSelector: '.sidebar__inner',
    topSpacing: 16,
    bottomSpacing: 16,
    minWidth: 784
  });

  //
  // Cookies
  //

  $('.cookies .btn--accent').on('click', function() {
    $(".cookies").detach();
    var date = new Date();
    days = 365;
    date.setTime(+date + (days * 86400000));
    document.cookie = "accept=1; expires=" + date.toGMTString();
  });

  //
  // Copy URL Share block
  //

  var $temp = $("<input>");
  var $url = $(location).attr('href');

  $('.social__link--copy').on('click', function() {
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
  });

  //
  // Anchor top page
  //

  $('.social__link--up').click(function() {
    $('html, body').animate({scrollTop: 0},300);
    return false;
  })

})(jQuery);
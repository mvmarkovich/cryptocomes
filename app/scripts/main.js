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
  });

  //
  // Fixed sidebar
  //

  (function(){
    var a = document.querySelector('.aside'), b = null, K = null, Z = 0, P = 16, N = 16;
    window.addEventListener('scroll', Ascroll, false);
    document.body.addEventListener('scroll', Ascroll, false);
    function Ascroll() {
      var Ra = a.getBoundingClientRect(),
          R1bottom = document.querySelector('.f-container').getBoundingClientRect().bottom;
      if (Ra.bottom < R1bottom) {
        if (b == null) {
          var Sa = getComputedStyle(a, ''), s = '';
          b = document.createElement('div');
          b.className = "aside-stop";
          b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
          a.insertBefore(b, a.firstChild);
          var l = a.childNodes.length;
          for (var i = 1; i < l; i++) {
            b.appendChild(a.childNodes[1]);
          }
          a.style.height = b.getBoundingClientRect().height + 'px';
          a.style.padding = '0';
          a.style.border = '0';
        }
        var Rb = b.getBoundingClientRect(),
            Rh = Ra.top + Rb.height,
            W = document.documentElement.clientHeight,
            R1 = Math.round(Rh - R1bottom),
            R2 = Math.round(Rh - W);
        if (Rb.height > W) {
          if (Ra.top < K) {  // скролл вниз
            if (R2 + N > R1) {  // не дойти до низа
              if (Rb.bottom - W + N <= 0) {  // подцепиться
                b.className = 'aside-fixed';
                b.style.top = W - Rb.height - N + 'px';
                Z = N + Ra.top + Rb.height - W;
              } else {
                b.className = 'aside-stop';
                b.style.top = - Z + 'px';
              }
            } else {
              b.className = 'aside-stop';
              b.style.top = - R1 +'px';
              Z = R1;
            }
          } else {  // скролл вверх
            if (Ra.top - P < 0) {  // не дойти до верха
              if (Rb.top - P >= 0) {  // подцепиться
                b.className = 'aside-fixed';
                b.style.top = P + 'px';
                Z = Ra.top - P;
              } else {
                b.className = 'aside-stop';
                b.style.top = - Z + 'px';
              }
            } else {
              b.className = '';
              b.style.top = '';
              Z = 0;
            }
          }
          K = Ra.top;
        }

        window.addEventListener('resize', function() {
          a.children[0].style.width = getComputedStyle(a, '').width
        }, false);
      }
    }
  })()

})(jQuery);
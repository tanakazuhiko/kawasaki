/* ========================================================================= */
/*	Preloader
/* ========================================================================= */
jQuery(window).load(function () {
  $("#preloader").fadeOut("slow");
});

/* ========================================================================= */
/*  Welcome Section Slider
/* ========================================================================= */
$(function () {
  var Page = (function () {
    var $navArrows = $('#nav-arrows'),
    $nav = $('#nav-dots > span'),
    slitslider = $('#slider').slitslider({
      onBeforeChange: function (slide, pos) {
        $nav.removeClass('nav-dot-current');
        $nav.eq(pos).addClass('nav-dot-current');
      }
    }),
    init = function () {
      initEvents();
    },
    initEvents = function () {
      // add navigation events
      $navArrows.children(':last').on('click', function () {
        slitslider.next();
        return false;
      });
      $navArrows.children(':first').on('click', function () {
        slitslider.previous();
        return false;
      });
      $nav.each(function (i) {
        $(this).on('click', function (event) {
          var $dot = $(this);
          if (!slitslider.isActive()) {
            $nav.removeClass('nav-dot-current');
            $dot.addClass('nav-dot-current');
          }
          slitslider.jump(i + 1);
          return false;
        });
      });
    };
    return {
      init: init
    };
  })();
  Page.init();
});

// $(document).ready
$(document).ready(function () {
  /* ========================================================================= */
  /*	Menu item highlighting
  /* ========================================================================= */
  jQuery('#nav').singlePageNav({
    offset: jQuery('#nav').outerHeight(),
    filter: ':not(.external)',
    speed: 2000,
    currentClass: 'current',
    easing: 'easeInOutExpo',
    updateHash: true,
    beforeStart: function () {
      console.log('begin scrolling');
    },
    onComplete: function () {
      console.log('done scrolling');
    }
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > 400) {
      $(".navbar-brand a").css("color", "#fff");
      $("#navigation").removeClass("animated-header");
    } else {
      $(".navbar-brand a").css("color", "inherit");
      $("#navigation").addClass("animated-header");
    }
  });

  /* ========================================================================= */
  /*	Fix Slider Height
  /* ========================================================================= */
  // Slider Height
  var slideHeight = $(window).height();
  // $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height', slideHeight);
  $(window).resize(function () {
    // 'use strict',
    // $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height', slideHeight);
  });
  $("#works, #testimonial").owlCarousel({
    navigation: true,
    pagination: false,
    slideSpeed: 700,
    paginationSpeed: 400,
    singleItem: true,
    navigationText: ["<i class='fa fa-angle-left fa-lg'></i>", "<i class='fa fa-angle-right fa-lg'></i>"]
  });

  /* ========================================================================= */
  /*	Featured Project Lightbox
  /* ========================================================================= */
  $(".fancybox").fancybox({
    padding: 0,
    openEffect: 'elastic',
    openSpeed: 650,
    closeEffect: 'elastic',
    closeSpeed: 550,
    closeClick: true,
    beforeShow: function () {
      this.title = $(this.element).attr('title');
      this.title = '<h3>' + this.title + '</h3>' + '<p>' + $(this.element).parents('.portfolio-item').find('img').attr('alt') + '</p>';
    },
    helpers: {
      title: {
        type: 'inside'
      },
      overlay: {
        css: {
          'background': 'rgba(0,0,0,0.8)'
        }
      }
    }
  });

  // countdown & signatures-number
  update_view();
});
// end $(document).ready

// wow
var wow = new WOW({
  offset: 75, // distance to the element when triggering the animation (default is 0)
  mobile: true, // trigger animations on mobile devices (default is true)
});
wow.init();

// countdown & signatures-number
function update_view() {
  countDown();
  // scraping();
  setTimeout('update_view()', 1000);
}

function countDown() {
  console.log("countdown");
  var startDateTime = new Date();
  var endDateTime = new Date("January 07,2019 00:00:00");
  var left = endDateTime - startDateTime;
  var a_day = 24 * 60 * 60 * 1000;
  // 期限から現在までの『残時間の日の部分』
  var d = Math.floor(left / a_day)
  // 期限から現在までの『残時間の時間の部分』
  var h = Math.floor((left % a_day) / (60 * 60 * 1000))
  // 残時間を秒で割って残分数を出す。
  // 残分数を60で割ることで、残時間の「時」の余りとして、『残時間の分の部分』を出す
  var m = Math.floor((left % a_day) / (60 * 1000)) % 60
  // 残時間をミリ秒で割って、残秒数を出す。
  // 残秒数を60で割った余りとして、「秒」の余りとしての残「ミリ秒」を出す。
  // 更にそれを60で割った余りとして、「分」で割った余りとしての『残時間の秒の部分』を出す
  var s = Math.floor((left % a_day) / 1000) % 60 % 60

  $(".TimeLeft").text('残り時間: ' + d + '日' + h + '時間' + m + '分' + s + '秒');
}

/**
* wait function for deferred jQuery.
* @see http://qiita.com/deep_blue_ao/items/3b0bb69f16a7381d9871
*/
function scraping() {
  console.log("scraping");

  // 最初に一覧を取得.
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'https://petitions.whitehouse.gov/petition/stop-landfill-henoko-oura-bay-until-referendum-can-be-held-okinawa',
  }).done(function (data) {
    console.log(data);
    // 取得した一覧から個別のページへの情報を処理.
    // $(data.results[0]).find('#signatures-text').each(function(index, val) {
    //   // 個別ページurlの取り出しとidの採番.
    //   var number = $(this).text();
    //   $("#signatures-number").text('number:'+number);
    // });
  });
};

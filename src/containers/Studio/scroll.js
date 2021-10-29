/*
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;

var $ = (jQuery = require("jquery")(window));
var jQuery = require("jquery")(window);

$(document).ready(function () {
  $(document).on("scroll", onScroll);
  //smoothscroll
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $("a").each(function () {
      $(this).removeClass("active");
    });
    $(this).addClass("active");
    console;
    var target = this.hash,
      $target = $(target);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top + 2,
        },
        1200,
        "swing",
        function () {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
        }
      );
  });
});

function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $("#rightNav a").each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (
      refElement.position().top <= scrollPos &&
      refElement.position().top + refElement.height() > scrollPos
    ) {
      $("#rightNav a").removeClass("active");
      currLink.addClass("active");
    } else {
      currLink.removeClass("active");
    }
  });
}
*/

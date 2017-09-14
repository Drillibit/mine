$(document).on('ready', function() {
  $(".lazy").slick({
    lazyLoad: 'ondemand',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000
  });
});

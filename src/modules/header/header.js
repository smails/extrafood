/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const headerFix = (scroll) => {
  document.querySelector('.header').style.transform = `translateY(${scroll}px)`;
};


// eslint-disable-next-line func-names
$('.js-open-menu').click(function () {
  $(this).find('.sign').toggleClass('open');
  $(this).find('.burger').toggleClass('open');
  $('.header__menu').slideToggle();
  $('.basket-open').fadeToggle();
});

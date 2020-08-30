/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const headerFix = (scroll) => {
  if (scroll > 20){
    document.querySelector(".header").classList.add('fix');
  }else{
    document.querySelector(".header").classList.remove('fix');
  }
    document.querySelector(
      ".header"
    ).style.transform = `translateY(${scroll}px)`;
};


// eslint-disable-next-line func-names
$('.js-open-menu').click(function () {
  $(this).find('.sign').toggleClass('open');
  $(this).find('.burger').toggleClass('open');
  $('.header__menu').slideToggle();
  $('.basket-open').fadeToggle();
});

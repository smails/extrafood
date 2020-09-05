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
  $(this).find('.burger').toggleClass('open');
  $('.header__list').slideToggle();
});

$(".header__item").mouseenter(function(){
  if($(this).find('.dropdown').length){
    if ($(this).parents('.header').hasClass('fix')){
      $(".header__over").css({
        height: '60px'
      })
    } else{
      $(".header__over").css({
        height: '120px'
      })
    }
  } else{
      $(".header__over").css({
        height: '0'
      })
  }
})
$(".header__item").mouseleave(function () {
  $(".header__over").css({
    height: '0'
  })
})
/* eslint-disable no-mixed-operators */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
$('.filter__stepper').slider({
  min: 0,
  max: 5000,
  values: [0, 3000],
  range: true,
  animate: 'fast',
  slide(event, ui) {
    $(this).parent('.filter__tab-numb').find('.filter__field_from').val(ui.values[0]);
    $(this).parent('.filter__tab-numb').find('.filter__field_to').val(ui.values[1]);
  },
});
$('.filter__field_from').val($('.filter__stepper').slider('values', 0));
$('.filter__field_to').val($('.filter__stepper').slider('values', 1));

$('.filter__caption').click(function () {
  $(this).toggleClass('active');
  $(this).next().slideToggle();
});

// eslint-disable-next-line no-unused-vars
const leftCatalogSidebar = (scroll) => {
  if (document.querySelector('.sidebar')) {
    if (scroll > document.querySelector('.sidebar').style.paddingTop && scroll < (document.querySelector('.scroll-content').scrollHeight - (document.querySelector('.sidebar').scrollHeight + document.querySelector('.footer').scrollHeight))) {
      document.querySelector('.sidebar').style.top = `${scroll}px`;
    } else if (scroll < 100) {
      document.querySelector('.sidebar').style.top = 0;
    }
  }
};
// eslint-disable-next-line no-undef
if (document.querySelector('.search-cart__list')) {
  Scrollbar.init(document.querySelector('.search-cart__list'));
}

$('.search-cart__btn-filter').click(() => {
  $('.filter').slideDown();
  $('.basket-open').hide();
  initCloseFiler();
});
$('.filter__close').click((e) => {
  e.preventDefault();
  $('.filter').slideUp();
  setTimeout(() => {
    $('.basket-open').show();
  }, 300);
});

$('.search-cart__field').on('keypress, keyup', () => {
  $('.search-cart__list[data-scrollbar]').slideDown();
  if (window.innerWidth < 1280) {
    $('.js-open-menu').find('.sign').removeClass('open');
    $('.js-open-menu').find('.burger').removeClass('open');
    $('.header__menu').slideUp();
  }
});

$('.search-cart__field').blur(() => {
  $('.search-cart__list[data-scrollbar]').slideUp();
});

$('.filter__field').focusout(() => {
  let input_left = $('.filter__field_from').val().replace(/[^0-9]/g, '');
  const opt_left = $('.filter__stepper').slider('option', 'min');
  const where_right = $('.filter__stepper').slider('values', 1);
  let input_right = $('.filter__field_to').val().replace(/[^0-9]/g, '');
  const opt_right = $('.filter__stepper').slider('option', 'max');
  const where_left = $('.filter__stepper').slider('values', 0);
  if (input_left > where_right) {
    input_left = where_right;
  }
  if (input_left < opt_left) {
    input_left = opt_left;
  }
  if (input_left === '') {
    input_left = 0;
  }
  if (input_right < where_left) {
    input_right = where_left;
  }
  if (input_right > opt_right) {
    input_right = opt_right;
  }
  if (input_right === '') {
    input_right = 0;
  }
  $('.filter__field_from').val(input_left);
  $('.filter__field_top').val(input_right);
  $('.filter__stepper').slider('values', [input_left, input_right]);
});

$('.filter__reset').click((e) => {
  e.preventDefault();
  $('.filter__field_from').val(0);
  $('.filter__field_to').val(3000);
  $('.filter__stepper').slider('values', [0, 3000]);
  $('.checkbox__hidden').prop('checked', false);
});

const initCloseFiler = () => {
  if (window.innerWidth < 1280 && window.innerWidth > 480) {
    window.addEventListener('click', (e) => {
      if (e.pageX < 475 && window.innerWidth > 480 || e.pageX < 730 && window.innerWidth > 769) {
        $('.filter').slideUp();
        setTimeout(() => {
          $('.basket-open').show();
        }, 300);
      }
    });
  }
};

$('.search-cart__btn-catalog-mobile').click(() => {
  $('.catalog__sidebar').slideDown();
  $(window).click((e) => {
    if (e.pageX > 260) {
      $('.catalog__sidebar').slideUp();
    }
  });
});

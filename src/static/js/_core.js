/* eslint-disable no-undef */
const { Scrollbar } = window;
const scrollEvent = Scrollbar.init(document.querySelector('main'));
scrollEvent.addListener((s) => {
  $('select').select2('close');
  headerFix(s.offset.y);
});
$('select').select2({
  minimumResultsForSearch: Infinity,
  width: 'style',
  selectOnClose: true,
});

$('select').on('select2:open', () => {
  // eslint-disable-next-line no-console
  Scrollbar.init(document.querySelector('.select2-results'), {
    alwaysShowTracks: true,
  });
});
$('document').ready(() => {
  $('input[name="phone"]').mask('+7(999) 999-99-99');
  $('.js-open-modal').click(() => {
    $('.modal').css('display', 'flex');
    setTimeout(() => {
      $('.modal').css('opacity', '1');
    }, 500);
    setTimeout(() => {
      $('.modal__container').fadeIn();
    }, 600);
  });
  $('.modal__close').click(() => {
    $('.modal').css('opacity', '0');
    $('.modal__container').fadeOut();
    setTimeout(() => {
      $('.modal').attr('style', '');
    }, 500);
  });
  $('.up').click(() => {
    scrollEvent.scrollTo(0, 0, '800');
  });
  let isValid;
  let check;
  $('form').submit(function (e) {
    e.preventDefault();
    const $form = $(this);
    $form.find('.required').each((index, elem) => {
      if (elem.value === '') {
        if (!elem.nextElementSibling || !elem.nextElementSibling.classList.contains('error-tooltip')) {
          const formTooltip = document.createElement('span');
          let text = '';
          if (elem.previousElementSibling === null) {
            text = elem.selectedOptions[0].text.replace('Выберите ', '');
          } else {
            text = elem.previousElementSibling.textContent;
          }
          formTooltip.className = 'error-tooltip';
          formTooltip.textContent = `Пожалуйста, укажите ${text.toLowerCase()}`;
          formTooltip.style.opacity = '1';
          formTooltip.style.transform = 'scale(1)';
          elem.after(formTooltip);
          elem.classList.add('error');
          isValid = false;
        }
      } else {
        isValid = true;
      }
    });
    if (!$form.find('.checkbox__hidden').prop('checked')) {
      // eslint-disable-next-line no-unused-expressions
      !$form.find('.checkbox__hidden').addClass('error');
      check = false;
    } else {
      $('.checkbox__hidden').removeClass('error');
      check = true;
    }
    if (isValid !== false && check !== false) {
      setTimeout(() => {
        $form.trigger('reset');
        $('.form-add').find('li').remove();
        $('.btn-add').show();
        $('input').val(null).trigger('blur');
        $('select').val(null).trigger('change');
      }, 2000);
    }
  });
});
$(document).on('change', '.add-file', function (e) {
  const file = e.target.files;
  $(this).parent('.form-add').find('ul').append(`<li><span>${file[0].name}</span><button class="clear-form">Удалить</button></li>`);
  $(this).find('.btn-add').hide();
});
$(document).on('click', '.clear-form', function (event) {
  event.preventDefault();
  $(this).parents('.form-add').find('.btn-add').show();
  $(this).parent('li').remove();
});

$(document).on('click, touchstart', '.fancybox-container', (event) => {
  $.fancybox.close();
});
document.querySelectorAll('.group__field').forEach((elem) => {
  elem.addEventListener('focus', (i) => {
    i.target.previousElementSibling.style.cssText = 'font-size: 12px; top: -19px';
    i.target.nextElementSibling.remove();
    i.target.classList.remove('error');
  });
});
document.querySelectorAll('.group__field').forEach((elem) => {
  elem.addEventListener('blur', (i) => {
    if (i.target.value === '') {
      i.target.previousElementSibling.style.cssText = '';
    }
  });
});

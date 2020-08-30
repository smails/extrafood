"use strict";

/* eslint-disable prefer-rest-params */

/* eslint-disable no-plusplus */

/* eslint-disable no-prototype-builtins */

/* eslint-disable no-shadow */

/* eslint-disable func-names */

/* eslint-disable no-param-reassign */
// remove
(function () {
  var arr = [window.Element, window.CharacterData, window.DocumentType];
  var args = [];
  arr.forEach(function (item) {
    if (item) {
      args.push(item.prototype);
    }
  });

  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('remove')) {
        return;
      }

      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          this.parentNode.removeChild(this);
        }
      });
    });
  })(args);
})(); // includes


if (!String.prototype.includes) {
  // eslint-disable-next-line no-extend-native
  String.prototype.includes = function (search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    }

    return this.indexOf(search, start) !== -1;
  };
} // foreach


if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // prepend


(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }

    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments);
        var docFrag = document.createDocumentFragment();
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]); // entries


if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj);
    var i = ownProps.length;
    var resArray = new Array(i); // preallocate the Array

    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }

    return resArray;
  };
} //after


(function (x) {
  var o = x.prototype,
      p = 'after';

  if (!o[p]) {
    o[p] = function () {
      var e,
          m = arguments,
          l = m.length,
          i = 0,
          t = this,
          p = t.parentNode,
          n = Node,
          s = String,
          d = document;

      if (p !== null) {
        while (i < l) {
          e = m[i];

          if (e instanceof n) {
            t = t.nextSibling;

            if (t !== null) {
              p.insertBefore(e, t);
            } else {
              p.appendChild(e);
            }

            ;
          } else {
            p.appendChild(d.createTextNode(s(e)));
          }

          ;
          ++i;
        }

        ;
      }

      ;
    };
  }

  ;
})(Element);
"use strict";

/* eslint-disable no-undef */
var _window = window,
    Scrollbar = _window.Scrollbar;
var scrollEvent = Scrollbar.init(document.querySelector('main'));
scrollEvent.addListener(function (s) {
  $('select').select2('close');
  headerFix(s.offset.y);
});
$('select').select2({
  minimumResultsForSearch: Infinity,
  width: 'style',
  selectOnClose: true
});
$('select').on('select2:open', function () {
  // eslint-disable-next-line no-console
  Scrollbar.init(document.querySelector('.select2-results'), {
    alwaysShowTracks: true
  });
});
$('document').ready(function () {
  $('input[name="phone"]').mask('+7(999) 999-99-99');
  $('.js-open-modal').click(function () {
    $('.modal').css('display', 'flex');
    setTimeout(function () {
      $('.modal').css('opacity', '1');
    }, 500);
    setTimeout(function () {
      $('.modal__container').fadeIn();
    }, 600);
  });
  $('.modal__close').click(function () {
    $('.modal').css('opacity', '0');
    $('.modal__container').fadeOut();
    setTimeout(function () {
      $('.modal').attr('style', '');
    }, 500);
  });
  $('.up').click(function () {
    scrollEvent.scrollTo(0, 0, '800');
  });
  var isValid;
  var check;
  $('form').submit(function (e) {
    e.preventDefault();
    var $form = $(this);
    $form.find('.required').each(function (index, elem) {
      if (elem.value === '') {
        if (!elem.nextElementSibling || !elem.nextElementSibling.classList.contains('error-tooltip')) {
          var formTooltip = document.createElement('span');
          var text = '';

          if (elem.previousElementSibling === null) {
            text = elem.selectedOptions[0].text.replace('Выберите ', '');
          } else {
            text = elem.previousElementSibling.textContent;
          }

          formTooltip.className = 'error-tooltip';
          formTooltip.textContent = "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0443\u043A\u0430\u0436\u0438\u0442\u0435 ".concat(text.toLowerCase());
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
      setTimeout(function () {
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
  var file = e.target.files;
  $(this).parent('.form-add').find('ul').append("<li><span>".concat(file[0].name, "</span><button class=\"clear-form\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button></li>"));
  $(this).find('.btn-add').hide();
});
$(document).on('click', '.clear-form', function (event) {
  event.preventDefault();
  $(this).parents('.form-add').find('.btn-add').show();
  $(this).parent('li').remove();
});
$(document).on('click, touchstart', '.fancybox-container', function (event) {
  $.fancybox.close();
});
document.querySelectorAll('.group__field').forEach(function (elem) {
  elem.addEventListener('focus', function (i) {
    i.target.previousElementSibling.style.cssText = 'font-size: 12px; top: -19px';
    i.target.nextElementSibling.remove();
    i.target.classList.remove('error');
  });
});
document.querySelectorAll('.group__field').forEach(function (elem) {
  elem.addEventListener('blur', function (i) {
    if (i.target.value === '') {
      i.target.previousElementSibling.style.cssText = '';
    }
  });
});
"use strict";

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
  slide: function slide(event, ui) {
    $(this).parent('.filter__tab-numb').find('.filter__field_from').val(ui.values[0]);
    $(this).parent('.filter__tab-numb').find('.filter__field_to').val(ui.values[1]);
  }
});
$('.filter__field_from').val($('.filter__stepper').slider('values', 0));
$('.filter__field_to').val($('.filter__stepper').slider('values', 1));
$('.filter__caption').click(function () {
  $(this).toggleClass('active');
  $(this).next().slideToggle();
}); // eslint-disable-next-line no-unused-vars

var leftCatalogSidebar = function leftCatalogSidebar(scroll) {
  if (document.querySelector('.sidebar')) {
    if (scroll > document.querySelector('.sidebar').style.paddingTop && scroll < document.querySelector('.scroll-content').scrollHeight - (document.querySelector('.sidebar').scrollHeight + document.querySelector('.footer').scrollHeight)) {
      document.querySelector('.sidebar').style.top = "".concat(scroll, "px");
    } else if (scroll < 100) {
      document.querySelector('.sidebar').style.top = 0;
    }
  }
}; // eslint-disable-next-line no-undef


if (document.querySelector('.search-cart__list')) {
  Scrollbar.init(document.querySelector('.search-cart__list'));
}

$('.search-cart__btn-filter').click(function () {
  $('.filter').slideDown();
  $('.basket-open').hide();
  initCloseFiler();
});
$('.filter__close').click(function (e) {
  e.preventDefault();
  $('.filter').slideUp();
  setTimeout(function () {
    $('.basket-open').show();
  }, 300);
});
$('.search-cart__field').on('keypress, keyup', function () {
  $('.search-cart__list[data-scrollbar]').slideDown();

  if (window.innerWidth < 1280) {
    $('.js-open-menu').find('.sign').removeClass('open');
    $('.js-open-menu').find('.burger').removeClass('open');
    $('.header__menu').slideUp();
  }
});
$('.search-cart__field').blur(function () {
  $('.search-cart__list[data-scrollbar]').slideUp();
});
$('.filter__field').focusout(function () {
  var input_left = $('.filter__field_from').val().replace(/[^0-9]/g, '');
  var opt_left = $('.filter__stepper').slider('option', 'min');
  var where_right = $('.filter__stepper').slider('values', 1);
  var input_right = $('.filter__field_to').val().replace(/[^0-9]/g, '');
  var opt_right = $('.filter__stepper').slider('option', 'max');
  var where_left = $('.filter__stepper').slider('values', 0);

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
$('.filter__reset').click(function (e) {
  e.preventDefault();
  $('.filter__field_from').val(0);
  $('.filter__field_to').val(3000);
  $('.filter__stepper').slider('values', [0, 3000]);
  $('.checkbox__hidden').prop('checked', false);
});

var initCloseFiler = function initCloseFiler() {
  if (window.innerWidth < 1280 && window.innerWidth > 480) {
    window.addEventListener('click', function (e) {
      if (e.pageX < 475 && window.innerWidth > 480 || e.pageX < 730 && window.innerWidth > 769) {
        $('.filter').slideUp();
        setTimeout(function () {
          $('.basket-open').show();
        }, 300);
      }
    });
  }
};

$('.search-cart__btn-catalog-mobile').click(function () {
  $('.catalog__sidebar').slideDown();
  $(window).click(function (e) {
    if (e.pageX > 260) {
      $('.catalog__sidebar').slideUp();
    }
  });
});
"use strict";
"use strict";

/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
var headerFix = function headerFix(scroll) {
  if (scroll > 20) {
    document.querySelector(".header").classList.add('fix');
  } else {
    document.querySelector(".header").classList.remove('fix');
  }

  document.querySelector(".header").style.transform = "translateY(".concat(scroll, "px)");
}; // eslint-disable-next-line func-names


$('.js-open-menu').click(function () {
  $(this).find('.sign').toggleClass('open');
  $(this).find('.burger').toggleClass('open');
  $('.header__menu').slideToggle();
  $('.basket-open').fadeToggle();
});
"use strict";
"use strict";
"use strict";
"use strict";
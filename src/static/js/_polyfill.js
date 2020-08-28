/* eslint-disable prefer-rest-params */
/* eslint-disable no-plusplus */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// remove
(function () {
  const arr = [window.Element, window.CharacterData, window.DocumentType];
  const args = [];

  arr.forEach((item) => {
    if (item) {
      args.push(item.prototype);
    }
  });
  (function (arr) {
    arr.forEach((item) => {
      if (item.hasOwnProperty('remove')) {
        return;
      }
      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          this.parentNode.removeChild(this);
        },
      });
    });
  }(args));
}());
// includes
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
}
// foreach
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
// prepend
(function (arr) {
  arr.forEach((item) => {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        const argArr = Array.prototype.slice.call(arguments);
        const docFrag = document.createDocumentFragment();

        argArr.forEach((argItem) => {
          const isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.insertBefore(docFrag, this.firstChild);
      },
    });
  });
}([Element.prototype, Document.prototype, DocumentFragment.prototype]));
// entries
if (!Object.entries) {
  Object.entries = function (obj) {
    const ownProps = Object.keys(obj);
    let i = ownProps.length;
    const resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}
//after
(function (x) {
  var o = x.prototype,
    p = 'after';
  if (!o[p]) {
    o[p] = function () {
      var e, m = arguments,
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
            };
          } else {
            p.appendChild(d.createTextNode(s(e)));
          };
          ++i;
        };
      };
    };
  };
})(Element);

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImgPath = exports.loadMore = void 0;

var _mUtils = require("../../config/mUtils");

var loadMore = {
  directives: {
    'load-more': {
      bind: function bind(el, binding) {
        var windowHeight = window.screen.height;
        var height;
        var setTop;
        var paddingBottom;
        var marginBottom;
        var requestFram;
        var oldScrollTop;
        var scrollEl;
        var heightEl;
        var scrollType = el.attributes.type && el.attributes.type.value;
        var scrollReduce = 2;

        if (scrollType == 2) {
          scrollEl = el;
          heightEl = el.children[0];
        } else {
          scrollEl = document.body;
          heightEl = el;
        }

        el.addEventListener('touchstart', function () {
          height = heightEl.clientHeight;

          if (scrollType == 2) {
            height = height;
          }

          setTop = el.offsetTop;
          paddingBottom = (0, _mUtils.getStyle)(el, 'paddingBottom');
          marginBottom = (0, _mUtils.getStyle)(el, 'marginBottom');
        }, false);
        el.addEventListener('touchmove', function () {
          loadMore();
        }, false);
        el.addEventListener('touchend', function () {
          oldScrollTop = scrollEl.scrollTop;
          moveEnd();
        }, false);

        var moveEnd = function moveEnd() {
          requestFram = requestAnimationFrame(function () {
            if (scrollEl.scrollTop != oldScrollTop) {
              oldScrollTop = scrollEl.scrollTop;
              moveEnd();
            } else {
              cancelAnimationFrame(requestFram);
              height = heightEl.clientHeight;
              loadMore();
            }
          });
        };

        var loadMore = function loadMore() {
          if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
            binding.value();
          }
        };
      }
    }
  }
};
exports.loadMore = loadMore;
var getImgPath = {
  methods: {
    //传递过来的图片地址需要处理后才能正常使用
    getImgPath: function getImgPath(path) {
      var suffix;

      if (!path) {
        return '//elm.cangdu.org/img/default.jpg';
      }

      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg';
      } else {
        suffix = '.png';
      }

      var url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
      return 'https://fuss10.elemecdn.com' + url;
    }
  }
};
exports.getImgPath = getImgPath;
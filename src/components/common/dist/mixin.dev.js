"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImgPath = exports.loadMore = void 0;

var _mUtils = require("../../config/mUtils");

var loadMore = {
  directives: {
    //自定义指令: 下拉加
    // const throttle = function (fn, gapTime) {
    //     let _lastTime = null;
    //     return function () {
    //         let _nowTime = + new Date()
    //         if (_nowTime - _lastTime > gapTime || !_lastTime) {
    //             fn();
    //             _lastTime = _nowTime
    //         }
    //     }
    // }
    'load-more': {
      bind: function bind(el, binding) {
        addEventListener('scroll', function () {
          var scrollTop = document.documentElement.scrollTop; //body 卷出去的高度

          var scrollHeight = document.body.scrollHeight; // 内容高度

          var num = scrollTop + window.innerHeight >= scrollHeight - 20;

          if (scrollTop + window.innerHeight >= scrollHeight - 45) {
            binding.value();
          }
        });
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
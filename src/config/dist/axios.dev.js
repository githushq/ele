"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var myaixos = {};

myaixos.install = function (Vue) {
  _axios["default"].defaults.baseURL = 'http://cangdu.org:8001/';
  _axios["default"].defaults.withCredentials = true; // 请求后带上cookie

  _axios["default"].interceptors.request.use(function (config) {
    return config;
  });

  Vue.prototype.$http = _axios["default"];
};

var _default = myaixos;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imgBaseUrl = exports.routerMode = exports.baseUrl = void 0;

/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
var baseUrl = '';
exports.baseUrl = baseUrl;
var routerMode = 'hash';
exports.routerMode = routerMode;
var imgBaseUrl = '';
exports.imgBaseUrl = imgBaseUrl;

if (process.env.NODE_ENV == 'development') {
  exports.imgBaseUrl = imgBaseUrl = '/img/';
} else if (process.env.NODE_ENV == 'production') {
  exports.baseUrl = baseUrl = '//elm.cangdu.org';
  exports.imgBaseUrl = imgBaseUrl = '//elm.cangdu.org/img/';
}
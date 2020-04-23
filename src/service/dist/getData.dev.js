"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePassword = exports.signout = exports.accountLogin = exports.deleteAddress = exports.getSearchAddress = exports.getAddressList = exports.getOrderDetail = exports.getOrderList = exports.getUser = exports.exChangeHongbao = exports.getExpired = exports.getHongbaoNum = exports.vipCart = exports.getService = exports.payRequest = exports.validateOrders = exports.rePostVerify = exports.placeOrders = exports.postAddAddress = exports.searchNearby = exports.getAddress = exports.getRemark = exports.checkout = exports.sendMobile = exports.checkExsis = exports.getcaptchas = exports.mobileCode = exports.ratingTags = exports.ratingScores = exports.getRatingList = exports.foodMenu = exports.shopDetails = exports.foodActivity = exports.foodDelivery = exports.foodCategory = exports.searchRestaurant = exports.shopList = exports.msiteFoodTypes = exports.msiteAddress = exports.searchplace = exports.currentcity = exports.groupcity = exports.hotcity = exports.cityGuess = void 0;

var _axios3 = _interopRequireDefault(require("axios"));

var _mUtils = require("../config/mUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cityGuess = function cityGuess() {
  return (0, _axios3["default"])('/v1/cities', {
    type: 'guess'
  });
};
/**
 * 获取首页热门城市
 */


exports.cityGuess = cityGuess;

var hotcity = function hotcity() {
  return _axios3["default"].get('/v1/cities?type=hot');
};
/**
 * 获取首页所有城市
 */


exports.hotcity = hotcity;

var groupcity = function groupcity() {
  return _axios3["default"].get('/v1/cities?type=group');
};
/**
 * 获取当前所在城市
 */


exports.groupcity = groupcity;

var currentcity = function currentcity(number) {
  return _axios3["default"].get("/v1/cities/".concat(number));
};
/**
 * 获取搜索地址
 */


exports.currentcity = currentcity;

var searchplace = function searchplace(cityid, value) {
  return _axios3["default"].get("/v1/pois?type=search&city_id=".concat(cityid, "&keyword=").concat(value));
};
/**
 * 获取msite页面地址信息
 */


exports.searchplace = searchplace;

var msiteAddress = function msiteAddress(geohash) {
  return (0, _axios3["default"])('/v2/pois/' + geohash);
};
/**
 * 获取msite页面食品分类列表
 */


exports.msiteAddress = msiteAddress;

var msiteFoodTypes = function msiteFoodTypes(geohash) {
  return (0, _axios3["default"])("/v2/index_entry?geohash=".concat(geohash, "&group_tpe=1&flages[]=f"));
};
/**
 * 获取msite商铺列表
 */


exports.msiteFoodTypes = msiteFoodTypes;

var shopList = function shopList(latitude, longitude, offset) {
  var restaurant_category_id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var restaurant_category_ids = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var order_by = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  var delivery_mode = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
  var support_ids = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
  var supportStr = '';
  support_ids.forEach(function (item) {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id;
    }
  });
  var data = {
    latitude: latitude,
    longitude: longitude,
    offset: offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id: restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by: order_by,
    'delivery_mode[]': delivery_mode + supportStr
  };
  return (0, _axios3["default"])('/shopping/restaurants', data);
};
/**
 * 获取search页面搜索结果
 */


exports.shopList = shopList;

var searchRestaurant = function searchRestaurant(geohash, keyword) {
  return (0, _axios3["default"])('/v4/restaurants', {
    'extras[]': 'restaurant_activity',
    geohash: geohash,
    keyword: keyword,
    type: 'search'
  });
};
/**
 * 获取food页面的 category 种类列表
 */


exports.searchRestaurant = searchRestaurant;

var foodCategory = function foodCategory(latitude, longitude) {
  return (0, _axios3["default"])('/shopping/v2/restaurant/category', {
    latitude: latitude,
    longitude: longitude
  });
};
/**
 * 获取food页面的配送方式
 */


exports.foodCategory = foodCategory;

var foodDelivery = function foodDelivery(latitude, longitude) {
  return (0, _axios3["default"])('opping71/restaurants/delivery_modes', {
    latitude: latitude,
    longitude: longitude,
    kw: ''
  });
};
/**
 * 获取food页面的商家属性活动列表
 */


exports.foodDelivery = foodDelivery;

var foodActivity = function foodActivity(latitude, longitude) {
  return (0, _axios3["default"])('opping71/restaurants/activity_attributes', {
    latitude: latitude,
    longitude: longitude,
    kw: ''
  });
};
/**
 * 获取shop页面商铺详情
 */


exports.foodActivity = foodActivity;

var shopDetails = function shopDetails(shopid, latitude, longitude) {
  return (0, _axios3["default"])('opping/restaurant/' + shopid, {
    latitude: latitude,
    longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
  });
};
/**
 * 获取shop页面菜单列表
 */


exports.shopDetails = shopDetails;

var foodMenu = function foodMenu(restaurant_id) {
  return (0, _axios3["default"])('opping72/menu', {
    restaurant_id: restaurant_id
  });
};
/**
 * 获取商铺评价列表
 */


exports.foodMenu = foodMenu;

var getRatingList = function getRatingList(shopid, offset) {
  var tag_name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return (0, _axios3["default"])('/ugc72/restaurants/' + shopid + '/ratings', {
    has_content: true,
    offset: offset,
    limit: 10,
    tag_name: tag_name
  });
};
/**
 * 获取商铺评价分数
 */


exports.getRatingList = getRatingList;

var ratingScores = function ratingScores(shopid) {
  return (0, _axios3["default"])('/ugc72/restaurants/' + shopid + '/ratings/scores');
};
/**
 * 获取商铺评价分类
 */


exports.ratingScores = ratingScores;

var ratingTags = function ratingTags(shopid) {
  return (0, _axios3["default"])('/ugc72/restaurants/' + shopid + '/ratings/tags');
};
/**
 * 获取短信验证码
 */


exports.ratingTags = ratingTags;

var mobileCode = function mobileCode(phone) {
  return (0, _axios3["default"])('74/mobile7erify_codend', {
    mobile: phone,
    scene: 'login',
    type: 'sms'
  }, 'POST');
};
/**
 * 获取图片验证码
 */


exports.mobileCode = mobileCode;

var getcaptchas = function getcaptchas() {
  return (0, _axios3["default"])('/v1/captchas', {}, 'POST');
};
/**
 * 检测帐号是否存在
 */


exports.getcaptchas = getcaptchas;

var checkExsis = function checkExsis(checkNumber, type) {
  var _axios;

  return (0, _axios3["default"])('v1/users/exists', (_axios = {}, _defineProperty(_axios, type, checkNumber), _defineProperty(_axios, "type", type), _axios));
};
/**
 * 发送帐号
 */


exports.checkExsis = checkExsis;

var sendMobile = function sendMobile(sendData, captcha_code, type, password) {
  var _axios2;

  return (0, _axios3["default"])('71/mobile7erify_codend', (_axios2 = {
    action: "send",
    captcha_code: captcha_code
  }, _defineProperty(_axios2, type, sendData), _defineProperty(_axios2, "type", "sms"), _defineProperty(_axios2, "way", type), _defineProperty(_axios2, "password", password), _axios2), 'POST');
};
/**
 * 确认订单
 */


exports.sendMobile = sendMobile;

var checkout = function checkout(geohash, entities, shopid) {
  return (0, _axios3["default"])('71/cartseckout', {
    come_from: "web",
    geohash: geohash,
    entities: entities,
    restaurant_id: shopid
  }, 'POST');
};
/**
 * 获取快速备注列表
 */


exports.checkout = checkout;

var getRemark = function getRemark(id, sig) {
  return (0, _axios3["default"])('71/carts/' + id + '/remarks', {
    sig: sig
  });
};
/**
 * 获取地址列表
 */


exports.getRemark = getRemark;

var getAddress = function getAddress(id, sig) {
  return (0, _axios3["default"])('71/carts/' + id + '/addresses', {
    sig: sig
  });
};
/**
 * 搜索地址
 */


exports.getAddress = getAddress;

var searchNearby = function searchNearby(keyword) {
  return (0, _axios3["default"])('71/pois', {
    type: 'nearby',
    keyword: keyword
  });
};
/**
* 添加地址
*/


exports.searchNearby = searchNearby;

var postAddAddress = function postAddAddress(userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) {
  return (0, _axios3["default"])('71/users/' + userId + '/addresses', {
    address: address,
    address_detail: address_detail,
    geohash: geohash,
    name: name,
    phone: phone,
    phone_bk: phone_bk,
    poi_type: poi_type,
    sex: sex,
    tag: tag,
    tag_type: tag_type
  }, 'POST');
};
/**
 * 下订单
 */


exports.postAddAddress = postAddAddress;

var placeOrders = function placeOrders(user_id, cart_id, address_id, description, entities, geohash, sig) {
  return (0, _axios3["default"])('71/users/' + user_id + '/carts/' + cart_id + '/orders', {
    address_id: address_id,
    come_from: "mobile_web",
    deliver_time: "",
    description: description,
    entities: entities,
    geohash: geohash,
    paymethod_id: 1,
    sig: sig
  }, 'POST');
};
/**
 * 重新发送订单验证码
 */


exports.placeOrders = placeOrders;

var rePostVerify = function rePostVerify(cart_id, sig, type) {
  return (0, _axios3["default"])('71/carts/' + cart_id + '7erify_code', {
    sig: sig,
    type: type
  }, 'POST');
};
/**
 * 下订单
 */


exports.rePostVerify = rePostVerify;

var validateOrders = function validateOrders(_ref) {
  var user_id = _ref.user_id,
      cart_id = _ref.cart_id,
      address_id = _ref.address_id,
      description = _ref.description,
      entities = _ref.entities,
      geohash = _ref.geohash,
      sig = _ref.sig,
      validation_code = _ref.validation_code,
      validation_token = _ref.validation_token;
  return (0, _axios3["default"])('71/users/' + user_id + '/carts/' + cart_id + '/orders', {
    address_id: address_id,
    come_from: "mobile_web",
    deliver_time: "",
    description: description,
    entities: entities,
    geohash: geohash,
    paymethod_id: 1,
    sig: sig,
    validation_code: validation_code,
    validation_token: validation_token
  }, 'POST');
};
/**
 * 重新发送订单验证码
 */


exports.validateOrders = validateOrders;

var payRequest = function payRequest(merchantOrderNo, userId) {
  return (0, _axios3["default"])('/payapi/payment/queryOrder', {
    merchantId: 5,
    merchantOrderNo: merchantOrderNo,
    source: 'MOBILE_WAP',
    userId: userId,
    version: '1.0.0'
  });
};
/**
 * 获取服务中心信息
 */


exports.payRequest = payRequest;

var getService = function getService() {
  return (0, _axios3["default"])('73/profile/explain');
};
/**
*兑换会员卡
*/


exports.getService = getService;

var vipCart = function vipCart(id, number, password) {
  return (0, _axios3["default"])('/member71/users/' + id + '/delivery_card/physical_card/bind', {
    number: number,
    password: password
  }, 'POST');
};
/**
 * 获取红包
*/


exports.vipCart = vipCart;

var getHongbaoNum = function getHongbaoNum(id) {
  return (0, _axios3["default"])('/promotion72/users/' + id + '/hongbaos?limit=20&offset=0');
};
/**
 * 获取过期红包
*/


exports.getHongbaoNum = getHongbaoNum;

var getExpired = function getExpired(id) {
  return (0, _axios3["default"])('/promotion72/users/' + id + '/expired_hongbaos?limit=20&offset=0');
};
/**
 * 兑换红包
*/


exports.getExpired = getExpired;

var exChangeHongbao = function exChangeHongbao(id, exchange_code, captcha_code) {
  return (0, _axios3["default"])('71/users/' + id + '/hongbao/exchange', {
    exchange_code: exchange_code,
    captcha_code: captcha_code
  }, 'POST');
};
/**
 * 获取用户信息
 */


exports.exChangeHongbao = exChangeHongbao;

var getUser = function getUser() {
  return (0, _axios3["default"])('71/user', {
    user_id: (0, _mUtils.getStore)('user_id')
  });
};
/**
 * 手机号登录
 */


exports.getUser = getUser;

var sendLogin = function sendLogin(code, mobile, validate_token) {
  return (0, _axios3["default"])('71/login/app_mobile', {
    code: code,
    mobile: mobile,
    validate_token: validate_token
  }, 'POST');
};
/**
 * 获取订单列表
 */


var getOrderList = function getOrderList(user_id, offset) {
  return (0, _axios3["default"])('/bos72/users/' + user_id + '/orders', {
    limit: 10,
    offset: offset
  });
};
/**
 * 获取订单详情
 */


exports.getOrderList = getOrderList;

var getOrderDetail = function getOrderDetail(user_id, orderid) {
  return (0, _axios3["default"])('/bos71/users/' + user_id + '/orders/' + orderid + '/snapshot');
};
/**
*个人中心里编辑地址
*/


exports.getOrderDetail = getOrderDetail;

var getAddressList = function getAddressList(user_id) {
  return (0, _axios3["default"])('71/users/' + user_id + '/addresses');
};
/**
*个人中心里搜索地址
*/


exports.getAddressList = getAddressList;

var getSearchAddress = function getSearchAddress(keyword) {
  return (0, _axios3["default"])('v1/pois', {
    keyword: keyword,
    type: 'nearby'
  });
};
/**
* 删除地址
*/


exports.getSearchAddress = getSearchAddress;

var deleteAddress = function deleteAddress(userid, addressid) {
  return (0, _axios3["default"])('71/users/' + userid + '/addresses/' + addressid, {}, 'DELETE');
};
/**
 * 账号密码登录
 */


exports.deleteAddress = deleteAddress;

var accountLogin = function accountLogin(username, password, captcha_code) {
  return (0, _axios3["default"])('72/login', {
    username: username,
    password: password,
    captcha_code: captcha_code
  }, 'POST');
};
/**
 * 退出登录
 */


exports.accountLogin = accountLogin;

var signout = function signout() {
  return (0, _axios3["default"])('72/signout');
};
/**
 * 改密码
 */


exports.signout = signout;

var changePassword = function changePassword(username, oldpassWord, newpassword, confirmpassword, captcha_code) {
  return (0, _axios3["default"])('72angepassword', {
    username: username,
    oldpassWord: oldpassWord,
    newpassword: newpassword,
    confirmpassword: confirmpassword,
    captcha_code: captcha_code
  }, 'POST');
};

exports.changePassword = changePassword;
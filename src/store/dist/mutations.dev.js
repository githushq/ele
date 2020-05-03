"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mutationTypes = require("./mutation-types.js");

var _mUtils = require("../config/mUtils");

var _env = require("../config/env");

var _RECORD_ADDRESS$RECOR;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_RECORD_ADDRESS$RECOR = {}, _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.RECORD_ADDRESS, function (state, _ref) {
  var latitude = _ref.latitude,
      longitude = _ref.longitude;
  state.latitude = latitude;
  state.longitude = longitude;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.RECORD_SHOPDETAIL, function (state, detail) {
  state.shopDetail = detail;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.ADD_CART, function (state, _ref2) {
  var shopid = _ref2.shopid,
      category_id = _ref2.category_id,
      item_id = _ref2.item_id,
      food_id = _ref2.food_id,
      name = _ref2.name,
      price = _ref2.price,
      specs = _ref2.specs,
      packing_fee = _ref2.packing_fee,
      sku_id = _ref2.sku_id,
      stock = _ref2.stock;
  var cart = state.cartList;
  var shop = cart[shopid] = cart[shopid] || {};
  var category = shop[category_id] = shop[category_id] || {};
  var item = category[item_id] = category[item_id] || {};

  if (item[food_id]) {
    item[food_id]['num']++;
  } else {
    item[food_id] = {
      "num": 1,
      "id": food_id,
      "name": name,
      "price": price,
      "specs": specs,
      "packing_fee": packing_fee,
      "sku_id": sku_id,
      "stock": stock
    };
  }

  state.cartList = _objectSpread({}, cart); //存入localStorage

  (0, _mUtils.setStore)('buyCart', state.cartList);
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.REDUCE_CART, function (state, _ref3) {
  var shopid = _ref3.shopid,
      category_id = _ref3.category_id,
      item_id = _ref3.item_id,
      food_id = _ref3.food_id,
      name = _ref3.name,
      price = _ref3.price,
      specs = _ref3.specs;
  var cart = state.cartList;
  var shop = cart[shopid] || {};
  var category = shop[category_id] || {};
  var item = category[item_id] || {};

  if (item && item[food_id]) {
    if (item[food_id]['num'] > 0) {
      item[food_id]['num']--;
      state.cartList = _objectSpread({}, cart); //存入localStorage

      (0, _mUtils.setStore)('buyCart', state.cartList);
    } else {
      alert(99); //商品数量为0，则清空当前商品的信息

      item[food_id] = null; //  console.log(state.cartLIST);
    }
  }
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.INIT_BUYCART, function (state) {
  var initCart = (0, _mUtils.getStore)('buyCart');

  if (initCart) {
    state.cartList = JSON.parse(initCart);
  }
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.CLEAR_CART, function (state, shopid) {
  state.cartList[shopid] = null;
  state.cartList = _objectSpread({}, state.cartList);
  (0, _mUtils.setStore)('buyCart', state.cartList);
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.RECORD_USERINFO, function (state, info) {
  state.userInfo = info;
  state.login = true;
  (0, _mUtils.setStore)('user_id', info.user_id);
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.GET_USERINFO, function (state, info) {
  if (state.userInfo && state.userInfo.username !== info.username) {
    return;
  }

  ;

  if (!state.login) {
    return;
  }

  if (!info.message) {
    state.userInfo = _objectSpread({}, info);
  } else {
    state.userInfo = null;
  }
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.RETSET_NAME, function (state, username) {
  state.userInfo = Object.assign({}, state.userInfo, {
    username: username
  });
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.SAVE_SHOPID, function (state, shopid) {
  state.shopid = shopid;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.CONFIRM_REMARK, function (state, _ref4) {
  var remarkText = _ref4.remarkText,
      inputText = _ref4.inputText;
  state.remarkText = remarkText;
  state.inputText = inputText;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.CONFIRM_INVOICE, function (state, invoice) {
  state.invoice = invoice;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.CHOOSE_SEARCH_ADDRESS, function (state, place) {
  state.searchAddress = place;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.SAVE_GEOHASH, function (state, geohash) {
  state.geohash = geohash;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.CONFIRM_ADDRESS, function (state, newAddress) {
  state.newAddress.push(newAddress);
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.CHOOSE_ADDRESS, function (state, _ref5) {
  var address = _ref5.address,
      index = _ref5.index;
  state.choosedAddress = address;
  state.addressIndex = index;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.NEED_VALIDATION, function (state, needValidation) {
  state.needValidation = needValidation;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.SAVE_CART_ID_SIG, function (state, _ref6) {
  var cart_id = _ref6.cart_id,
      sig = _ref6.sig;
  state.cart_id = cart_id;
  state.sig = sig;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.SAVE_ORDER_PARAM, function (state, orderParam) {
  state.orderParam = orderParam;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.CHANGE_ORDER_PARAM, function (state, newParam) {
  state.orderParam = Object.assign({}, state.orderParam, newParam);
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.ORDER_SUCCESS, function (state, order) {
  state.cartPrice = null;
  state.orderMessage = order;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.SAVE_ORDER, function (state, orderDetail) {
  state.orderDetail = orderDetail;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.OUT_LOGIN, function (state) {
  state.userInfo = {};
  state.login = false;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.SAVE_AVANDER, function (state, imgPath) {
  state.imgPath = imgPath;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.SAVE_ADDRESS, function (state, newAdress) {
  state.removeAddress = newAdress;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.SAVE_ADDDETAIL, function (state, addAddress) {
  state.addAddress = addAddress;
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.SAVE_QUESTION, function (state, question) {
  state.question = _objectSpread({}, question);
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.ADD_ADDRESS, function (state, obj) {
  state.removeAddress = [obj].concat(_toConsumableArray(state.removeAddress));
}), _defineProperty(_RECORD_ADDRESS$RECOR, _mutationTypes.BUY_CART, function (state, price) {
  state.cartPrice = price;
}), _RECORD_ADDRESS$RECOR);

exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getData = require("../service/getData");

var _mutationTypes = require("./mutation-types.js");

var _default = {
  getUserInfo: function getUserInfo(_ref) {
    var commit, state, res;
    return regeneratorRuntime.async(function getUserInfo$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit, state = _ref.state;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _getData.getUser)());

          case 3:
            res = _context.sent;
            commit(_mutationTypes.GET_USERINFO, res);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  saveAddress: function saveAddress(_ref2) {
    var commit, state, addres;
    return regeneratorRuntime.async(function saveAddress$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit, state = _ref2.state;

            if (!(state.removeAddress.length > 0)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            _context2.next = 5;
            return regeneratorRuntime.awrap((0, _getData.getAddressList)(state.userInfo.user_id));

          case 5:
            addres = _context2.sent;
            commit(_mutationTypes.SAVE_ADDRESS, addres);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
exports["default"] = _default;
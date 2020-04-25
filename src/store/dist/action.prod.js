"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _getData=require("../service/getData"),_mutationTypes=require("./mutation-types.js"),_default={getUserInfo:function(t){var r,a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.commit,t.state,e.next=3,regeneratorRuntime.awrap((0,_getData.getUser)());case 3:a=e.sent,r(_mutationTypes.GET_USERINFO,a);case 5:case"end":return e.stop()}})},saveAddress:function(t){var r,a,n;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.commit,0<(a=t.state).removeAddress.length)return e.abrupt("return");e.next=3;break;case 3:return e.next=5,regeneratorRuntime.awrap((0,_getData.getAddressList)(a.userInfo.user_id));case 5:n=e.sent,r(_mutationTypes.SAVE_ADDRESS,n);case 7:case"end":return e.stop()}})}};exports.default=_default;
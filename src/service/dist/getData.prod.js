"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.changePassword=exports.signout=exports.accountLogin=exports.deleteAddress=exports.getSearchAddress=exports.getAddressList=exports.getOrderDetail=exports.getOrderList=exports.getUser=exports.exChangeHongbao=exports.getExpired=exports.getHongbaoNum=exports.vipCart=exports.getService=exports.payRequest=exports.validateOrders=exports.rePostVerify=exports.placeOrders=exports.postAddAddress=exports.searchNearby=exports.getAddress=exports.getRemark=exports.checkout=exports.sendMobile=exports.checkExsis=exports.getcaptchas=exports.mobileCode=exports.ratingTags=exports.ratingScores=exports.getRatingList=exports.foodMenu=exports.shopDetails=exports.foodActivity=exports.foodDelivery=exports.foodCategory=exports.searchRestaurant=exports.shopList=exports.msiteFoodTypes=exports.msiteAddress=exports.searchplace=exports.currentcity=exports.groupcity=exports.hotcity=exports.cityGuess=void 0;var _axios3=_interopRequireDefault(require("axios")),_mUtils=require("../config/mUtils");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var cityGuess=function(){return(0,_axios3.default)("/v1/cities",{type:"guess"})};exports.cityGuess=cityGuess;var hotcity=function(){return _axios3.default.get("/v1/cities?type=hot")};exports.hotcity=hotcity;var groupcity=function(){return _axios3.default.get("/v1/cities?type=group")};exports.groupcity=groupcity;var currentcity=function(e){return _axios3.default.get("/v1/cities/".concat(e))};exports.currentcity=currentcity;var searchplace=function(e,t){return _axios3.default.get("/v1/pois?type=search&city_id=".concat(e,"&keyword=").concat(t))};exports.searchplace=searchplace;var msiteAddress=function(e){return _axios3.default.get("/v2/pois/".concat(e))};exports.msiteAddress=msiteAddress;var msiteFoodTypes=function(e){return(0,_axios3.default)("/v2/index_entry?geohash=".concat(e,"&group_tpe=1&flages[]=f"))};exports.msiteFoodTypes=msiteFoodTypes;var shopList=function(e,t,r,s,o,a,i,n){var d=3<arguments.length&&void 0!==s?s:"",u=4<arguments.length&&void 0!==o?o:"",c=5<arguments.length&&void 0!==a?a:"",p=6<arguments.length&&void 0!==i?i:"",g="";(7<arguments.length&&void 0!==n?n:[]).forEach(function(e){e.status&&(g+="&support_ids[]="+e.id)});var x={latitude:e,longitude:t,offset:r,limit:"20","extras[]":"activities",keyword:"",restaurant_category_id:d,"restaurant_category_ids[]":u,order_by:c,"delivery_mode[]":p+g};return(0,_axios3.default)("/shopping/restaurants",x)};exports.shopList=shopList;var searchRestaurant=function(e,t){return(0,_axios3.default)("/v4/restaurants",{"extras[]":"restaurant_activity",geohash:e,keyword:t,type:"search"})};exports.searchRestaurant=searchRestaurant;var foodCategory=function(e,t){return(0,_axios3.default)("/shopping/v2/restaurant/category",{latitude:e,longitude:t})};exports.foodCategory=foodCategory;var foodDelivery=function(e,t){return(0,_axios3.default)("opping71/restaurants/delivery_modes",{latitude:e,longitude:t,kw:""})};exports.foodDelivery=foodDelivery;var foodActivity=function(e,t){return(0,_axios3.default)("opping71/restaurants/activity_attributes",{latitude:e,longitude:t,kw:""})};exports.foodActivity=foodActivity;var shopDetails=function(e,t,r){return(0,_axios3.default)("opping/restaurant/"+e,{latitude:t,longitude:r+"&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics"})};exports.shopDetails=shopDetails;var foodMenu=function(e){return(0,_axios3.default)("opping72/menu",{restaurant_id:e})};exports.foodMenu=foodMenu;var getRatingList=function(e,t,r){var s=2<arguments.length&&void 0!==r?r:"";return(0,_axios3.default)("/ugc72/restaurants/"+e+"/ratings",{has_content:!0,offset:t,limit:10,tag_name:s})};exports.getRatingList=getRatingList;var ratingScores=function(e){return(0,_axios3.default)("/ugc72/restaurants/"+e+"/ratings/scores")};exports.ratingScores=ratingScores;var ratingTags=function(e){return(0,_axios3.default)("/ugc72/restaurants/"+e+"/ratings/tags")};exports.ratingTags=ratingTags;var mobileCode=function(e){return(0,_axios3.default)("74/mobile7erify_codend",{mobile:e,scene:"login",type:"sms"},"POST")};exports.mobileCode=mobileCode;var getcaptchas=function(){return(0,_axios3.default)("/v1/captchas",{},"POST")};exports.getcaptchas=getcaptchas;var checkExsis=function(e,t){var r;return(0,_axios3.default)("v1/users/exists",(_defineProperty(r={},t,e),_defineProperty(r,"type",t),r))};exports.checkExsis=checkExsis;var sendMobile=function(e,t,r,s){var o;return(0,_axios3.default)("71/mobile7erify_codend",(_defineProperty(o={action:"send",captcha_code:t},r,e),_defineProperty(o,"type","sms"),_defineProperty(o,"way",r),_defineProperty(o,"password",s),o),"POST")};exports.sendMobile=sendMobile;var checkout=function(e,t,r){return(0,_axios3.default)("71/cartseckout",{come_from:"web",geohash:e,entities:t,restaurant_id:r},"POST")};exports.checkout=checkout;var getRemark=function(e,t){return(0,_axios3.default)("71/carts/"+e+"/remarks",{sig:t})};exports.getRemark=getRemark;var getAddress=function(e,t){return(0,_axios3.default)("71/carts/"+e+"/addresses",{sig:t})};exports.getAddress=getAddress;var searchNearby=function(e){return(0,_axios3.default)("71/pois",{type:"nearby",keyword:e})};exports.searchNearby=searchNearby;var postAddAddress=function(e,t,r,s,o,a,i,n,d,u,c){return(0,_axios3.default)("71/users/"+e+"/addresses",{address:t,address_detail:r,geohash:s,name:o,phone:a,phone_bk:i,poi_type:n,sex:d,tag:u,tag_type:c},"POST")};exports.postAddAddress=postAddAddress;var placeOrders=function(e,t,r,s,o,a,i){return(0,_axios3.default)("71/users/"+e+"/carts/"+t+"/orders",{address_id:r,come_from:"mobile_web",deliver_time:"",description:s,entities:o,geohash:a,paymethod_id:1,sig:i},"POST")};exports.placeOrders=placeOrders;var rePostVerify=function(e,t,r){return(0,_axios3.default)("71/carts/"+e+"7erify_code",{sig:t,type:r},"POST")};exports.rePostVerify=rePostVerify;var validateOrders=function(e){var t=e.user_id,r=e.cart_id,s=e.address_id,o=e.description,a=e.entities,i=e.geohash,n=e.sig,d=e.validation_code,u=e.validation_token;return(0,_axios3.default)("71/users/"+t+"/carts/"+r+"/orders",{address_id:s,come_from:"mobile_web",deliver_time:"",description:o,entities:a,geohash:i,paymethod_id:1,sig:n,validation_code:d,validation_token:u},"POST")};exports.validateOrders=validateOrders;var payRequest=function(e,t){return(0,_axios3.default)("/payapi/payment/queryOrder",{merchantId:5,merchantOrderNo:e,source:"MOBILE_WAP",userId:t,version:"1.0.0"})};exports.payRequest=payRequest;var getService=function(){return(0,_axios3.default)("73/profile/explain")};exports.getService=getService;var vipCart=function(e,t,r){return(0,_axios3.default)("/member71/users/"+e+"/delivery_card/physical_card/bind",{number:t,password:r},"POST")};exports.vipCart=vipCart;var getHongbaoNum=function(e){return(0,_axios3.default)("/promotion72/users/"+e+"/hongbaos?limit=20&offset=0")};exports.getHongbaoNum=getHongbaoNum;var getExpired=function(e){return(0,_axios3.default)("/promotion72/users/"+e+"/expired_hongbaos?limit=20&offset=0")};exports.getExpired=getExpired;var exChangeHongbao=function(e,t,r){return(0,_axios3.default)("71/users/"+e+"/hongbao/exchange",{exchange_code:t,captcha_code:r},"POST")};exports.exChangeHongbao=exChangeHongbao;var getUser=function(){return(0,_axios3.default)("71/user",{user_id:(0,_mUtils.getStore)("user_id")})};exports.getUser=getUser;var sendLogin=function(e,t,r){return(0,_axios3.default)("71/login/app_mobile",{code:e,mobile:t,validate_token:r},"POST")},getOrderList=function(e,t){return(0,_axios3.default)("/bos72/users/"+e+"/orders",{limit:10,offset:t})};exports.getOrderList=getOrderList;var getOrderDetail=function(e,t){return(0,_axios3.default)("/bos71/users/"+e+"/orders/"+t+"/snapshot")};exports.getOrderDetail=getOrderDetail;var getAddressList=function(e){return(0,_axios3.default)("71/users/"+e+"/addresses")};exports.getAddressList=getAddressList;var getSearchAddress=function(e){return(0,_axios3.default)("v1/pois",{keyword:e,type:"nearby"})};exports.getSearchAddress=getSearchAddress;var deleteAddress=function(e,t){return(0,_axios3.default)("71/users/"+e+"/addresses/"+t,{},"DELETE")};exports.deleteAddress=deleteAddress;var accountLogin=function(e,t,r){return(0,_axios3.default)("72/login",{username:e,password:t,captcha_code:r},"POST")};exports.accountLogin=accountLogin;var signout=function(){return(0,_axios3.default)("72/signout")};exports.signout=signout;var changePassword=function(e,t,r,s,o){return(0,_axios3.default)("72angepassword",{username:e,oldpassWord:t,newpassword:r,confirmpassword:s,captcha_code:o},"POST")};exports.changePassword=changePassword;
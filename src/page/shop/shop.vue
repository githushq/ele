<template>
  <div>
    <section v-if="!showLoading" class="shop_container">
      <!-- 返回箭头 -->
      <nav class="goback">
        <svg
          width="4rem"
          height="100%"
          xmlnx="http://www.w3.org/2000/svg"
          version="1.1"
          @click="goback"
        >
          <polyline
            points="12,18,4,9,12,0"
            style="fill:none;stroke:rgb(255,255,255);stroke-width:3"
          />
        </svg>
      </nav>
      <header
        class="shop_detail_header"
        ref="shopheader"
        :style="{zIndex:shopActiveties?'14':'10'}"
      >
        <section class="description_header">
          <router-link to="/shop/shopdetail" class="description_top">
            <section class="description_left">
              <img :src="imgBaseUrl + shopDetailData.image_path" />
            </section>
            <section class="description_right">
              <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
              <p
                class="description_promotion ellipsis"
              >商家配送/{{shopDetailData.order_iead_time}}分钟送达/配送费{{shopDetailData.float_delivery_fee}}</p>
              <p class="description_promotion ellipisis">公告： {{promotionInfo}}</p>
            </section>
            <svg
              width="14"
              height="14"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              class="description_arrow"
            >
              <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none" />
            </svg>
          </router-link>
          <footer
            class="description_footer"
            v-if="shopDetailData.activities && shopDetailData.activities.length"
            @click="activitiesFun"
          >
            <p class="ellipsis">
              <span
                class="tip_icon"
                :style="{backgroundColor: `#${shopDetailData.activities[0].icon_color}`,borderColor: `#${shopDetailData.activities[0].icon_color}`}"
              >{{shopDetailData.activities[0].icon_name}}</span>
              <span>{{shopDetailData.activities[0].description}}(APP专享)</span>
            </p>
            <p>{{shopDetailData.activities.length}}个活动</p>
            <svg class="footer_arrow">
              <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none" />
            </svg>
          </footer>
        </section>
      </header>
      <!-- 活动详情 -->
      <transition name="fade">
        <section class="activities_details" v-if="shopActiveties">
          <svg
            width="1rem"
            height="1rem"
            xmlnx="http://www.w3.org/2000/svg"
            version="1.1"
            @click="activitiesFun"
          >
            <polyline
              points="12,18,4,9,12,0"
              style="fill:none;stroke:rgb(255,255,255);stroke-width:3"
            />
          </svg>
          <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
          <h3 class="activities_ratingstar"></h3>
          <section class="activities_list">
            <header class="activities_title_style">
              <span>优惠信息</span>
            </header>
            <ul>
              <li v-for="item in shopDetailData.activities" :key="item.id">
                <span
                  class="activities_icon"
                  :style="{backgroundColor: `#${item.icon_color}`,borderColor : `#${item.icon_name}`}"
                >{{item.icon_name}}</span>
                <span>{{item.description}}(APP专享)</span>
              </li>
            </ul>
          </section>
          <section class="activities_shopinfo">
            <header class="activities_title_style">
              <span>商家公告</span>
            </header>
            <p>{{promotionInfo}}</p>
          </section>
        </section>
      </transition>
      <!-- 商品 评价 -->
      <section class="change_show_type">
        <div>
          <span
            :class="{activity_show: changeShowType == 'food'}"
            @click="changeShowType = 'food'"
          >商品</span>
        </div>
        <div>
          <span
            :class="{activity_show: changeShowType == 'rating'}"
            @click="changeShowType = 'rating'"
          >评价</span>
        </div>
      </section>
      <!-- 商品内容 -->
      <!-- <section name="fade-choose"> -->
      <section v-show="changeShowType == 'food'" class="menu_container">
        <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
          <ul class="menu_left">
            <li
              v-for="(item,index) in menuList"
              :key="index"
              class="menu_left_li_a"
              :class="{activity_menu: index == menuIndex}"
              @click="chooseMenu(index)"
            >
              <img :src="getImgPath(item.icon_url)" v-if="item.icon_url" />
              <span>{{item.name}}</span>
              <span
                class="category_num"
                v-if="categoryNum[index] && item.type == 1"
              >{{categoryNum[index]}}</span>
            </li>
          </ul>
        </section>
        <section class="menu_right" id="menu_right" ref="menuFoodList">
          <ul>
            <li v-for="(item,index) in menuList" :key="index" class="menu_li">
              <header class="menu_detail_header">
                <section class="menu_detail_header_left">
                  <strong class="menu_item_title">{{item.name}}</strong>
                  <span class="menu_item_description">{{item.description}}</span>
                </section>
              </header>
              <section v-for="(foods,index1) in item.foods " :key="index1" class="menu_detail_list">
                <!-- :to="{path: 'shop/foodDetail', query:{image_path:foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}" tag="div" class="menu_detail_link"-->
                <div class="menu_detail_link">
                  <section class="menu_food_img">
                    <img :src="imgBaseUrl+foods.image_path" />
                  </section>
                  <section class="menu_food_description">
                    <h3 class="food_description_head">
                      <strong class="description_foodname ellipsis">{{foods.name}}</strong>
                      <ul v-if="foods.attributes.length" class="attributes_ul">
                        <li
                          v-for="(arrtibute,foodindex) in foods.arrtibutes"
                          :key="foodindex"
                          :style="{color: `#${arrtibute.icon_color}`,borderColor: `#${arrtibute.icon_color}`}"
                          :class="{arrtibute_new: attribute.icon_name == '新'}"
                        >
                          <p
                            :style="{color:arrtibute.icon_name == '新'?'#fff': `#${arrtibute.icon_color}`}"
                          >{{arrtibute.icon_name =='新'?'新品':arrtibut.icon_name}}</p>
                        </li>
                      </ul>
                    </h3>
                    <p class="food_description_content">{{foods.description}}</p>
                    <p class="food_description_sale_rating">
                      <span>月售{{foods.mounted_sales}}份</span>
                      <span>好评率{{foods.statisfy_rate}}%</span>
                    </p>
                  </section>
                </div>
                <footer class="menu_detail_footer">
                  <section class="food_price">
                    <span>￥</span>
                    <span>{{foods.specfoods[0].price}}</span>
                    <span v-if="foods.specifications.length">起</span>
                  </section>
                  <buy-cart :shopId="shopId" :foods="foods" @showMoveDot="showMoveDotFun"></buy-cart>
                </footer>
              </section>
            </li>
          </ul>
        </section>
      </section>
      <!-- 底部购物车栏 -->
      <section class="buy_cart_container">
        <section class="cart_icon_num" @click="toggleCartList">
          <div
            class="cart_icon_container"
            :class="{cart_icon_activity: totalPrice>0, move_in_cart: receiveInCart}"
            ref="cartContainer"
          >
            <span v-if="totalNum" class="cart_list_length">{{totalNum}}</span>
            <!-- <svg class="cart_icon" style="width: 1em; height: 1em;vertical-align: middle;fill: #fff;overflow: hidden;"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8285"><path  d="M346.112 806.912q19.456 0 36.864 7.168t30.208 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.208 20.48-36.864 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 37.888-7.168zM772.096 808.96q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zM944.128 227.328q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-13.312 37.888-22.016 62.976-23.552 68.096-18.944 53.248q-13.312 40.96-33.28 56.832t-49.664 15.872l-35.84 0-65.536 0-86.016 0-96.256 0-253.952 0 14.336 92.16 517.12 0q49.152 0 49.152 41.984 0 20.48-9.728 35.328t-38.4 14.848l-49.152 0-94.208 0-118.784 0-119.808 0-99.328 0-55.296 0q-20.48 0-34.304-9.216t-23.04-24.064-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696t-11.264-58.88-14.848-78.848-16.384-87.552q-19.456-103.424-44.032-230.4l-76.8 0q-15.36 0-25.6-7.68t-16.896-18.432-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792t37.376-13.312l21.504 0 21.504 0 25.6 0 34.816 0q20.48 0 32.768 6.144t19.456 15.36 10.24 19.456 5.12 17.408q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912l700.416 0zM867.328 194.56l-374.784 0 135.168-135.168q23.552-23.552 51.712-24.064t51.712 23.04z" p-id="8286"></path><svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8274"><path d="M346.112 806.912q19.456 0 36.864 7.168t30.208 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.208 20.48-36.864 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 37.888-7.168zM772.096 808.96q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zM944.128 227.328q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-13.312 37.888-22.016 62.976-23.552 68.096-18.944 53.248q-13.312 40.96-33.28 56.832t-49.664 15.872l-35.84 0-65.536 0-86.016 0-96.256 0-253.952 0 14.336 92.16 517.12 0q49.152 0 49.152 41.984 0 20.48-9.728 35.328t-38.4 14.848l-49.152 0-94.208 0-118.784 0-119.808 0-99.328 0-55.296 0q-20.48 0-34.304-9.216t-23.04-24.064-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696t-11.264-58.88-14.848-78.848-16.384-87.552q-19.456-103.424-44.032-230.4l-76.8 0q-15.36 0-25.6-7.68t-16.896-18.432-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792t37.376-13.312l21.504 0 21.504 0 25.6 0 34.816 0q20.48 0 32.768 6.144t19.456 15.36 10.24 19.456 5.12 17.408q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912l700.416 0zM867.328 194.56l-374.784 0 135.168-135.168q23.552-23.552 51.712-24.064t51.712 23.04z" p-id="8275"></path></svg></svg> -->
            <svg
              class="cart_icon"
              style="width: 1em; height: 1em;vertical-align: middle;fill: #fff;overflow: hidden;"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8361"
            >
              <path
                d="M789.488 724.2H359.632c-94.584 0-117.384-60.072-134.056-126.992L100.408 66.76H61.96a33.376 33.376 0 0 1 0-66.76h64.864a33.384 33.384 0 0 1 32.488 25.72l131.136 555.744c17.456 70.056 31.208 75.984 69.184 75.984h429.848c12.752 0 51.48 0 69.168-75.88l63.304-252.2c10.008-39.864 8.672-70.768-3.784-87.048-9.424-12.304-27.312-18.792-53.224-19.248H344.64a33.368 33.368 0 0 1-33.376-33.384 33.36 33.36 0 0 1 33.376-33.376h520.936c47.88 0.864 83.216 16.152 105.608 45.44 25.824 33.736 31.04 82.144 15.52 143.88l-63.176 251.616c-25.688 110.4-95.024 126.952-134.04 126.952zM295.448 1024c-68.864 0-124.88-56.032-124.88-124.88 0-68.84 56.016-124.872 124.88-124.872 68.84 0 124.88 56.032 124.88 124.872 0 68.848-56.032 124.88-124.88 124.88z m0-183c-32.04 0-58.12 26.08-58.12 58.12 0 32.048 26.08 58.128 58.12 58.128s58.12-26.08 58.12-58.128c0-32.04-26.072-58.12-58.12-58.12zM827.104 1024c-68.84 0-124.872-56.032-124.872-124.88 0-68.84 56.032-124.872 124.872-124.872 68.848 0 124.88 56.032 124.88 124.872 0 68.848-56.032 124.88-124.88 124.88z m0-183c-32.04 0-58.12 26.08-58.12 58.12 0 32.048 26.08 58.128 58.12 58.128 32.048 0 58.128-26.08 58.128-58.128-0.008-32.04-26.08-58.12-58.128-58.12z"
                fill="#888888"
                p-id="8362"
              />
            </svg>
          </div>
          <div class="cart_num">
            <div>￥{{totalPrice}}</div>
            <div>配送费{{deliveryFee}}</div>
          </div>
        </section>
        <section class="gotopay" :class="{gotopay_acitvity: minimunOrderAmount<=0}">
          <span class="gotopay_button_style" v-if="minimunOrderAmount>0">还差￥{{minimunOrderAmount}}起送</span>
          <router-link
            v-else
            :to="{path: '/confirmOrder',query:{geohash,shopId}}"
            class="gotopay_button_style"
          >去结算</router-link>
        </section>
      </section>
      <transition name="toggle-cart">
        <section class="cart_food_list" v-show="showCartList && cartFoodList.length">
          <header>
            <h4>购物车</h4>
            <div @click="clearCart">
              <span class="clear_cart">清空</span>
            </div>
          </header>
          <section class="cart_food_details" id="cartFood">
            <ul>
              <li v-for="(item,index) in cartFoodList" :key="index" class="cart_food_li">
                <div class="cart_list_num">
                  <p class="ellipsis">{{item.name}}</p>
                  <p class="ellipsis">{{item.specs}}</p>
                </div>
                <div class="cart_list_price">
                  <span>￥</span>
                  <span>{{item.price}}</span>
                </div>
                <section class="cart_list_control">
                  <span
                    @click="removeOutCart(item.category_id,item.item_id,item.food_id,item.name,item.price,item.packing_fee,item.sku_id,item.stock,item.num)"
                  >
                    <svg
                      class="add_icon"
                      style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2368"
                    >
                      <path
                        fill="#3BA9F6"
                        d="M668.734694 532.897959H355.265306c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.897959h313.469388c11.493878 0 20.897959 9.404082 20.897959 20.897959s-9.404082 20.897959-20.897959 20.897959zM512 929.959184c-230.4 0-417.959184-187.559184-417.959184-417.959184s187.559184-417.959184 417.959184-417.959184 417.959184 187.559184 417.959184 417.959184-187.559184 417.959184-417.959184 417.959184z m0-794.122449c-207.412245 0-376.163265 168.75102-376.163265 376.163265s168.75102 376.163265 376.163265 376.163265 376.163265-168.75102 376.163265-376.163265-168.75102-376.163265-376.163265-376.163265z"
                        p-id="2369"
                      />
                    </svg>
                  </span>
                  <span class="cart_num">{{item.num}}</span>
                  <span class="cart_add">
                    <span>
                      <svg
                        class="add_icon"
                        @click="addToCart(item.category_id,item.item_id,item.food_id,item.name,item.price,item.specs,item.packing_fee,item.sku_id,item.stokck,$event)"
                        style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="5314"
                      >
                        <path
                          d="M512 70.283C267.486 70.283 69.268 268.046 69.268 512S267.486 953.717 512 953.717 954.732 755.954 954.732 512 756.514 70.283 512 70.283m223.045 488.321H558.603v176.442c0 25.738-20.866 46.604-46.604 46.604s-46.604-20.866-46.604-46.604V558.604H288.953c-25.738 0-46.604-20.866-46.604-46.604s20.866-46.604 46.604-46.604h176.442V288.954c0-25.738 20.866-46.604 46.604-46.604s46.604 20.866 46.604 46.604v176.442h176.442c25.738 0 46.604 20.866 46.604 46.604s-20.866 46.604-46.604 46.604z"
                          fill="#3BA9F6"
                          p-id="5315"
                        />
                      </svg>
                    </span>
                  </span>
                </section>
              </li>
            </ul>
          </section>
        </section>
      </transition>
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          class="screen_cover"
          v-show="showCartList && cartFoodList.length"
          @click="toggleCartList"
        ></div>
      </transition>
      <!-- 添加到购物车的动画 -->
      <transition
        appear
        v-for="(item,index) in showMoveDot"
        v-on:after-appear="afterEnter"
        v-on:before-appear="beforeEnter"
        :key="index"
      >
        <span class="move_dot" v-if="item">
          <svg
            class="move_liner"
            style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5314"
          >
            <path
              d="M512 70.283C267.486 70.283 69.268 268.046 69.268 512S267.486 953.717 512 953.717 954.732 755.954 954.732 512 756.514 70.283 512 70.283m223.045 488.321H558.603v176.442c0 25.738-20.866 46.604-46.604 46.604s-46.604-20.866-46.604-46.604V558.604H288.953c-25.738 0-46.604-20.866-46.604-46.604s20.866-46.604 46.604-46.604h176.442V288.954c0-25.738 20.866-46.604 46.604-46.604s46.604 20.866 46.604 46.604v176.442h176.442c25.738 0 46.604 20.866 46.604 46.604s-20.866 46.604-46.604 46.604z"
              fill="#3BA9F6"
              p-id="5315"
            />
          </svg>
        </span>
      </transition>
      <!-- </section> -->
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import {
  msiteAddress,
  shopDetails,
  foodMenu,
  getRatingList,
  ratingScores,
  ratingTags
} from "../../service/getData";
import { getImgPath } from "../../components/common/mixin";
import buyCart from "../../components/common/buyCart";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      geohash: "", // geohash 位置信息
      shopId: "", // 商店id
      showLoading: false, // 显示加载动画
      shopActiveties: false, // 是否显示活动详情
      shopDetailData: {}, // 商铺详情
      imgBaseUrl: "http://cangdu.org:8001/img/",
      changeShowType: "food", // 切换商品或评价
      menuList: [], // 食品列表
      menuIndex: 0, // 已选菜单索引，默认值为0
      menuIndexChange: true, //解决选中index时scroll监听事件重复的判断设置的bug
      categoryNum: [], // 商品加入购物车的数据
      shopListTop: [],
      foodScroll: null, // 食品列表滚动
      showMoveDot: [], // 控制下落的小圆点显示隐藏
      elLeft: null,
      elBottom: null,
      totalPrice: 0, // 总价格
      receiveInCart: false, // 购物车组件下落的圆点是否到达目标位置
      windowHeight: null, // 屏幕的高度
      totalNum: null,
      cartFoodList: [], // 购物车商品列表
      showCartList: false // 显示购物车列表
    };
  },
  computed: {
    ...mapState(["latitude", "longitude", "cartList"]),
    promotionInfo: function() {
      return (
        this.shopDetailData.promotionInfo ||
        "欢饮光临，用餐高峰期请提前下单，谢谢"
      );
    },
    // 配送费
    deliveryFee: function() {
      if (this.shopDetailData) {
        return this.shopDetailData.float_delivery_fee;
      } else {
        null;
      }
    },
    // 还差多少远起送，为负数时显示去结算按钮
    minimunOrderAmount: function() {
      if (this.shopDetailData) {
        return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
      } else {
        return null;
      }
    },
    // 购物车中总共商品的数量
    // totalNum: function(){
    //   return  0;
    // },
    // 当前商店购物信息
    shopCart: function() {
      return { ...this.cartList[this.shopId] };
    }
  },
  watch: {
    shopCart: function() {
      this.initCategoryNum();
    },
    cartFoodList: function(value){
      if(!value.lenght){
        this.showCartList = false;
      }
    }
  },
  methods: {
    ...mapMutations([
      "RECORD_ADDRESS",
      "ADD_CART",
      "REDUCE_CART",
      "INIT_BUYCART",
      "CLEAR_CART",
      "RECORD_SHOPDETAIL"
    ]),
    // 初始化商店所有信息
    async initData() {
      if (!this.latitude) {
        let res = await msiteAddress(this.geohash);
        this.RECORD_ADDRESS(res.data);
      }
      // 获取店铺信息
      let shopRes = await shopDetails(
        this.shopId,
        this.latitude,
        this.longitude
      );
      this.shopDetailData = shopRes.data;
      //  获取食品列表
      let foodMenuRes = await foodMenu(this.shopId);
      this.menuList = foodMenuRes.data;
      this.$nextTick(() => {
        this.getFoodListHeight();
        this.initCategoryNum();
      });
    },
    // 初始化和shopCart变化时，重新获取购物车改变过的数据，赋值categoryNum,totalPrice,cartFoodList
    initCategoryNum() {
      // let newArr = []
      // alert(111)
      this.totalNum = 0;
      this.totalPrice = 0;
      this.cartFoodList = [];
      this.menuList.forEach((item, index) => {
        // 购物车数据列表不能为空，且购物车存在商品分类的id
        // alert(2222)
        if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
          // 取出购物车中存在的商品分类的id，然后遍历,
          Object.keys(this.shopCart[item.foods[0].category_id]).forEach(
            itemId => {
              //取出购物车中的存在的商品分类的id下的itemId,然后遍历
              Object.keys(
                this.shopCart[item.foods[0].category_id][itemId]
              ).forEach(foodId => {
                let foodItem = this.shopCart[item.foods[0].category_id][itemId][
                  foodId
                ];
                this.totalNum += foodItem.num;
                if (foodItem.num > 0) {
                  console.log(this.totalNum);
                  foodItem.category_id = item.foods[0].category_id;
                  foodItem.item_id = itemId;
                  foodItem.food_id = foodId;
                  this.cartFoodList.push(foodItem);
                  this.totalPrice += foodItem.num * foodItem.price;
                }
                // totalPric
              });
            }
          );
        }
      });
    },
    // 获取食品列表的高度，存入shopListTop中
    getFoodListHeight() {
      const listContainer = this.$refs.menuFoodList;
      if (listContainer) {
        const listArr = Array.from(listContainer.children[0].children);
        listArr.forEach((item, index) => {
          this.shopListTop[index] = item.offsetTop;
        });
      }
      this.listenScroll(listContainer);
    },

    // 当滑动食品列表的时候，监听其scrollTop值来设置对应的食品列表的样式
    listenScroll(element) {
      this.foodScroll = new BScroll("#menu_right", {
        probeType: 3,
        deceleration: 0.0001,
        bounce: false,
        swipeTime: 2000,
        click: true
      });
      const wraperMenu = new BScroll("#wrapper_menu", {
        click: true,
        probeType: 3
      });
      const wrapperMenuHeight = this.$refs.wrapperMenu.clientHeight;
      this.foodScroll.on("scroll", pos => {
        this.shopListTop.forEach((item, index) => {
          if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
            this.menuIndex = index;
          }
        });
      });
    },
    // 初始化和shopcart变化时
    chooseMenu(index) {
      this.menuIndex = index;
      this.menuIndexChange = false;
      this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
      this.foodScroll.on("scrollEnd", () => {
        this.menuIndexChange = true;
      });
    },
    // 控制活动详情
    activitiesFun() {
      this.shopActiveties = !this.shopActiveties;
    },
    // 切换购物车列表的显示与隐藏
    toggleCartList() {
    this.showCartList = !this.showCartList
    },

    // 显示下落的圆球
    showMoveDotFun(showMoveDot, elLeft, elBottom) {
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
      console.log(this.showMoveDot);

      this.elLeft = elLeft;
      this.elBottom = elBottom;
    },
    beforeEnter(el) {
      el.style.transform = `translate3d(0,${37 +
        this.elBottom -
        this.windowHeight}px,0)`;
      el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
      // el.children[0].style.transform = `translate3d(${400 - 30}px,0,0)`;
      el.children[0].style.opacity = 0;
    },
    afterEnter(el) {
      el.style.transform = `translate3d(0,0,0)`;
      el.children[0].style.transform = `translate3d(0,0,0)`;
      el.style.transition =
        "transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)";
      el.children[0].style.transition = "transform .55s linear";
      // this.showMoveDot = this.showMoveDot.map(item => false);
      el.children[0].style.opacity = 1;
      el.children[0].addEventListener("transitionend", () => {
        this.listenInCart();
      });
      el.children[0].addEventListener("webkitAnimationEnd", () => {
        this.listenInCart();
      });
    },
    // 监听原点是否进入购物车
    listenInCart() {
      if (!this.receiveInCart) {
        this.receiveInCart = true;
        this.$refs.cartContainer.addEventListener("animationend", () => {
          this.receiveInCart = false;
        });
      }
      this.$refs.cartContainer.addEventListener("animationend", () => {
        this.receiveInCart = false;
      });
    },
    // 向购物车添加数据
    addToCart(
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stokck,
      event
    ) {
      this.ADD_CART({
        shopid: this.shopId,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stokck
      });
    },
    // 删除购物车一条数据
    removeOutCart(
      category_id,
      item_id,
      food_id,
      name,
      price,
      packing_fee,
      sku_id,
      stokck,
      num
    ) {
      if (num > 0) {
        this.REDUCE_CART({
          shopid: this.shopId,
          category_id,
          item_id,
          food_id,
          name,
          price,
          packing_fee,
          sku_id,
          stokck
        });
      }
    },
    clearCart() {
      this.toggleCartList();
      this.CLEAR_CART(this.shopId);
    },
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    // 进入shop页面时从本地加载数据
    this.INIT_BUYCART();
  },
  components: {
    buyCart
  },
  mounted() {
    // console.log(this.lotitude, this.logitude);
    this.initData();

    this.windowHeight = window.innerHeight;
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.shop_back_svg_container {
  position: fixed;
  .wh(100%, 100%);
  img {
    .wh(100%, 100%);
  }
}
.shop_container {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  left: 0;
  height: 100%;
}
.goback {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  z-index: 11;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
}
.shop_detail_header {
  // overflow: hidden;
  position: relative;
  // height: 3.5rem;
  .header_cover_img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    filter: blur(10px);
  }
  .description_header {
    position: relative;
    z-index: 10;
    background-color: rgba(119, 103, 137, 0.43);
    padding: 0.4rem 0 0.4rem 0.4rem;
    width: 100%;
    overflow: hidden;
    .description_top {
      display: flex;
      .description_left {
        margin-right: 0.3rem;
        img {
          .wh(2.9rem, 2.9rem);
          display: block;
          border-radius: 0.15rem;
        }
      }
      .description_right {
        flex: 1;
        .description_title {
          .sc(0.8rem, #fff);
          font-weight: bold;
          width: 100%;
          margin-bottom: 0.3rem;
        }
        .description_text {
          .sc(0.5rem, #fff);
          margin-bottom: 0.3rem;
        }
        .description_promotion {
          .sc(0.5rem, #fff);
          width: 11.5rem;
        }
      }
      .description_arrow {
        .ct;
        right: 0.3rem;
        z-index: 11;
      }
    }
    .description_footer {
      .fj;
      margin-top: 0.5rem;
      padding-right: 1rem;
      p {
        .sc(0.5rem, #fff);
        span {
          color: #fff;
        }
        .tip_icon {
          padding: 0 0.04rem;
          border: 0.025rem solid #fff;
          border-radius: 0.1rem;
          font-size: 0.4rem;
          display: inline-block;
        }
      }
      .ellipsis {
        width: 84%;
      }
      .footer_arrow {
        .wh(0.45rem, 0.45rem);
        position: absolute;
        right: 0.3rem;
      }
    }
  }
}
.activities_details {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #262626;
  z-index: 200;
  padding: 1.25rem;
  .activities_shoptitle {
    text-align: center;
    .sc(0.8rem, #fff);
  }
  .activities_ratingstar {
    display: flex;
    justify-content: center;
    transform: scale(2.2);
    margin-top: 0.7rem;
  }
  .activities_list {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    .sc(0.5rem, #fff);
    li {
      margin-bottom: 0.2rem;
      .activities_icon {
        padding: 0 0.02rem;
        display: inline-block;
        border: 0.025rem solid #fff;
        border-radius: 0.1rem;
      }
      span {
        color: #fff;
        line-height: 0.6rem;
      }
    }
  }
  .activities_shopinfo {
    p {
      line-height: 0.7rem;
      .sc(0.5rem, #fff);
    }
  }
  .activities_title_style {
    text-align: center;
    margin-bottom: 1rem;
    span {
      .sc(0.5rem, #fff);
      border: 0.025rem solid #555;
      padding: 0.2rem 0.4rem;
      border-radius: 0.5rem;
    }
  }
  .close_activities {
    position: absolute;
    bottom: 1rem;
    .cl;
  }
}

.food_container {
  display: flex;
  flex: 1;
  padding-bottom: 2rem;
}
.menu_container {
  display: flex;
  flex: 1;
  // height: calc(100% - 2rem - 3rem - 2.1rem);
  position: relative;
  .menu_left {
    position: fixed;
    width: 3.8rem;
    height: calc(100% - 5rem - 3rem - 2.1rem);
    overflow-y: auto;
    .menu_left_li_a {
      padding: 0.7rem 0.3rem;
      border-bottom: 0.025rem solid #ededed;
      box-sizing: border-box;
      border-left: 0.15rem solid #f8f8f8;
      position: relative;
      display: block;
      img {
        .wh(0.5rem, 0.6rem);
      }
      span {
        .sc(0.6rem, #666);
      }
      .category_num {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        background-color: #ff461d;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 50%;
        border: 0.025rem solid #ff461d;
        min-width: 0.6rem;
        height: 0.6rem;
        .sc(0.5rem, #fff);
        // font-family: Helvetica Neue,Tahoma,Arial;
      }
    }
    .activity_menu {
      border-left: 0.15rem solid #3190e8;
      background-color: #fff;
      span:nth-of-type(1) {
        font-weight: bold;
      }
    }
  }
  .menu_right {
    // flex: 4;
    position: fixed;
    overflow-y: auto;
    left: 25%;
    height: calc(100% - 5rem - 3rem - 2.1rem);
    .menu_detail_header {
      width: 100%;
      padding: 0.4rem;
      position: relative;
      .fj;
      align-items: center;
      .menu_detail_header_left {
        width: 11rem;
        white-space: nowrap;
        overflow: hidden;
        .menu_item_title {
          .sc(0.7rem, #666);
          font-weight: bold;
        }
        .menu_item_description {
          .sc(0.5rem, #999);
          width: 30%;
          overflow: hidden;
        }
      }
      .menu_detail_header_right {
        .wh(0.5rem, 1rem);
        display: block;
        .bis("../image/icon_point.jpg");
        background-size: 100% 0.4rem;
        background-position: left center;
      }
      .description_tip {
        background-color: #39373a;
        opacity: 0.95;
        .sc(0.5rem, #fff);
        position: absolute;
        top: 1.5rem;
        z-index: 14;
        width: 8rem;
        right: 0.2rem;
        padding: 0.5rem 0.4rem;
        border: 1px;
        border-radius: 0.2rem;
        span {
          color: #fff;
          line-height: 0.6rem;
          font-size: 0.55rem;
        }
      }
      .description_tip::after {
        content: "";
        position: absolute;
        .wh(0.4rem, 0.4rem);
        background-color: #39373a;
        top: -0.5rem;
        right: 0.7rem;
        transform: rotate(-45deg) translateY(0.41rem);
      }
    }
    .menu_detail_list {
      background-color: #fff;
      padding: 0.6rem 0.4rem;
      border-bottom: 1px solid #f8f8f8;
      position: relative;
      overflow: hidden;
      .menu_detail_link {
        display: flex;
        .menu_food_img {
          margin-right: 0.4rem;
          img {
            .wh(2rem, 2rem);
            display: block;
          }
        }
        .menu_food_description {
          width: 100%;
          .food_description_head {
            .fj;

            margin-bottom: 0.2rem;
            .description_foodname {
              width: 6rem;
              .sc(0.7rem, #333);
            }
            .attributes_ul {
              display: flex;
              li {
                font-size: 0.3rem;
                height: 0.6rem;
                line-height: 0.35rem;
                padding: 0.1rem;
                border: 1px solid #666;
                border-radius: 0.3rem;
                margin-right: 0.1rem;
                transform: scale(0.8);
                p {
                  white-space: nowrap;
                }
              }
              .attribute_new {
                position: absolute;
                top: 0;
                left: 0;
                background-color: #4cd964;
                .wh(2rem, 2rem);
                display: flex;
                align-items: flex-end;
                transform: rotate(-45deg) translate(-0.1rem, -1.5rem);
                border: none;
                border-radius: 0;
                p {
                  .sc(0.4rem, #fff);
                  text-align: center;
                  flex: 1;
                  transform: scale(0.8) translate(0.1rem, -0.1rem);
                }
              }
            }
          }
          .food_description_content {
            .sc(0.5rem, #999);
            line-height: 0.6rem;
          }
          .food_description_sale_rating {
            line-height: 0.8rem;
            span {
              .sc(0.5rem, #333);
            }
          }
          .food_activity {
            line-height: 0.4rem;
            span {
              font-size: 0.3rem;
              border: 1px solid currentColor;
              border-radius: 0.3rem;
              padding: 0.08rem;
              display: inline-block;
              transform: scale(0.8);
              margin-left: -0.35rem;
            }
          }
        }
      }
      .menu_detail_footer {
        margin-left: 2.4rem;
        font-size: 0;
        margin-top: 0.3rem;
        .fj;
        .food_price {
          span:nth-of-type(1) {
            .sc(0.5rem, #f60);
            margin-right: 0.05rem;
          }
          span:nth-of-type(2) {
            .sc(0.9rem, #f60);
            font-weight: bold;
            margin-right: 0.3rem;
          }
          span:nth-of-type(3) {
            .sc(0.5rem, #666);
          }
          span {
            font-family: "Helvetica Neue", Tahoma, Arial;
          }
        }
      }
    }
  }
}
.buy_cart_container {
  position: absolute;
  background-color: #3d3d3f;
  bottom: 0;
  left: 0;
  z-index: 13;
  display: flex;
  .wh(100%, 2rem);
  .cart_icon_num {
    flex: 1;
    .cart_icon_container {
      display: flex;
      background-color: #3d3d3f;
      position: absolute;
      padding: 0.4rem;
      border: 0.18rem solid #444;
      border-radius: 50%;
      left: 0.5rem;
      top: -0.7rem;
      .cart_icon {
        .wh(1.2rem, 1.2rem);
        // background-color: #fff;
      }
      .cart_list_length {
        position: absolute;
        top: -0.25rem;
        right: -0.25rem;
        background-color: #ff461d;
        line-height: 0.7rem;
        text-align: center;
        border-radius: 50%;
        border: 0.025rem solid #ff461d;
        min-width: 0.7rem;
        height: 0.7rem;
        .sc(0.5rem, #fff);
        font-family: Helvetica Neue, Tahoma, Arial;
      }
    }
    .move_in_cart {
      animation: mymove 0.5s ease-in-out;
    }
    .cart_icon_activity {
      background-color: #3190e8;
    }
    .cart_num {
      .ct;
      left: 3.5rem;

      div {
        color: #fff;
      }
      div:nth-of-type(1) {
        font-size: 0.8rem;
        font-weight: bold;
        margin-bottom: 0.1rem;
      }
      div:nth-of-type(2) {
        font-size: 0.4rem;
      }
    }
  }
  .gotopay {
    position: absolute;
    right: 0;
    background-color: #535356;
    .wh(5rem, 100%);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .gotopay_button_style {
      .sc(0.7rem, #fff);
      font-weight: bold;
    }
  }
  .gotopay_acitvity {
    background-color: #4cd964;
  }
}
.cart_food_list {
  position: fixed;
  width: 100%;
  padding-bottom: 2rem;
  z-index: 12;
  bottom: 0;
  left: 0;
  background-color: #fff;
  header {
    .fj;
    align-items: center;
    padding: 0.3rem 0.6rem;
    background-color: #eceff1;
    svg {
      .wh(0.6rem, 0.6rem);
      vertical-align: middle;
    }
    h4 {
      .sc(0.7rem, #666);
    }
    .clear_cart {
      .sc(0.6rem, #666);
    }
  }
  .cart_food_details {
    background-color: #fff;
    max-height: 20rem;
    overflow-y: auto;
    .cart_food_li {
      .fj;
      padding: 0.6rem 0.5rem;
      .cart_list_num {
        width: 55%;
        p:nth-of-type(1) {
          .sc(0.7rem, #666);
          font-weight: bold;
        }
        p:nth-of-type(2) {
          .sc(0.4rem, #666);
        }
      }
      .cart_list_price {
        font-size: 0;
        span:nth-of-type(1) {
          .sc(0.6rem, #f60);
          font-family: Helvetica Neue, Tahoma;
        }
        span:nth-of-type(2) {
          .sc(0.7rem, #f60);
          font-family: Helvetica Neue, Tahoma;
          font-weight: bold;
        }
      }
      .cart_list_control {
        display: flex;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        svg {
          .wh(0.9rem, 0.9rem);
          fill: #3190e8;
        }
        .specs_reduce_icon {
          fill: #999;
        }
        .cart_num {
          .sc(0.65rem, #666);
          min-width: 1rem;
          text-align: center;
          font-family: Helvetica Neue, Tahoma;
        }
      }
    }
  }
}
.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 11;
}
.change_show_type {
  display: flex;
  background-color: #fff;
  // padding: .3rem 0 .6rem;
  line-height: 2.1rem;
  border-bottom: 1px solid #ebebeb;
  div {
    flex: 1;
    text-align: center;
    span {
      .sc(0.65rem, #666);
      padding: 0.2rem 0.1rem;
      border-bottom: 0.12rem solid #fff;
    }
    .activity_show {
      color: #3190e8;
      border-color: #3190e8;
    }
  }
}
.rating_container {
  flex: 1;
  overflow-y: hidden;
  flex-direction: column;
  p,
  span,
  li,
  time {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
  .rating_header {
    display: flex;
    background-color: #fff;
    padding: 0.8rem 0.5rem;
    margin-bottom: 0.5rem;
    .rating_header_left {
      flex: 3;
      text-align: center;
      p:nth-of-type(1) {
        .sc(1.2rem, #f60);
      }
      p:nth-of-type(2) {
        .sc(0.65rem, #666);
        margin-bottom: 0.1rem;
      }
      p:nth-of-type(3) {
        .sc(0.4rem, #999);
      }
    }
    .rating_header_right {
      flex: 4;
      p {
        font-size: 0.65rem;
        line-height: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        span:nth-of-type(1) {
          color: #666;
          margin-right: 0.5rem;
        }
        .rating_num {
          width: 3rem;
          .sc(0.55rem, #f60);
        }
        .delivery_time {
          .sc(0.4rem, #999);
        }
      }
    }
  }
  .tag_list_ul {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 0.5rem;
    li {
      .sc(0.6rem, #6d7885);
      padding: 0.3rem 0.3rem;
      background-color: #ebf5ff;
      border-radius: 0.2rem;
      border: 1px;
      margin: 0 0.4rem 0.2rem 0;
    }
    .unsatisfied {
      background-color: #f5f5f5;
      color: #aaa;
    }
    .tagActivity {
      background-color: #3190e8;
      color: #fff;
    }
  }
  .rating_list_ul {
    background-color: #fff;
    padding: 0 0.5rem;
    .rating_list_li {
      border-top: 1px solid #f1f1f1;
      display: flex;
      padding: 0.6rem 0;
      .user_avatar {
        .wh(1.5rem, 1.5rem);
        border: 0.025rem;
        border-radius: 50%;
        margin-right: 0.8rem;
      }
      .rating_list_details {
        flex: 1;
        header {
          display: flex;
          flex: 1;
          justify-content: space-between;
          margin-bottom: 0.3rem;
          .username_star {
            .sc(0.55rem, #666);
            .username {
              color: #666;
              margin-bottom: 0.2rem;
            }
            .star_desc {
              display: flex;
              align-items: center;
              .time_spent_desc {
                .sc(0.55rem, #666);
                margin-left: 0.15rem;
              }
            }
          }
          .rated_at {
            .sc(0.4rem, #999);
          }
        }
        .food_img_ul {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 0.4rem;
          li {
            img {
              .wh(3rem, 3rem);
              margin-right: 0.4rem;
              display: block;
            }
          }
        }
        .food_name_ul {
          display: flex;
          flex-wrap: wrap;
          li {
            .sc(0.55rem, #999);
            width: 2.2rem;
            padding: 0.2rem;
            border: 0.025rem solid #ebebeb;
            border-radius: 0.15rem;
            margin-right: 0.3rem;
            margin-bottom: 4px;
          }
        }
      }
    }
  }
}
.specs_cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 17;
}
.specs_list {
  position: fixed;
  top: 35%;
  left: 15%;
  width: 70%;
  background-color: #fff;
  z-index: 18;
  border: 1px;
  border-radius: 0.2rem;
  .specs_list_header {
    h4 {
      .sc(0.7rem, #222);
      font-weight: normal;
      text-align: center;
      padding: 0.5rem;
    }
    .specs_cancel {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
    }
  }
  .specs_details {
    padding: 0.5rem;
    .specs_details_title {
      .sc(0.6rem, #666);
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0.4rem 0;
      li {
        font-size: 0.6rem;
        padding: 0.3rem 0.5rem;
        border: 0.025rem solid #ddd;
        border-radius: 0.2rem;
        margin-right: 0.5rem;
        margin-bottom: 0.2rem;
      }
      .specs_activity {
        border-color: #3199e8;
        color: #3199e8;
      }
    }
  }
  .specs_footer {
    .fj;
    align-items: center;
    background-color: #f9f9f9;
    padding: 0.5rem;
    border: 1px;
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    .specs_price {
      span {
        color: #ff6000;
      }
      span:nth-of-type(1) {
        font-size: 0.5rem;
      }
      span:nth-of-type(2) {
        font-size: 0.8rem;
        font-weight: bold;
        font-family: Helvetica Neue, Tahoma;
      }
    }
    .specs_addto_cart {
      .wh(4rem, 1.3rem);
      background-color: #3199e8;
      border: 1px;
      border-radius: 0.15rem;
      .sc(0.6rem, #fff);
      text-align: center;
      line-height: 1.3rem;
    }
  }
}
.show_delete_tip {
  position: fixed;
  top: 50%;
  left: 15%;
  width: 70%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 18;
  .sc(0.65rem, #fff);
  text-align: center;
  padding: 0.5rem 0;
  border: 1px;
  border-radius: 0.25rem;
}
.move_dot {
  position: fixed;
  bottom: 30px;
  left: 30px;

  svg {
    .wh(0.9rem, 0.9rem);
    fill: #3190e8;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-choose-enter-active,
.fade-choose-leave-active {
  transition: opacity 0.5s;
}
.fade-choose-leave,
.fade-choose-leave-active {
  display: none;
}
.fade-choose-enter,
.fade-choose-leave-active {
  opacity: 0;
}
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
.toggle-cart-enter-active,
.toggle-cart-leave-active {
  transition: all 0.3s ease-out;
}
.toggle-cart-enter,
.toggle-cart-leave-active {
  transform: translateY(100%);
}
</style>

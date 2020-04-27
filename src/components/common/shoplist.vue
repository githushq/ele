<template>
  <div class="shoplist_container">
    
    <!-- 店铺列表 -->
    <ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">
      <router-link
        :to="{path:'/shop',query:{'geohash':geohash,'id':item.id}}"
        v-for="(item,index) in shopListArr"
        :key=" index"
        class="shop_li"
      >
        <section>
          <img :src="imgBaseUrl+item.image_path" class="shop_img" />
        </section>
        <hgroup class="shop_right">
            <header class="shop_detail_header">
                <h4 :class="item.in_pareium?'preminu':''" class="shop_title ellipsis">
                    {{item.name}}
                </h4>
                <ul class="shop_detail_ul">
                    <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
                </ul>
            </header>
            <h5 class="rating_order_num">
                <section class="rating_order_num_left">
                    <section class="rating_section">
                        <span class="rating_num">{{item.rating}}</span>
                    </section>
                    <section class="order_section">
                        月售{{item.recent_order_num}}单
                    </section>
                </section>
                <section class="rating_order_num_right">
                    <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                    <span class="delivery_style delivery_right" v-if="true">准时达</span>
                </section>
            </h5>
            <h5 class="fee_distance">
                <p class="fee">
                   ￥{{item.float_minimum_order_amount}}起送
                   <span>/</span>
                   {{item.piecewise_agent_fee.tips}}
                </p>
                <p class="distance_time">
                    <span v-if="Number(item.distance)">{{item.distance>1000?(item.disance/1000).toFixed(2) + 'km':item.distance + 'm'}}
                        <span class="segmentation">/</span>
                    </span>
                    <span v-else>{{item.distance}}</span>
                    <span class="sementation">/</span>
                    <span class="order_time">{{item.order_lead_time}}</span>
                </p>
            </h5>
        </hgroup>
      </router-link>
    </ul>
    
    <!-- 选择的地区没有店铺列表显示的内容 -->
    <!-- <ul v-else></ul> -->
    <!-- 没有更多 -->
    <p class="empty_data">正在加载更多...</p>
    <aside class="return_top" >
        <svg class="back_top_svg" v-if="shopBackStatus">
            <use xmlns:xlink= "http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
        </svg>
    </aside>
    <!-- <div id="renderDiv"></div> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import { shopList } from '../../service/getData';
// import {imgBaseUrl} from '../../config/env';
import {loadMore,getImgPath} from './mixin.js'

export default {
    mixins: [loadMore,getImgPath],
    props: ['restaurantaCategoryId','resturantCategoryIds','sortByType','deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    data() {
    return {
      shopListArr: [], // 店铺列表数据
      offset: 0,
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      shopBackStatus: false,
      preventRepeatReupest: false, // 达到底部加载数据，防止重复请求
      touchend: false, // 没有跟多数据
    //   restaurantCategoryId: ""
    };
  },
  methods: {
    async initData() {
      alert(this.geohash)
        let res = await shopList(this.latitude,this.longitude,this.offset,this.restaurantCategoryId)
        // this.preventRepeatReupest = false;
        // console.log(res.data);
        this.shopListArr = [...res.data];
       

    },
    async loaderMore() {
        if (this.touchend) return;
        if (this.preventRepeatReupest) return;
        this.preventRepeatReupest = true;
        this.offset += 20;
        let res = await  shopList(this.latitude,this.longitude,this.offset,this.restaurantCategoryId)
        console.log(res.data);
        this.shopListArr = [...this.shopListArr,...res.data]
        //  if(res.data.length < 20){
        //     this.touchend = true;
        //     return;
        // }
        this.preventRepeatReupest = false;
    
    },
 
  },
     computeds:{
        ...mapState(['latitude','longitude'])
    },
    mounted(){
        this.initData()
    }
};
</script>
<style lang="less" scoped>
 @import '../../style/mixin';
 .shoplist_container{
  background-color: #fff;
  margin-bottom: 2rem;
 }
 .shop_li{
  display: flex;
  border-bottom: 0.025rem solid #f1f1f1;
  padding: 0.7rem 0.4rem;
 }
 .shop_img{
   .wh(2.7rem, 2.7rem);
  display: block;
  margin-right: 0.4rem;
 }
 .list_back_li{
  height: 4.85rem;
  .list_back_svg{
   .wh(100%, 100%)
  }
 }
 .shop_right{
  flex: auto;
  .shop_detail_header{
    .fj;
   align-items: center;
   .shop_title{
    width: 8.5rem;
    color: #333;
    padding-top: .01rem;
    // @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
    font-size: 0.65rem;
    line-height: 0.65rem;
    font-weight: 700;
   }
   .premium::before{
    content: '品牌';
    display: inline-block;
    font-size: 0.5rem;
    line-height: .6rem;
    color: #333;
    background-color: #ffd930;
    padding: 0 0.1rem;
    border-radius: 0.1rem;
    margin-right: 0.2rem;
   }
   .shop_detail_ul{
    display: flex;
    transform: scale(.8);
    margin-right: -0.3rem;
    .supports{
      .sc(0.5rem, #999);
     border: 0.025rem solid #f1f1f1;
     padding: 0 0.04rem;
     border-radius: 0.08rem;
     margin-left: 0.05rem;
    }
   }
  }
  .rating_order_num{
   .fj(space-between);
   height: 0.6rem;
   margin-top: 0.52rem;
   .rating_order_num_left{
    .fj(flex-start);
    .rating_section{
     display: flex;
     .rating_num{
      .sc(0.4rem, #ff6000);
      margin: 0 0.2rem;
     }
    }
    .order_section{
     transform: scale(.8);
     margin-left: -0.2rem;
     .sc(0.4rem, #666);
    }
   }
   .rating_order_num_right{
    display: flex;
    align-items: center;
    transform: scale(.7);
    min-width: 5rem;
    justify-content: flex-end;
    margin-right: -0.8rem;
    .delivery_style{
     font-size: 0.4rem;
     padding: 0.04rem 0.08rem 0;
     border-radius: 0.08rem;
     margin-left: 0.08rem;
     border: 1px;
    }
    .delivery_left{
     color: #fff;
     background-color: @blue;
     border: 0.025rem solid @blue;
    }
    .delivery_right{
     color: @blue;
     border: 0.025rem solid @blue;
    }
   }
  }
  .fee_distance{
   margin-top: 0.52rem;
    .fj;
   .sc(0.5rem, #333);
   .fee{
    transform: scale(.9);
    .sc(0.5rem, #666);
   }
   .distance_time{
    transform: scale(.9);
    span{
     color: #999;
    }
    .order_time{
     color: @blue;
    }
    .segmentation{
     color: #ccc;
    }
   }
  }
 }
 .loader_more{
//   @include font(0.6rem, 3);
    font-size: 0.6rem;
    line-height: 3rem;
  text-align: center;
     color: #999;
 }
 .empty_data{
   .sc(0.5rem, #666);
  text-align: center;
  line-height: 2rem;
 }
 .return_top{
  position: fixed;
  bottom: 3rem;
  right: 1rem;
  .back_top_svg{
    .wh(2rem, 2rem);
  }
 }
 .loading-enter-active, .loading-leave-active {
  transition: opacity 1s
 }
 .loading-enter, .loading-leave-active {
  opacity: 0
 }
</style>
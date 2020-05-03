<template>
  <div class="cart_module">
    <section v-if="!foods.specifications.length" class="cart_button">
      <transition name="showReduce" class="cart_button_right">
        <span
          @click="removeOutCart(foods.category_id,foods.item_id,foods.specfoods[0].food_id,foods.specfoods[0].name,foods.specfoods[0].price,'',foods.specfoods[0].packing_fee,foods.specfoods.sku_id,foods.specfoods[0].stock,$event)"
          v-if="foodNum"
        >
          <svg class="add_icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2368"><path    fill="#3BA9F6" d="M668.734694 532.897959H355.265306c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.897959h313.469388c11.493878 0 20.897959 9.404082 20.897959 20.897959s-9.404082 20.897959-20.897959 20.897959zM512 929.959184c-230.4 0-417.959184-187.559184-417.959184-417.959184s187.559184-417.959184 417.959184-417.959184 417.959184 187.559184 417.959184 417.959184-187.559184 417.959184-417.959184 417.959184z m0-794.122449c-207.412245 0-376.163265 168.75102-376.163265 376.163265s168.75102 376.163265 376.163265 376.163265 376.163265-168.75102 376.163265-376.163265-168.75102-376.163265-376.163265-376.163265z" p-id="2369"></path></svg>
        </span>
      </transition>
      <transition name="fase">
        <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
      </transition>
      <span class="add_icon">
      <svg
        class="add_icon"
        @click="addToCart(foods.category_id,foods.item_id,foods.specfoods[0].food_id,foods.specfoods[0].name,foods.specfoods[0].price,'',foods.specfoods[0].packing_fee,foods.specfoods.sku_id,foods.specfoods[0].stock,$event)"
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
    </section>
    <section class="choose_specification" v-else>
      <section class="choose_icon_container">
        <transition name="shopRedute">
          <!-- <svg class="specs_reduce_icon" v-if="foodNum" @click="showReduceTip">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus" />
          </svg> -->
          <svg class="specs_reduce_icon" @click="showReduceTip" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5667"><path d="M698 549.5H324.7c-20.7 0-37.3-16.7-37.3-37.3 0-20.6 16.7-37.3 37.3-37.3H698c20.6 0 37.3 16.7 37.3 37.3 0 20.6-16.7 37.3-37.3 37.3" fill="#C6CCDA" p-id="5668"></path><path d="M510.8 960.2c-118.7 0-231-45.9-316.3-131.2C91.1 725.6 45.6 582.5 69.6 436.5 101 244.4 258.4 92.8 452.3 67.9c154.5-19.7 305.5 39.5 404.2 158.6 13.2 15.9 10.9 39.4-5 52.6-15.9 13.2-39.4 10.9-52.6-5-82.2-99.2-208-148.8-337.2-132.1-161.4 20.7-292.3 146.8-318.5 306.6-20 122 17.9 241.3 104.1 327.5 86.2 86.2 205.6 124.1 327.5 104.1C735 854 864.3 717.2 882.3 555c4.2-37.3 2.8-74.6-3.7-110.8-2.6-14.1-6-28.2-10.3-41.7-6-19.8 5.1-40.6 24.8-46.6 19.8-6.2 40.6 5 46.6 24.7 5 16.3 9.2 33.2 12.2 50.2 8 43.4 9.5 88 4.6 132.4C934.6 761.2 782.6 921.9 587 954c-25.6 4.1-51 6.2-76.2 6.2" fill="#C6CCDA" p-id="5669"></path></svg>
        </transition>
        <section name="fade">
          <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
        </section>
        <span class="show_chooselist" @click="showChooseList(foods)">选规格</span>
      </section>
    </section>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  props: ["shopId", "foods"],
  data() {
    return {
      showMoveDot: [], // 控制下落的小圆点显示隐藏；
    };
  },
  computed:{
      ...mapState(['cartList']),
      // 监听cartList变化，更新当前商品的购物车信息，同时返回一个新的对象
      shopCart: function(){
        return Object.assign({},this.cartList[this.shopId])
      },
      foodNum: function(){
        let category_id = this.foods.category_id;
        let item_id = this.foods.item_id
        if(this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]){
          let num = 0;
          Object.values(this.shopCart[category_id][item_id]).forEach(item=>{
            num += item.num
          })
          return num;
        }
        return 0;
      }
  },
  methods:{
      ...mapMutations([
          'ADD_CART','REDUCE_CART'
      ]),
    //  加入购物车，计算按钮位置
      addToCart(category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stokck,event){
        //   console.log(event);
        alert(1)
        let elLeft = event.target.getBoundingClientRect().left;
        let elBottom= event.target.getBoundingClientRect().bottom;
        this.ADD_CART({shopid: this.shopId,category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stokck})
        this.showMoveDot.push(true)
        this.$emit('showMoveDot',this.showMoveDot,elLeft,elBottom)
      },
      showReduceTip(){

      },
      removeOutCart(category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stokck){
        if(this.foodNum>0){
          this.REDUCE_CART({shopid: this.shopId,category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stokck})
        }
      },
      showChooseList(){

      }
  },
  created() {

  },
  mounted() {
    // console.log(this.foods);
  }
};
</script>


<style lang="less" scoped>
@import "../../style/mixin";
.cart_module {
  .add_icon {
    position: relative;
    z-index: 999;
  }
  .cart_button {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
  }
  .cart_button_right{
    font-size: 1rem;
  }
  svg {
    .wh(0.8rem, 0.8rem);
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
  .choose_specification {
    .choose_icon_container {
      display: flex;
      align-items: center;
      .show_chooselist {
        display: block;
        .sc(0.55rem, #fff);
        padding: 0.1rem 0.2rem;
        background-color: @blue;
        border-radius: 0.2rem;
        border: 1px solid @blue;
      }
    }
  }
}
.showReduce-enter-active,
.showReduce-leave-active {
  transition: all 0.3s ease-out;
}
.showReduce-enter,
.showReduce-leave-active {
  opacity: 0;
  transform: translateX(1rem);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fadeBounce-enter-active,
.fadeBounce-leave-active {
  transition: all 0.3s;
}
.fadeBounce-enter,
.fadeBounce-leave-active {
  opacity: 0;
  transform: scale(0.7);
}
</style>

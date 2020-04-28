;<template>
    <div>
        <head-top signin-up="msite">
            <router-link :to="'/search/geohash'" class="link_search" slot="search">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/200/svg" version="1.1">
                    <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none" />
                    <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2" />
                </svg>
            </router-link>
            <router-link tag="a" to="/home" slot="msite-title" class="msite_title ">
                <span class="title_text ellipsis"> {{misteTitle}}</span>
            </router-link>
        </head-top>
        <nav class="msite_nav">
           <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide food_types_container" v-for="(item,index) in foodTypes" :key="index">
                        <router-link to="/foot" tag="li" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
                            <figure>
                                <img :src="imgBaseUrl+foodItem.image_url" >
                                <figcaption>{{foodItem.title}}</figcaption>
                            </figure>
                        </router-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </nav>
        <div class="shop_list_container">
            <header class="shop_header">
                <svg class="shop_icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
                </svg>
                <span class="shop_header_title">附近商家</span>
            </header>
              <shop-list :geohash="geohash"></shop-list>
        </div>
        <foot-guide></foot-guide>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import shopList from '../../components/common/shoplist'
import {msiteAddress,msiteFoodTypes,cityGuess} from "../../service/getData";
import  Swiper from 'swiper' 
import '../../style/swiper.min.css'
import {mapMutations} from 'vuex'
import footGuide from "../../components/foot/footGuide";
export default {
    data(){
        return{
            geohash: '',// city页面传递过来的geohash
            misteTitle: '请选择地址...', // msite头部标题
            foodTypes: [], // 食品分类列表
            hasGetData: false, // 是否已经获得地图位置数据，成功之后再获取商铺列表信息
            imgBaseUrl: 'https://fuss10.elemecdn.com' 
        }
    },
    mounted(){
        msiteFoodTypes().then(res=>{
        
            
            let resLength = res.data.length;
            let resArr = [...res.data]; // 返回一个新的数组
            let foodArr = []
            for(var i = 0,j = 0;i<resLength;i += 8,j++){
                foodArr[j] = resArr.splice(0,8)
            }
            this.foodTypes = foodArr
            console.log(this.foodTypes);
            
        }).then(()=>{
            new Swiper('.swiper-container',{
                pagination: {
			        el: '.swiper-pagination',
		            },
                loop: true
            })
        })
    },
    methods:{
        ...mapMutations(['RECORD_ADDRESS','SAVE_GEOHASH'])
    },
   async beforeMount(){
        let params = this.$route.params
        this.geohash = params.geohash
        let res = await msiteAddress(this.geohash)
        // 保存geohash到vuex
        this.SAVE_GEOHASH(this.geohash)
        this.misteTitle = params.address
        // 保存经纬度到vuex
        this.RECORD_ADDRESS(res.data)
        
    },

    components:{
        headTop,
        shopList,
        footGuide
    }
}
</script>
<style lang="less" scoped>
    @import '../../style/mixin';
    .link_search{
        left: .8rem;
        .wh(.9rem, .9rem);
        .ct
    }
    .msite_title{
        .center;
        width: 50%;
        color: #fff;
        text-align: center;
        // margin-left: .5rem;
        .title_text{
            .sc(.8rem,#fff);
            text-align: center;
            display: block;
        }
    }
    .msite_nav{
        padding-top: 2.1rem;
        background-color: #fff;
        border-bottom:  0.025rem solid @bc;
        height: 10.6rem;
        .swiper-container{
            .wh(100%,auto);
            padding-bottom: 0.6rem;
            .swiper-pagination{
                bottom: -0.2rem;
            }
        }
    }
    .food_types_container{
        display: flex;
        // float: left;
        flex-wrap: wrap;
    
        .link_to_food{
            width: 25%;
            padding: .3rem 0;
            .fj(center);
        
                img{
                    margin-bottom: .3rem;
                    .wh(1.8rem,1.8rem);
                }
                figcaption{
                    text-align: center;
                    .sc(.55rem,#666);
                }
            
        }
    }
    .shop_list_container{
        margin-top: .4rem;
        border-top: 0.025rem solid @bc;
        background-color: #fff;
        .shop_header{
            .shop_icon{
                fill: #999;
                margin-left:  0.6rem;
                vertical-align: middle;
                .wh(.6rem,.6rem)
            }
            .shop_header_title{
                color: #999;
                font-size: 0.55rem;
                line-height: 1.6rem;
            }
        }

    }
</style>
<template>
    <div class="shoplist_container">、
        <!-- 店铺列表 -->
        <ul v-load-more='loaderMore' v-if="shopListArr.length" type="1">
            <router-link :to="{path: 'shop',query:{geohash,id:item.id}}" v-for="item in shopListArr" :key="item.id" class="shop_li">
                <section>
                    <img :src="imgBaseUrl+item.image_path" class="shop_img">
                </section>
                <hgroup class="shop_right">

                </hgroup>
            </router-link>
        </ul>
        <!-- 没有店铺列表显示的内容 -->
        <ul v-else></ul>

        <!-- <div id="renderDiv"></div> -->
    </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
    data(){
        return{
            shopListArr: [], // 店铺列表数据
            
        }
    },
    methods:{
        initData(){

        },
        loaderMore(){

        }
    },
    components:{
        'renderDiv':{
                render(creatElement){
       return creatElement(
           "h1",
           {
               props:{
                   value: '一则头条'
               }
           }
       )
    }
        }
    },

}
</script>
<style lang="less" scoped>

</style>
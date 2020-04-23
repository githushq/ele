<template>
    <div class="forgetContainer">
         <head-top goback="true" :head-title="cityName">
         
         </head-top>
         <form class="city_form" v-on:submit.prevent>
            <div>
                <input type="search" name="city" placeholder="输入学校、商务楼、地址" class='city_input input_style' require v-model="cityAddress">            
            </div>
            <div>
                <input type="submit" name="submit" class="city_submit input_style" @click="postpois" value='提交'>
            </div>
         </form>
         <header v-if="historyTitle" class="pois_search_history">搜索历史</header>
         <ul class="getpois_ul">
            <li v-for="(item,index) in placelist" @click="nextpage(index,item)" :key="index">
                <h4 class="pois_name ellipsis">{{item.name}}</h4>
                <p class="pois_address ellipsis">{{item.address}} </p>
            </li>
         </ul>
         <footer v-if="historyTitle && placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
         <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import {currentcity,searchplace} from '../../service/getData'
import {getStore,setStore,removeStore} from '../../config/mUtils'
export default {
    data(){
        return{
            cityId: null, // 城市id
            cityName: null, // 城市名称
            cityAddress: null, // 搜索框地址
            placeHistory: [], // 历史搜索记录
            placelist:[],
            historyTitle: true,
            cityAddress: null, // 搜索地址
            placeNone: false, // 搜索无结果，显示提示组件
        }
    },
    mounted(){
        currentcity(this.cityId).then(res=>{
            this.cityName = res.data.name
        })
        this.initData()
    },
    methods:{
        postpois(){
            // 输入值不能为空时才能发送信息
            if(this.cityAddress){
                searchplace(this.cityId,this.cityAddress).then(res=>{
                    this.historyTitle = false;
                    this.placelist = res.data;
                    this.placeNone = res.data.length?false: true
                })
            }
        },
        initData(){
            if(getStore('placeHistory')){
                this.placelist = JSON.parse(getStore('placeHistory'))
            }else{
                this.placelist = []
            }
        },
        // 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录，如果没有则新增，如果有则不存
        nextpage(index,activeItem){
            let history = getStore('placeHistory')
            let choosePlace = this.placelist[index]
            if(history){
                let checkrepeat = false;
                this.placeHistory.forEach(item => {
                    if(item.geohash ==activeItem.geohash){
                        checkrepeat = true;
                    }
                });
                if(!checkrepeat){
                    this.placeHistory.push(choosePlace)
                }
            }else{
                this.placeHistory.push(choosePlace)
            }
            setStore('placeHistory',this.placeHistory)
            this.$router.push({name:'msite',params:{...activeItem}})
        },
        clearAll(){
            removeStore('placeHistory')
            this.initData()
        }
    },
    components:{
        headTop
    },
    created(){
        this.cityId = this.$route.params.cityId;
    }
}
</script>
<style lang="less" scoped>
    @import '../../style/mixin';
    .forgetContainer{
        padding-top: 2.35rem;
    }
    .city_form{
        background-color: #fff;
        border-top: 1px solid @bc;
        border-bottom: 1px solid @bc;
        padding-top: .4rem;
        div{
            width: 90%;
            margin: 0 auto;
            text-align: center;
            .input_style{
                border-radius: .1rem;
                margin-bottom: .4rem;
                .wh(100%,1.4rem)
            }
            .city_input{
                border: 1px solid @bc;
                padding: 0 .3rem;
                .sc(.65rem,#333)
            }
            .city_submit{
                background-color: @blue;
                .sc(.65rem,#fff);
            }
        }
    }
    .pois_search_history{
        border-top: 1px solid @bc;
        border-bottom: 1px solid @bc;
        padding-left: .5rem;
        font-size: 0.475rem;
        line-height: 0.8rem;
    }
    .getpois_ul{
        background-color: #fff;
        border-top: 1px solid @bc;
        li{
            margin: 0 auto;
            padding-top:.65rem;
            border-bottom: 1px solid @bc;
            .pois_name{
                margin: 0 auto .35rem;
                width: 90%;
                .sc(.65rem, #333)
            }
            .pois_address{
                width: 90%;
                margin: 0 auto 0.55rem;
                .sc(.45rem, #999)
            }
        }

    }
    .search_none_place{
        margin: 0 auto;
        font-size: .65rem;
        line-height: 1.75rem;
        color: #333;
        background-color: #fff;
        text-indent: .5rem;

    }
    .clear_all_history{
        .sc(.7rem, #666);
        text-align:center;
        line-height: 2rem;
        background-color: #fff;
    }
</style>

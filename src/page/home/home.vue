<template>
    <div>
        <headTop signin-up="home">
            <a href="#" slot="logo" @click.prevent="reload" class="head_logo"> ele</a>
        </headTop>
        <nav class="city_nav">
            <div class="tity_tip">
                <span>当前定位城市:</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
        </nav>
        <section id="hot_city_ocntainer">
            <h4 class="city_title">热门城市</h4>
            <ul class="citylistul clear">
                <router-link tag="a" v-for="item in hotCity" :to="`/city/${item.id}`" :key="item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </section>
        <section class="group_city_container">
            <ul class="letter_classify">
                <li v-for="(value,key,index) in sortgrounpcity" :key="key" class="letter_classify_li">
                    <h4 class="tity_title">{{key}}<span v-if='index == 0'>(按字母排序)</span></h4>
                    <ul class="groupcity_name_container citylistul clear">
                        <router-link tag="a" v-for="item in value" :to="`/city/${item.id}`" :key="item.id" class="ellipsis">
                            {{item.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
import headTop from '../../components/header/head.vue'
import {cityGuess,hotcity,groupcity} from '../../service/getData'
export default {
    data(){
        return{
            guessCity: '', // 当前城市
            guessCityId: '', // 当前城市id
            hotCity: [], // 热门城市列表
            groupcity: {},// 所有城市列表

        }
    },
    components:{
        headTop,
    },
    computed:{
        sortgrounpcity(){
            let sortobj = {};
            for(var i = 65; i<=90;i++){
                if(this.groupcity[String.fromCharCode(i)]){
                    sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)]
                }
            }
            return sortobj;
        }
    },
    mounted(){
        // 获取热门城市
         hotcity().then(res=>{
             this.hotCity  =  res.data
         })
        //  获取所有城市
        groupcity().then(res=>{
            this.groupcity = res.data
            
        })
    },
    methods:{
        // 点击图标刷新页面
        reload(){
            window.location.reload()
        }
    }
}
</script>
<style lang="less" scoped>
    @import '../../style/mixin';
    .head_logo{
        .sc(0.7rem,#fff);
        .wh(2.3rem,0.7rem);
        .ct;
        left: 0.4rem;
        font-weight: 400;
    }
    .city_nav{
        padding-top: 2.35rem;
        border-top: 1px solid @bc;
        background-color: #fff;
        margin-bottom: 0.4rem;
        .tity_tip{
            .fj();
            line-heigth: 1.45rem;
            padding: 0 0.45rem;
            span:nth-of-type(1){
                .sc(0.55rem,#666)
            }
            span:nth-of-type(2){
                font-weight:900;
                .sc(0.475rem,#9f9f9f)
            }
        }
    }
    #hot_city_ocntainer{
        background-color: #fff;
        margin-bottom: .4rem;
        .city_title{
            color: #666;
            font-weight: 400;
            text-indent: .45rem;
            border-top: 2px solid @bc;
            border-bottom: 2px solid @bc;
            line-height: 1.45rem;
            .sc(0.475rem, #999)
        
        }
        .citylistul{
            a{
                float: left;
                text-align: center;
                // color: @blue;
                border-bottom: 0.025rem solid @bc;
                border-right: 0.025rem solid @bc;
                .wh(25%,1.75rem);
                // .font(0.6rem,1.75rem)
                .sc(.6rem, @blue);
                line-height: 1.75rem;
            }
            &:nth-of-type(4n){
                border-right: none;
            }
        }

    }
    .letter_classify_li{
        background-color: #fff;
        margin-bottom: .4rem;
        border-bottom: 1px solid @bc;
        .groupcity_name_container{
            a{
                color: #666;
            }
        }
        #hot_city_ocntainer.citylistul();
        #hot_city_ocntainer.city_title();
    }
</style>
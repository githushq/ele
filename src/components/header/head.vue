<template>
    <header id="header">
        <!-- 小图标 -->
        <slot name="logo"></slot>
        <slot name = "search"></slot>
        <!-- 箭头 -->
        <section class="head_goback" v-if="goback" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" versio="1.1">
                <polyline points="12,18,4,9,12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2" />
            </svg>
        </section>
        <router-link :to="userInfo?'/profile':'/login'" v-if="signinUp" class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href="user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="msite-title"></slot>
    </header>
</template>
<script>

export default {
    props: ["goback","headTitle",'signinUp'],
    data(){
        return{
            userInfo: ''
        }
    }
}
</script>
<style lang="less" scoped>
    @import '../../style/mixin'; 
    #header{
        background-color: @blue;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0%;
        .wh(100%,1.95rem);
        .head_login{
            .sc(0.65rem, #fff);
            right: 0.55rem;
            .ct();
            .login_span{
                color: #fff;
            }
        }
        .head_goback{
            left: 0.4rem;
            .wh(0.6rem,1rem);
            line-height: 2.2rem;
            margin-left: .4rem;
        }
        .title_head{
            .center();
            // width:50%;
            // color:#fff;
            // text-align: center;
            .title_text{
                .sc(0.8rem,#fff)
            }
        }
    }
</style>
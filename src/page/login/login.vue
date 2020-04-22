<template>
  <div class="loginContainer">
    <head-top goback="true" :head-title="loginWay?'登录': '密码登录'"></head-top>
    <form class="loginForm" v-if="loginWay">
        <section class="input_container phone_number">
            <input input="number" placeholder="请输入手机号" name='phone' maxlength="11" v-model="phoneNumber">
            <button @click.prevent="getVerifyCode" :class="{right_phone_number: rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
            <button v-show="computedTime">已发送({{computedTime}})</button>
        </section>
        <section class="input_container">  
          <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        </section>  

    </form>
    <form class="loginForm" v-if="!loginWay">
      <section class="input_container">
        <input type="text" autocomplete="off" placeholder="账号" name="phone" v-model.lazy="userAccount" />
      </section>
      <section class="input_container">
        <input v-if="!showPassword" type="password" name="password" placeholder="密码" v-model="password" />
        <input v-else type="text" placeholder="密码" v-model="password" />
        <a href="#" class="button_switch" :class="{change_to_text:showPassword}" @click.prevent="changePassword">
          <div  class="circle_button" :class="{trans_to_right:showPassword}" ></div>
            <span>abc</span>
            <span>...</span>
        </a>
      </section>
      
      <!-- 验证码 -->
      <!-- <section class="input_container captcha_container">
          <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
          <div class="img_change_img">
              <img v-show="captchaCodeImg" :src="captchaCodeImg">
              <div class="change_img" @click="getCaptchaCode">
                  <p>看不清</p>
                  <p>换一张</p>
              </div>
          </div>
      </section> -->
    </form>
    <p class="login_tips">
        温馨提示：未注册的账号，登录是将自动注册
    </p>
    <p class="login_tips">
        注册过的用户可凭账号密码登录
    </p>
    <div class="login_btn">登录</div>
    <router-link to="/forget" class="to_forget" v-if="!loginWay" >重置密码？</router-link>
  </div>
</template>
<script>
import headTop from "../../components/header/head";
import {mobileCode,checkExsis,sendLogin,getcaptchas,accountLogin} from '../../service/getData'
export default {
  data() {
    return {
      loginWay: false, // 登录方式，默认是密码登录
      showPassword: false, // 是否显示密码
      userAccount: null, // 用户名
      password: null,// 密码
      codeNumber: null, // 验证码
      captchaCodeImg: null, // 验证码地址
      phoneNumber: null, // 手机号
      computedTime: 0, // 倒计时
    };
  },
  computed: {
      rightPhoneNumber: function(){
          return /^1[3456789]\d{9}$/gi.test(this.phoneNumber)
      }
  },
  methods: {
    //   是否显示密码
    changePassword() {
      this.showPassword = !this.showPassword;
    },
    // 换验证码
   async getCaptchaCode(){
       let res = await getcaptchas()
       console.log(res);
       
       this.captchaCodeImg = res.code;
    },
    getVerifyCode(){
        if(this.rightPhoneNumber){
            this.computedTime = 30;
            var timer = setInterval(()=>{
                this.computedTime--;
                console.log(this.computedTime);
                
                if(this.computedTime == 0){
                    clearInterval(timer)
                }
            },1000)
        }
    }
  },
  components: {
    headTop
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.loginForm {
  background-color: #fff;
  margin-top: 1.95rem;
  .input_container {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0.6rem;
    border-bottom: 1px solid #f1f1f1;
    input {
      .sc(0.7rem, #666);
    }
    button {
      .sc(0.65rem, #fff);
      font-family: Arial, Helvetica, sans-serif;
      padding: 0.28rem 0.4rem;
      border: 1px;
      border-radius: 0.15rem;
    }
    .right_phone_number{
        background-color: #4cd964;
    }
  }
}
.button_switch{
    background-color: #ccc;
    display: flex;
    // justify-content: center;
    .wh(2rem,.7rem);
    // padding: 0 .2rem;
    border: 1px;
    border-radius: .5rem;
    position: relative;
    .circle_button{
        transform:  all .3s;
        position: absolute;
        top: -0.2rem;
        left: -0,3rem;
        z-index: 1;
        .wh(1.2rem,1.2rem);
        box-shodow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
        background-color: #f1f1f1;
        border-radius: 50%;
    }
    .trans_to_right{
        transform:  translateX(1.3rem)
    }
    span{
        .sc(.45rem,#fff);
        transform: translateY(.05rem);
        line-height: .6rem;
        margin: 0 .2rem;
    }
    span:nth-of-type(2){
        transform: translateY(-.08rem)
    }
}
.change_to_text{
    background-color: #4cd964;
}
.login_tips{
    .sc(.5rem, red);
    padding: .4rem .6rem;
    line-height:  .5rem;
    a{
        color: #3b95e9;
    }
}
.login_btn{
    // display: block;
    margin:0 .5rem 1rem;
    .sc(.7rem,#fff);
    background-color: #4cd964;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
}
.to_forget{
    float: right;
    .sc(.6rem,#3b95e9)
}
</style>
import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

export default new Router({
  // mode:'history', 
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {path: '', redirect: '/home'},
        {path: '/home', component: ()=>import('../page/home/home')},
        {path: '/login', component: ()=>import('../page/login/login')},
        {path: '/forget', component: ()=>import('../page/forget/forget')},
        {path: '/city/:cityId',component: ()=>import('../page/city/city')},
        {path: '/msite/:geohash/:address',name:"msite",component: ()=>import('../page/msite/msite')},
        {path: '/shop', name: 'shop',component:()=>import('../page/shop/shop')}
      ]
    }
  ]
})

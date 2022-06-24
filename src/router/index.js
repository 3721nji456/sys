import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login.vue";
import home from "../components/home.vue";
import infor from "../components/infor.vue";
import chuku from "../components/chuku"
import ruku from "../components/ruku"
import space from "../components/space";
import tianjia from "../components/tianjia";
import img from "../components/img";
import ascc from "../components/ascc";
import kascc from "../components/kascc";
import chuli from "../components/chuli";
import shanchu from "../components/shanchu";
import a from "../components/a.vue";
import p from "../components/p.vue";
import xiangqing from "../components/xiangqing";
import jinjie from "../components/jinjie";
import updateqx from "../components/updateqx";
import pandian from "../components/pandian";
import daipandian from "../components/daipandian";
import panfinish from "../components/panfinish";
import companyinfor from "../components/companyinfor";
import companylist from "../components/companylist";
import line from "../components/line";
import bing from "../components/bing";
import goodsinfor from "../components/goodsinfor";
import goodslist from "../components/goodslist";
import ruchu from "../components/ruchu";
Vue.use(Router)

const router = new Router({
  routes: [
    { path:'/',redirect:'/login'},
    { path:'/login',component:login},
    { path:'/home',
      component:home,
      redirect: '/infor',
      children:
        [{
        path:'/infor',component:infor
      },

          {path: '/ruku',component: ruku},
          {path: '/chuku',component: chuku},
          {path: '/space',component: space},
          {path: '/tianjia',component: tianjia},
          {path: '/img',component: img},
          {path: '/ascc',component: ascc},
          {path: '/kascc',component: kascc},
          {path: '/chuli',component: chuli},
          {path:'/shanchu',component: shanchu},
          {path:'/a',component: a},
          {path:'/p',component: p},
          {path: '/xiangqing',component: xiangqing},
          {path: '/jinjie',component: jinjie},
          {path: '/updatepx',component: updateqx},
          {path: '/pandian',component: pandian},
          {path: '/daipandian',component: daipandian},
          {path: '/panfinish',component: panfinish},
          {path: '/companyinfor',component: companyinfor},
          {path: '/companylist',component: companylist},
          {path: '/line',component: line},
          {path: '/bing',component: bing},
          {path: '/goodsinfor',component: goodsinfor},
          {path: '/goodslist',component: goodslist},
          {path: '/ruchu',component: ruchu},
        ]

    }
  ]
})

//挂载路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path==="/login") return  next()
    const login = window.sessionStorage.getItem('login')
    if(login=='false')window.sessionStorage.clear()
    //获取token
    const str = window.sessionStorage.getItem('token')
    if(!str) return next('/login')
    next()
})

export default router

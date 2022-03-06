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
          {path: '/chuli',component: chuli}
        ]

    }
  ]
})

//挂载路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path==="/login") return  next()
    //获取token
    const str = window.sessionStorage.getItem('token')
    if(!str) return next('/login')
    next()
})

export default router

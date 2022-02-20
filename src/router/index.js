import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login.vue";
import home from "../components/home.vue";
Vue.use(Router)

const router = new Router({
  routes: [
    { path:'/',redirect:'/login'},
    { path:'/login',component:login},
    { path:'/home',component:home}
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

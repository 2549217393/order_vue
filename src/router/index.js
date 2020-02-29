import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/product/Main'
import Register from '@/product/Register'
import MyOrder from '@/product/MyOrder'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path:'/Main',
      component:Main
    },{
      path:'/Register',
      component:Register
    },{
      path:'/MyOrder',
      component:MyOrder
    }
  ]
});


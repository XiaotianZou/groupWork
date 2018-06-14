import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Activity from '@/components/Activity'
import Create from '@/components/Create'
import Detail from '@/components/Detail'
import Personal from '@/components/Personal'
import QianDao from '@/components/QianDao'
import store from '../vuex/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/qiandao/:id',
      name: 'qiandao',
      component: QianDao
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   alert(store.state.isLogin == '')
//   if (store.state.isLogin != '') {
//     next();
//   } else {
//     next({path: '/signin'})
//   }
// })

export default router

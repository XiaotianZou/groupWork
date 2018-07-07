import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Activity from '@/components/Activity'
import Create from '@/components/Create'
import Detail from '@/components/Detail'
import Personal from '@/components/Personal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import PersonalCenter from '@/components/PersonalCenter'
import activity_content from '@/components/activity_content'
import createActivity from '@/components/createActivity'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/createActivity',
      component: createActivity,
    },
    {
      path: '/activity_content',
      component: activity_content
    },
    {
      path: '/signin',
      component: Signin
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/personalcenter',
      component: PersonalCenter,
      name:'PersonalCenter'
    },
    
  ]
})

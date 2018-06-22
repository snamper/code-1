import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import process from '@/components/process'
import commodity from '@/components/commodity'
import commoditycole from '@/components/commoditycole'
import move from '@/components/move'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/', 
    	redirect: 'index'
    },
    {
      path: '/index',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/one',
      name: 'process',
      component: process
    },
    {
      path: '/two',
      name: 'commodity',
      component: commodity
    },
    {
      path: '/three',
      name: 'commoditycole',
      component: commoditycole
    },
    {
      path: '/four',
      name: 'move',
      component: move
    }
  ]
})

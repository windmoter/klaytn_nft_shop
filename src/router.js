import Vue from 'vue'
import Router from 'vue-router'
import GameBapp from '@/components/game-bapp'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
 routes: [
  {
   path: '/',
   name: 'Home',
   component: Home
  }
 ]
})

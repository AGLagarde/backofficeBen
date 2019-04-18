import Vue from 'vue'
import Router from 'vue-router'
import ListUsers from '@/components/ListUsers'
import ListHouse from '@/components/ListHouse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: ListUsers
    },
    {
      path: '/houses',
      name: 'House',
      component: ListHouse,
    //   children: [
    //     {
    //       path: ':project',
    //       name: 'ProjectAside',
    //       component: ProjectAside
    //     }
    //   ]
    }
  ]
})
import Vue from 'vue'
import Router from 'vue-router'
import UsersList from '@/components/UsersList'
import HousesList from '@/components/HousesList'
import HouseManage from '@/components/HouseManage'

Vue.use(Router)
// QUESTION : pourquoi pas de routes vers LOGIN ? Pourtant fonctionnel...
// fichier utile ? cf main.js

export default new Router({
  routes: [
    // USERS
    {
      path: '/users',
      name: 'users',
      component: UsersList,
      children: [
        {path: 'create', name: 'create-user', component: UserAdd} // creation
      ]
    },

    // HOUSES
    {
      path: '/houses',
      name: 'houses',
      component: HousesList,
        children: [
          {path: 'create', name: 'create-house', component: HouseAdd} // creation
          {path: 'house-manage', name: 'house-manage', component: HouseManage} // modify
        ]
    }
  ]
})
import Vue from 'vue'
import Router from 'vue-router'
import ListUsers from '@/components/ListUsers'
import ListHouses from '@/components/ListHouses'
import ManageHouse from '@/components/ManageHouse'

Vue.use(Router)
// QUESTION : pourquoi pas de routes vers LOGIN ? Pourtant fonctionnel...
// fichier utile ? cf main.js

export default new Router({
  routes: [
    // USERS
    {
      path: '/users',
      name: 'users',
      component: ListUsers,
      children: [
        {path: 'create', name: 'create-user', component: AddUser} // creation
      ]
    },

    // HOUSES
    {
      path: '/houses',
      name: 'houses',
      component: ListHouses,
        children: [
          {path: 'create', name: 'create-house', component: AddHouse} // creation
          {path: 'manage-house', name: 'manage-house', component: ManageHouse} // modify
        ]
    }
  ]
})
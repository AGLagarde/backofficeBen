import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './scss/styles.scss'

// components:
import Login from './components/Login'
import ListUsers from './components/ListUsers.vue'
import AddUser from './components/AddUser.vue'
import ListHouses from './components/ListHouses.vue'
import AddHouse from './components/AddHouse.vue'
import ManageHouse from './components/ManageHouse.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false


const routes = [
  { path: '/login', component: Login },
  { path: '/users', component: ListUsers, name:'users'},
  { path: '/users/create', component: AddUser },
  { path: '/houses', component: ListHouses, name:'houses'},
  { path: '/houses/create', component: AddHouse },
  { path: '/houses/manage-house', component: ManageHouse }
]

// pourquoi avoir un rooter/index.js ?!
const router = new VueRouter({
  routes: routes // short for `routes: routes`
})

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')


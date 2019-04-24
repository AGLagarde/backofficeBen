import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './scss/styles.scss'

// components:
import Login from './components/Login'
import Navigation from './components/Navigation'
import SearchBar from './components/SearchBar'
import UsersList from './components/UsersList.vue'
import UserAdd from './components/UserAdd.vue'
import HousesList from './components/HousesList.vue'
import HouseAdd from './components/HouseAdd.vue'
import HouseManage from './components/HouseManage.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false


const routes = [
  { path: '/login', component: Login },
  { path: '/users', component: UsersList, name:'users'},
  { path: '/users/create', component: UserAdd },
  { path: '/houses', component: HousesList, name:'houses'},
  { path: '/houses/create', component: HouseAdd },
  { path: '/houses/manage-house', component: HouseManage }
]

// pourquoi avoir un rooter/index.js ?!
const router = new VueRouter({
  routes: routes // short for `routes: routes`
})

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')


import Vue from 'vue'
import App from './App.vue'
import './scss/styles.scss'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false

import Login from './components/Login'
import ListUsers from './components/ListUsers.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/users', component: ListUsers }
]

const router = new VueRouter({
  routes: routes // short for `routes: routes`
})



new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')


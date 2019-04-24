<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import UsersList from './components/UsersList.vue'


export default {
  name: 'app',
  components: {
    UsersList
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

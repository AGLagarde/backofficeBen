<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ListUsers />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ListUsers from './components/ListUsers.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    ListUsers
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

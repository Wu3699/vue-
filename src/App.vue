<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import sidebar from '@/layout/Sidebar'
export default {
  name: 'App',
  // components:{ sidebar}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}
</style>

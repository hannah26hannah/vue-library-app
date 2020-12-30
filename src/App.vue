<template>
  <div id="app">
    <the-header />
    <router-view />
  </div>
</template>

<script>
import theHeader from "@/components/header.vue";

export default {
  components: {
    theHeader
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
